export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price_per_unit?: number;
  currency_symbol?: string;
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_UfXSLVj1ulnNsS',
    priceId: 'price_1TgCO1B0XGg8U41hnIy8Antc',
    name: 'DONATIONS',
    description: 'Make payment for donations to support families and youths affected by youth crime and violence',
    mode: 'payment',
    price_per_unit: undefined,
    currency_symbol: '€',
  },
];

export function getProductById(id: string): StripeProduct | undefined {
  return STRIPE_PRODUCTS.find(product => product.id === id);
}

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
}