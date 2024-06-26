import { ApiListResponse, ICard, IOrder, ISuccess } from '../types';
import { Api } from './base/Api';

interface IWebLakerApi {
	getCardList: () => Promise<ICard[]>;
	getCardItem: (id: string) => Promise<ICard>;
	orderCard: (order: IOrder) => Promise<ISuccess>;
}

export class WebLarekApi extends Api implements IWebLakerApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	//получить список всех карточек
	getCardList(): Promise<ICard[]> {
		return this.get('/product').then((data: ApiListResponse<ICard>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	//получить данные карточки по ее id
	getCardItem(id: string): Promise<ICard> {
		return this.get(`/product/${id}`).then((item: ICard) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	//возврат данных по заказу, н-р {"id":"d0260fd6-7347-43c1-9626-7d1cdc02a5a4","total":2200}
	orderCard(order: IOrder): Promise<ISuccess> {
		return this.post(`/order`, order).then((data: ISuccess) => data);
	}
}
