import { PriceableAddition } from './priceable-addition.model';

export interface PriceableItem {
	name: string;
	price: number;
	amount: number;
	additions?: Set<PriceableAddition>;
}
