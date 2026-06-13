export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
}

export const STRIPE_PRODUCTS: StripeProduct[] = [
  {
    id: 'prod_UfXSLVj1ulnNsS',
    priceId: 'price_1TgCO1B0XGg8U41hnIy8Antc',
    name: 'DONATIONS',
    description: 'make payment for donations to support families and youths effected by youth crime and violence',
    mode: 'payment'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return STRIPE_PRODUCTS.find(product => product.priceId === priceId);
};