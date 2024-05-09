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
export enum CardCategoryEnum {
    'софт-скил' = 'soft',
    'другое' = 'other',
    'дополнительное' = 'additional',
    'кнопка' = 'button',
    'хард-скил' = 'hard'
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
// export interface IOrder {
//     payment: string;
//     email: string;
//     phone: string;
//     address: string;
//     total: number;
//     items: string[];
// }
//Интерфейс заказа

export interface IOrder extends IOrderForm {
    items: string[];
}

// Алиас формы заказа
export type TOrderForm = Omit<IOrder, 'total' | 'items'>;


export interface IBasket {
	items: string[];
	total: number;
}

// //Интерфейс модалки успешного заказа
// interface ISuccess {
// 	total: number;
//   }

//Интерфейс события
export interface ISuccessActions {
	onClick: () => void;
}

export interface IModal {
	content: HTMLElement;
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

//Интерфейс карточки товара в превью
export interface ICardPreview {
	text: string;
}  

//Интерфейс карточки в корзине
export interface ICardBasket {
	index: number;
	title: string;
	price: number;
}  

//Интерфейс валидации формы
export interface IFormValid {
	valid: boolean;
	errors: string[];
}


//Тип ошибки формы
export type FormErrors = Partial<Record<keyof IOrder, string>>;

//Интерфейс заказа
export interface IOrder extends IOrderForm {
    items: string[];
}

//Интерффейс формы заказа
export interface IOrderForm {
	payment?: string;
	address?: string;
	phone?: string;
	email?: string;
	total?: string | number;
}

//Интерфейс формы успешного заказа
export interface ISuccess {
	total: string;
  }

export interface ISuccessfulForm {
    id: string;
    total: string;
}



// export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';


