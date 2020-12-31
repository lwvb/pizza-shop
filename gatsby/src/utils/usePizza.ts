import { FormEvent, useContext, useState } from 'react';
import { OrderContext } from '../components/OrderContext';
import { OrderItem } from '../interfaces/OrderItem';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

const usePizza = ({ pizzas, inputs, reset }) => {
  const { order, setOrder } = useContext(OrderContext);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')
  const addToOrder = (orderedPizza: OrderItem) => {
    setOrder([...order, orderedPizza]);
  };
  const removeFromOrder = (index: number) => {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  };
  const submitOrder = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    setMessage('');
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: inputs.name,
      email: inputs.email,
      pizza: inputs.pizza,
    };
    try {
      const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const text = JSON.parse(await res.text());
      if (res.status >= 400 && res.status < 600) {
        setError(text.message);
        return;
      }
      setMessage(text.message);
      setOrder([]);
      reset();
    } catch (e) {
      console.log('catched', e);
      setError('Unable to send your order, please try again')
    } finally {
      setLoading(false);
    }
  }

  return {
    order,
    error, loading, message,
    submitOrder,
    addToOrder,
    removeFromOrder,
  };
};

export default usePizza;
