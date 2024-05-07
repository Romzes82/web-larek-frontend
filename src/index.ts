import './scss/styles.scss';//Импорт стилей

import {API_URL, CDN_URL} from './utils/constants';//Импорт данных сервера
import { WebLarekApi } from './components/WebLarekApi';
import {EventEmitter} from './components/base/Events';//Импорт слушателя
import { AppState } from './components/AppState';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card, CardBasket } from './components/Card';
import { Page } from './components/Page';
import { Basket } from './components/Bascet';
import { Modal } from './components/Modal';


const api = new WebLarekApi(CDN_URL, API_URL);//Создаем объект управления Апи
// Создание объекта для управления событиями и API
const events = new EventEmitter();

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog'); //Шаблон каталога главной страницы
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket'); //Шаблон корзины
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');//Шаблон карточек в корзине

const appState = new AppState({}, events); //Создаем объект модели данных

const page = new Page(document.body, events);//Создаем объект главной страницы
const basket = new Basket(cloneTemplate(basketTemplate), events);//Создаем переменную корзины
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);//Создаем переменную модального окна

console.log(API_URL, CDN_URL);

//Получение и отображение списка карточек
api.getCardList()
    .then(appState.setCatalog.bind(appState))
	.catch((err) => {
		console.log(err);
	});

events.on('items:changed', () => {
    page.catalog = appState.cardList.map((item) => {
        const card = new Card(cloneTemplate(cardCatalogTemplate), {
        onClick: () => events.emit('card:select', item)
    });
    return card.render({
        category: item.category,
        title: item.title,
        image: item.image,
        price: item.price
        });
    });
});

console.log(basket.button);
console.log(appState.getTotal());

//Открытие корзины, рендеринг его содержимого: товаров и суммы заказа
events.on('basket:open', () => {
    basket.setDisabled(basket.button, appState.statusBasket);
    basket.total = appState.getTotal();
    let i = 1;
    basket.items = appState.basketList.map((item) => {
        const card = new CardBasket(cloneTemplate(cardBasketTemplate), {
        onClick: () => events.emit('card:remove', item)
        });
        return card.render({
            title: item.title,
            price: item.price,
            index: i++
            });
    })
    modal.render({
        content: basket.render()
    })
})

// ToDo заменить Locked на Toggle в Card
// Card<T> - del <T> ?
