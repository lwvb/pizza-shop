import calculatePizzaPrice from './calculatePizzaPrice';
import { OrderItem } from '../interfaces/OrderItem';
import { OrderPizza } from '../interfaces/OrderPizza';

const calculateOrderTotal = (order: OrderItem[], pizzas: OrderPizza[]) => {
  return order.reduce((total, item) => {
    const pizza = pizzas.find(({ id }) => id === item.id);
    if (!pizza) return total;
    return total + calculatePizzaPrice(pizza?.price, item.size);
  }, 0);
};

export default calculateOrderTotal;
