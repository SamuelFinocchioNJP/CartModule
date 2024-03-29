/* eslint-disable @typescript-eslint/no-unused-vars */
import { Cart } from '../cart';
import { PriceableAddition } from '../models/priceable-addition.model';
import { PriceableItem } from '../models/priceable-item.model';

test('does jest work', () => {
	expect(3 + 2).toBe(5);
});

test('cart addition', () => {
	const cart: Cart<PriceableItem<PriceableAddition>> = new Cart<
		PriceableItem<PriceableAddition>
	>();
	expect(cart.items).toStrictEqual([]);

	const firstItemWithoutAdditions: PriceableItem<PriceableAddition> = {
		name: 'Formaggio',
		price: 15,
	};

	expect(cart.addToCart(firstItemWithoutAdditions)).toBeTruthy();

	expect(cart.items).toStrictEqual([firstItemWithoutAdditions]);
	expect(cart.subtotal).toBe(firstItemWithoutAdditions.price);

	const firstItemWithAdditions: PriceableItem<PriceableAddition> = {
		name: 'Hamburgher',
		price: 11.5,
		additions: [
			{
				name: 'Onion',
				price: 2.5,
			},
		],
	};
	expect(cart.addToCart(firstItemWithAdditions)).toBeTruthy();

	expect(cart.items).toContain(firstItemWithoutAdditions);
	expect(cart.items).toContain(firstItemWithAdditions);
	expect(cart.items).toStrictEqual([
		firstItemWithoutAdditions,
		firstItemWithAdditions,
	]);

	expect(cart.subtotal).toBe(29);

	const secondItemWithAdditions: PriceableItem<PriceableAddition> = {
		name: 'HotDog',
		price: 5,
		additions: [
			{
				name: 'Cheese',
				price: 2,
				amount: 10,
			},
		],
	};

	expect(cart.addToCart(secondItemWithAdditions)).toBeTruthy();
	expect(cart.items).toContain(firstItemWithoutAdditions);
	expect(cart.items).toContain(firstItemWithAdditions);
	expect(cart.items).toContain(secondItemWithAdditions);

	expect(cart.items).toStrictEqual([
		firstItemWithoutAdditions,
		firstItemWithAdditions,
		secondItemWithAdditions,
	]);
	expect(cart.subtotal).toBe(54);

	console.log('Cart current status: ', JSON.stringify(cart));
});

test('cart removal', () => {
	const cart: Cart<PriceableItem<PriceableAddition>> = new Cart<
		PriceableItem<PriceableAddition>
	>();

	const firstItemWithoutAdditions: PriceableItem<PriceableAddition> = {
		name: 'Formaggio',
		price: 15,
	};

	expect(cart.addToCart(firstItemWithoutAdditions)).toBeTruthy();
	const firstItemWithAdditions: PriceableItem<PriceableAddition> = {
		name: 'Hamburgher',
		price: 11.5,
		additions: [
			{
				name: 'Onion',
				price: 2.5,
			},
		],
	};
	expect(cart.addToCart(firstItemWithAdditions)).toBeTruthy();

	const secondItemWithAdditions: PriceableItem<PriceableAddition> = {
		name: 'HotDog',
		price: 5,
		additions: [
			{
				name: 'Cheese',
				price: 2,
				amount: 10,
			},
		],
	};

	expect(cart.addToCart(secondItemWithAdditions)).toBeTruthy();

	expect(cart.removeFromCart(0)).toBeTruthy();
	expect(cart.items).toContain(firstItemWithAdditions);
	expect(cart.items).toContain(secondItemWithAdditions);
	expect(cart.items).not.toContain(firstItemWithoutAdditions);
	expect(cart.items).toStrictEqual([
		firstItemWithAdditions,
		secondItemWithAdditions,
	]);

	expect(cart.subtotal).toBe(39);

	expect(cart.removeFromCart(0)).toBeTruthy();

	expect(cart.items).toContain(secondItemWithAdditions);
	expect(cart.items).not.toContain(firstItemWithoutAdditions);
	expect(cart.items).not.toContain(firstItemWithAdditions);
	expect(cart.items).toStrictEqual([secondItemWithAdditions]);

	expect(cart.subtotal).toBe(25);
	expect(cart.removeFromCart(10)).toBeFalsy();

	expect(cart.removeFromCart(0)).toBeTruthy();
	expect(cart.items).not.toContain(firstItemWithoutAdditions);
	expect(cart.items).not.toContain(firstItemWithAdditions);
	expect(cart.items).not.toContain(secondItemWithAdditions);

	expect(cart.subtotal).toBe(0);
	expect(cart.items).toStrictEqual([]);

	expect(cart.removeFromCart(0)).toBeFalsy();
	expect(cart.subtotal).toBe(0);
	expect(cart.items).toStrictEqual([]);
});
