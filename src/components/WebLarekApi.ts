import {Api} from './base/api';
// import {ICard, ApiListResponse, IOrder, ISuccessfulForm} from '../types';


interface IAppState {
    cardList: ICardItem[];
    basket: string[];
	order: IOrder | null;
    preview: string | null;
	formErrors: FormErrors;
}

interface IPage {
    cardList: HTMLElement[];
}

/*--Интерфейсы карточки--*/

//Интерфейс данных карточки с сервера
interface ICardItem {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	price: number | null;
}

//Интерфейс карточки товара на главной страницы
interface ICard {
	category: string;
	title: string;
	description: string;
	image: string;
	price: number;
}

//Интерфейс карточки товара в превью
interface ICardPreview {
	text: string;
}  
//Интерфейс карточки в корзине
interface ICardBasket {
	index: number;
	title: string;
	price: number;
}  

//Интерфейс события
interface IActions {
    onClick: (event: MouseEvent) => void;
}

/*--Интерфейсы карточки--*/

//Интерфейс корзины
interface IBasket {
	items: HTMLElement[];
	total: number;
}


/*--Интерфейсы заказа--*/


//Интерфейс валидации формы
interface IFormValid {
	valid: boolean;
	errors: string[];
}

//Тип ошибки формы
type FormErrors = Partial<Record<keyof IOrder, string>>;

//Интерффейс формы заказа
interface IOrderForm {
	payment?: string;
	address?: string;
	phone?: string;
	email?: string;
	total?: string | number;
}

//Интерфейс заказа
interface IOrder extends IOrderForm {
    items: string[];
}

//Интерфейс формы успешного заказа
interface ISuccess {
	total: number;
  }

//Интерфейс события
interface ISuccessActions {
	onClick: () => void;
}

interface IModalData {
	content: HTMLElement;
}

/*--Интерфейсы апи--*/


type ApiListResponse<Type> = {
	total: number;
	items: Type[];
}

interface ISuccessfulForm {
    id: string;
}
// export interface IWebLarekApi {
//     getCardList: () => Promise<ICard[]>;
//     getCardItem: (id: string) => Promise<ICard>;
//     orderCard: (order: IOrder) => Promise<ISuccessfulForm>;
// }

// export class WebLarekApi extends Api implements IWebLarekApi {
    
    export class WebLarekApi extends Api {
    readonly cdn: string

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }
    
    //получение списка карточек
    getCardList(): Promise<ICard[]> {
        return this.get('/product').then((data: ApiListResponse<ICard>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
    }

    //получение данных по id
    getCardItem(id: string): Promise<ICard> {
        return this.get(`/product/${id}`).then((item: ICard) => ({
			...item,
			image: this.cdn + item.image,
		}));
    }

    //возврат данных по заказу
    orderCard(order: IOrder): Promise<ISuccessfulForm> {
        return this.post(`/order`, order).then((data: ISuccessfulForm) => data);
    }
}

