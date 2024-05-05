import {Model} from './base/Model';
import {IAppState, ICard, IOrder, TFormErrors} from '../types';


// interface IAppState {
//     cardList: ICard[];
//     basket: string[];
//     order: IOrder | null;
//     preview: string | null;
//     formErrors: TFormErrors;

    
//  }

export class AppState extends Model<IAppState> {
    cardList: ICard[];
    basket: ICard[] = [];
	order: IOrder = {address: '', payment: '', email: '', total: 0, phone: '',items: []};
    preview: string | null;
    formErrors: TFormErrors = {};

    //Вывести каталог
    setCatalog(items: ICard[]) {
      this.cardList = items;
      this.emitChanges('items:changed',  this.cardList);
    }

    //Вернуть информацию по составу в корзине
    get statusBasket(): boolean {
      return this.basket.length === 0
    }

    //Вернуть общую сумму заказов
    getTotal () {
      return this.basket.reduce((acc, item) => acc + item.price, 0);
    }

    //Вернуть список товара в корзине
    // get basketList(): ICardItem[] {
    get basketList(): ICard[] {      
      return this.basket
    }    
}    