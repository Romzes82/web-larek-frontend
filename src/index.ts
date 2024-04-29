import './scss/styles.scss';//Импорт стилей
import {API_URL, CDN_URL} from './utils/constants';//Импорт данных сервера
import { ensureElement } from './utils/utils';
import { Counter } from './components/Counter';

// const api = new WebLarekApi(CDN_URL, API_URL);//Создаем переменную управления Апи


// import {cloneTemplate, createElement, ensureElement, formatNumber} from "../../utils/utils";
const root = ensureElement<HTMLElement>('main');
const counter = new Counter(root);