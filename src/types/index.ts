export interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

// перечисление категория карточек
export enum CardCategoryEnum {
	'софт-скил' = 'soft',
	'другое' = 'other',
	'дополнительное' = 'additional',
	'кнопка' = 'button',
	'хард-скил' = 'hard',
}

export interface IAppState {
	cardList: ICard[];
	basket: string[];
	order: IOrder | null;
	preview: string | null;
	formErrors: TFormErrors;
}



// Интерфейс для типизации ответа сервера в случае успешного оформления заказа
export interface IOrderSuccess {
	id: string;
	total: number;
}

//Интерфейс модалки
export interface IModalData {
	content: HTMLElement;
}

//интерфейс корзины
export interface IBasket {
	items: string[];
	total: number;
}

//Интерфейс события
export interface ISuccessActions {
	onClick: () => void;
}

export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

//Интерфейс события
export interface IActions {
	onClick: (event: MouseEvent) => void;
}

// Интерфейс главной страницы
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

//алиас ошибки формы
export type TFormErrors = Partial<Record<keyof IOrder, string>>;

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
	id: string;
	total: string;
}
