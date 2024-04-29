//Интерфейс данных товара с сервера
// interface ICardItem {
// 	id: string;
// 	title: string;
// 	description: string;
// 	category: string;
// 	image: string;
// 	price: number | null;
// }

// +++++++++++++++++++++
// export interface ICard {
// 	id: string;
// 	description: string;
// 	image: string;
// 	title: string;
// 	category: string;
// 	price: number | null;
// }

// export interface IBasket {
// 	items: string[];
// 	total: number;
// }

// interface IAppState {
//     cardList: ICardItem[];
//     basket: string[];
//     order: IOrder | null;
//     preview: string | null;
//     formErrors: FormErrors;
//  }

// export interface ICardfData {
//     products: ICard[];
//     preview: string | null; // свойство, в коротом хранится id выбранной карточки
//     addCard(card: ICard): void;
//     deleteCard(cardId: string, payload: Function | null): void;
//     updateCard(card: ICard, payload: Function | null): void;
//     getCard(cardId: string): ICard;
//     checkValidation(data: Record<keyof TCardInfo, string>): boolean;
// }

// export type TCardInfo = Pick<ICard, 'name' | 'link'>;

// export interface IOrder {
// 	payment: string;
// 	email: string;
// 	phone: string;
// 	address: string;
// 	items: string[];
// 	total: number;
// }

// export type TOrderForm = Omit<IOrder, 'total' | 'items'>;

// export interface IOrderResult {
// 	id: string;
// 	total: number;
// }