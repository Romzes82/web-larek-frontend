export interface ICard {
        id: string;
        description: string;
        image: string;
        title: string;
        category: string;
        price: number | null;
}

// interface IProductList {
export interface ICardList {    
    items: ICard[];
}

// перечисление категория карточек
export enum CardCategory {
    soft =  "софт-скил",
    other = "другое",
    additional = "дополнительное",
    button = "кнопка",
    hard = "хард-скил"
}

export interface IAppState {
    cardList: ICardList;
    basket: string[];
    order: IOrder | null;
    preview: string | null;
    formErrors: TFormErrors;
 }

 //алиас ошибки формы
export type TFormErrors = Partial<Record<keyof IOrder, string>>;



export interface IOrderSuccess {
	id: string;
	total: number;
    // "id": "28c57cb4-3002-4445-8aa1-2a06a5055ae5",
    // "total": 2200
}

//Интерфейс заказа
export interface IOrder {
    payment: string,
    email: string,
    phone: string,
    address: string,
    total: number,
    items: string[]
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

// Адиас формы заказа
export type TOrderForm = Omit<IOrder, 'total' | 'items'>;


export interface IBasket {
	items: string[];
	total: number;
}

//Интерфейс формы успешного заказа
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


