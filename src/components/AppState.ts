import {Model} from './base/Model';
// import {IAppState, ICardItem} from '../types';


interface IAppState {
    cardList: ICardItem[];
    basket: string[];
    // order: IOrder | null;
    preview: string | null;
    // formErrors: FormErrors;
 }

export class AppState extends Model<IAppState> {
    cardList: ICardItem[];

    //Вывести каталог
    setCatalog(items: ICardItem[]) {
		this.cardList = items;
		this.emitChanges('items:changed',  this.cardList);
    }
}    