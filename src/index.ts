import './scss/styles.scss';//Импорт стилей
import {API_URL, CDN_URL} from './utils/constants';//Импорт данных сервера
import { createElement, ensureElement } from './utils/utils';
import { Counter } from './components/Counter';
import { Api } from './components/base/api';
import { WebLarekApi } from './components/WebLarekApi';
import {EventEmitter} from './components/base/events';//Импорт слушателя
import { AppState } from './components/AppState';
import { Model } from './components/base/Model';
import { Component } from './components/base/Component';

const api = new WebLarekApi(CDN_URL, API_URL);//Создаем переменную управления Апи


// interface IItem {
//     id: string;
//     title: string;
// }

// interface ICatalog {
//     items: IItem[];
// }

// class Catalog extends Model<ICatalog> implements ICatalog {
//     items: IItem[];

//     setItems(items: IItem[]) {
//         this.items = items.map(item => _.pick(item, ['id', 'title']));
//         this.emitChanges('catalog.items:changed', {
//             items: this.items
//         });
//     }
// }

// interface IItemConstructor {
//     new (): Component<IItem>;
// }

// class CatalogView extends Component<ICatalog> {
//     constructor(protected Item: IItemConstructor) {
//         super(createElement('ul'));
//     }

//     set items(items: IItem[]) {
//         this.container.replaceChild(...items.map(item => {
//             const itemView = new this.Item();
//             return itemView.render(item);
//         }));
//     }
// }

// const root = ensureElement<HTMLElement>('main');
// const catalog = new Catalog({
//     items: []
// }, events);

// Создание объектов для управления событиями и API
const events = new EventEmitter();

// Создание основных компонентов приложения
const appData = new AppState({}, events);

// Получение и отображение списка продуктов при загрузке страницы
api
	.getCardList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.log(err);
	});

console.log(api.getCardList())    

// import {cloneTemplate, createElement, ensureElement, formatNumber} from "../../utils/utils";
// const root = ensureElement<HTMLElement>('main');
// const counter = new Counter(root);

// const root = ensureElement<HTMLElement>('main');
// const events = new EventEmitter();//Создаем переменную управления событиями
// const appState = new AppState({}, events);//Создаем переменную модели данных

// const api = new WebLarekApi(API_URL, CDN_URL);//Создаем переменную управления Апи
// api.getCardList()
//     .then(result => {
//         catalog.setItems(result);
//     })
//     .catch(err => {
//         console.log(err);
//     })

//     //Получение и отображение списка карточек
// api.getCardList()
// .then(appState.setCatalog.bind(appState))
// .catch((err) => {
//     console.log(err);
// });
// events.on('items:changed', () => {
// page.catalog = appState.cardList.map((item) => {
//     const card = new Card(cloneTemplate(cardCatalogTemplate), {
//     onClick: () => events.emit('card:select', item)
// });
// return card.render({
//     category: item.category,
//     title: item.title,
//     image: item.image,
//     price: item.price
//     });
// });
// });