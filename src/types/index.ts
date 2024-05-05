export interface ICard {
        id: string;
        description: string;
        image: string;
        title: string;
        category: string;
        price: number | null;
}

//Интерфейс данных карточки с сервера
// interface ICardItem {
// 	id: string;
// 	title: string;
// 	description: string;
// 	category: string;
// 	image: string;
// 	price: number | null;
// }

// УДАЛИТЬ
// interface IProductList {
// export interface ICardList {    
//     items: ICard[];
// }

// перечисление категория карточек
export enum CardCategory {
    // soft= 'софт-скил',
    // other = 'другое' ,
    // additional = 'дополнительное',
    // button = 'кнопка',
    // hard = 'хард-скил'

    'софт-скил' = 'soft',
    'другое' = 'other',
    'дополнительное' = 'additional',
    'кнопка' = 'button',
    'хард-скил' = 'hard'
}

export type Machine = {
    categ: CardCategory
}

export interface IAppState {
    cardList: ICard[];
    basket: string[];
    order: IOrder | null;
    preview: string | null;
    formErrors: TFormErrors;
 }

 //алиас ошибки формы
export type TFormErrors = Partial<Record<keyof IOrder, string>>;


// Интерфейс для типизации ответа сервера в случае успешного оформления заказа
export interface IOrderSuccess {
	id: string;
	total: number;
}


//Интерфейс заказа
export interface IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
// "payment": "online",
// "email": "test@test.ru",
// "phone": "+71234567890",
// "address": "Spb Vosstania 1",
// "total": 2200,
// "items": [
//     "854cef69-976d-4c2a-a18c-2aa45046c390",
//     "c101ab44-ed99-4a54-990d-47aa2bb4e7d9"
// ]
}

// Алиас формы заказа
export type TOrderForm = Omit<IOrder, 'total' | 'items'>;


export interface IBasket {
	items: string[];
	total: number;
}

//Интерфейс модалки успешного заказа
interface ISuccess {
	total: number;
  }

//Интерфейс события
interface ISuccessActions {
	onClick: () => void;
}

interface IModal {
	content: HTMLElement;
}

//Интерфейс валидации формы
interface IFormValid {
	valid: boolean;
	errors: string[];
}

export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

//Интерфейс события
export interface IActions {
    onClick: (event: MouseEvent) => void;
}

export interface IPage {
    cardList: HTMLElement[];
}


//Интерфейс карточки в корзине
export interface ICardBasket {
	index: number;
	title: string;
	price: number;
}  

// export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';


