import { PriceableAddition } from './priceable-addition.model';

export interface PriceableItem<T extends PriceableAddition> {
	name: string;
	price: number;
	additions?: Array<T>;
}
