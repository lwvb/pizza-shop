import React, { createContext, useState } from 'react';
import { OrderItem } from '../interfaces/OrderItem';

interface Context {
  order: OrderItem[];
  setOrder: (order: OrderItem[]) => void;
}

export const OrderContext = createContext<Context>({ order: [], setOrder: () => {}});

export const OrderProvider: React.FC = ({ children }) => {
  const [order, setOrder] = useState<OrderItem[]>([]);
  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
