import './scss/styles.scss';

import { API_URL, CDN_URL } from './utils/constants'; //Импорт констант для обращения к серверу
import { WebLarekApi } from './components/WebLarekApi';
import { EventEmitter } from './components/base/Events';
import { AppState } from './components/AppState';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card, CardBasket, CardPreview } from './components/Card';
import { Page } from './components/Page';
import { Basket } from './components/Basket';
import { Modal } from './components/Modal';
import { ICard, IOrderForm } from './types';
import { Order } from './components/OrderForm';
import { Contacts } from './components/ContactForm';
import { Success } from './components/Success';

//объект управления Апи
const api = new WebLarekApi(CDN_URL, API_URL);
// объект для управления событиями
const events = new EventEmitter();

//Темплейт каталога главной страницы
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
//Темплейт корзины
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
//Темплейт превью карточки
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
//Темплейт карточек в корзине
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
//Темплейт формы заказа с адресом
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
//Темплейт формы заказа с контактами
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
//Темплейт формы успешного заказа
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const appState = new AppState({}, events); // объект модели данных, с состоянием приложения

//объект главной страницы
const page = new Page(document.body, events);
//объект корзины
const basket = new Basket(cloneTemplate(basketTemplate), events);
//объект модального окна
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
//объект формы доставки
const delivery = new Order(cloneTemplate(orderTemplate), events);
//объект формы контактов
const contact = new Contacts(cloneTemplate(contactsTemplate), events);

//Блок прокрутки страницы, если открыто модальное окно
events.on('modal:open', () => {
	page.locked = true;
});

// events.on - устанаваливаем функции-орбработчики на события:
//Снятие блока прокрутки страницы, если закрыто модальное окно
events.on('modal:close', () => {
	page.locked = false;
});

//Получаем список карточек и рендерим его на событии items:changed
api
	.getCardList()
	.then(appState.setCatalog.bind(appState))
	.catch((err) => {
		console.log(err);
	});

events.on('items:changed', () => {
	page.catalog = appState.cardList.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
		});
	});
});

//Открытие корзины, рендеринг его содержимого: товаров и суммы заказа
events.on('basket:open', () => {
	basket.setDisabled(basket.button, appState.statusBasket);
	basket.total = appState.getTotal();
	let i = 1;
	basket.items = appState.basketList.map((item) => {
		const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('card:remove', item),
		});
		return card.render({
			title: item.title,
			price: item.price,
			index: i++,
		});
	});
	modal.render({
		content: basket.render(),
	});
});

//При выборе карточки, обновляем AppState и рендерим превью карточки в модалке
events.on('card:select', (item: ICard) => {
	appState.setPreview(item);
});

events.on('preview:changed', (item: ICard) => {
	const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => events.emit('card:add', item),
	});
	const findRepeatId = appState.basketList.find((element: ICard) => {
		return element.id === item.id;
	});
	if (findRepeatId) {
		// блокируя кнопку "В корзину", исключается дублирование товара по id
		card.setDisableButton();
	}
	modal.render({
		content: card.render({
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
			category: item.category,
		}),
	});
});

//Добавление товара в корзину, обновляем counter корзины на главной странице
events.on('card:add', (item: ICard) => {
	appState.addCardToBasket(item);
	appState.setCardToBasket(item);
	page.counter = appState.basketList.length;
	modal.close();
});

//Удаление товара из корзины
events.on('card:remove', (item: ICard) => {
	appState.deleteCardToBasket(item);
	page.counter = appState.basketList.length;
	basket.setDisabled(basket.button, appState.statusBasket);
	basket.total = appState.getTotal();
	let i = 1;
	basket.items = appState.basketList.map((item) => {
		const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('card:remove', item),
		});
		return card.render({
			index: i++,
			title: item.title,
			price: item.price,
		});
	});
	modal.render({
		content: basket.render(),
	});
});

//Формы доставки
events.on('order:open', () => {
	// delivery.errors = '';
	appState.order.payment = '';
	appState.order.address = '';
	modal.render({
		content: delivery.render({
			payment: '',
			address: '',
			valid: false,
			errors: [],
		}),
	});
	appState.order.items = appState.basket.map((item) => item.id);
	appState.order.email = '';
	appState.order.phone = '';
});

// events.on('payment:change', (item: HTMLButtonElement) => {
events.on('payment:change', (item: HTMLButtonElement) => {
	appState.order.payment = item.name;
	appState.setOrderField('payment', item.name);
});

//Изменение данных в поле ввода доставки
events.on(
	// /(^order|^payment)\..*:change/,
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appState.setOrderField(data.field, data.value);
	}
);

//Валидация
events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { email, phone, address, payment } = errors;
	delivery.valid = !address && !payment;
	contact.valid = !email && !phone;
	delivery.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	contact.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

//Отправляем данные доставки, рендеринг формы контактов
events.on('order:submit', () => {
	appState.order.total = appState.getTotal();
	modal.render({
		content: contact.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

//Изменение поля ввода контактов
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appState.setContactsField(data.field, data.value);
	}
);

//Post заказа, рендеринг модалки с успешным заказом
events.on('contacts:submit', () => {
	api
		.orderCard(appState.order)
		.then((result) => {
			appState.clearBasket();
			page.counter = appState.basketList.length;
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
				},
			});
			const pay: string = result.total;
			modal.render({
				content: success.render({
					total: pay,
				}),
			});
			appState.clearOrder();
		})
		.catch((err) => {
			console.error(err);
		});
});
