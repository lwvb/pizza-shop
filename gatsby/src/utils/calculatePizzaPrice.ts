import { Size } from '../interfaces/Size';

const sizesValues = {
  S: 0.75,
  M: 1,
  L: 1.25,
};
const calculatePizzaPrice = (cents: number, size: Size) =>
  cents * sizesValues[size];

export default calculatePizzaPrice;
