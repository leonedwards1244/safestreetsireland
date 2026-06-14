export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price_per_unit?: number;
  currency_symbol?: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_UfXSLVj1ulnNsS',
    priceId: 'price_1TgCO1B0XGg8U41hnIy8Antc',
    name: 'DONATIONS',
    description: 'make payment for donations to support families and youths effected by youth crime and violence',
    mode: 'payment'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};