//Интерфейс данных товара с сервера
interface ICardItem {
	id: string;
	title: string;
	description: string;
	category: string;
	image: string;
	price: number | null;
}

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

interface IAppState {
    cardList: ICardItem[];
    basket: string[];
    // order: IOrder | null;
    preview: string | null;
    // formErrors: FormErrors;
 }

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

interface IProductItem {
        id: string;
        description: string;
        image: string;
        title: string;
        category: string;
        price: number | null;
}

interface IProductList {
    items: IProductItem[];
}

interface IOrderSuccess {
	id: string;
	total: number;
    // "id": "28c57cb4-3002-4445-8aa1-2a06a5055ae5",
    // "total": 2200
}

interface IOrder {
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

// используется в превью и в каталоге
enum productCategory {
       soft =  "софт-скил",
       other = "другое",
       additional = "дополнительное",
       button = "кнопка",
       hard = "хард-скил"
}