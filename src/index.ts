import './scss/styles.scss';//Импорт стилей

import {API_URL, CDN_URL} from './utils/constants';//Импорт данных сервера
import { WebLarekApi } from './components/WebLarekApi';
import {EventEmitter} from './components/base/events';//Импорт слушателя
import { AppState } from './components/AppState';


const api = new WebLarekApi(CDN_URL, API_URL);//Создаем переменную управления Апи

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
