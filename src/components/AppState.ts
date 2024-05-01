import {Model} from './base/Model';
import {ICard, IOrder, TFormErrors} from '../types';


interface IAppState {
    cardList: ICard[];
    basket: string[];
    order: IOrder | null;
    preview: string | null;
    formErrors: TFormErrors;
 }

export class AppState extends Model<IAppState> {
    cardList: ICard[];

    //Вывести каталог
    setCatalog(items: ICard[]) {
		this.cardList = items;
		this.emitChanges('items:changed',  this.cardList);
    }
}    