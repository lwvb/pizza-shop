import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import { OrderPizza } from '../interfaces/OrderPizza';
import { sizes } from '../interfaces/Size';

export const query = graphql`
  query OrderPizzas {
    allSanityPizza {
      pizzas: nodes {
        id
        name
        price
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    display: grid;
    gap: 1rem;
    align-content: start;
    &.order,
    &.menu {
      grid-column: span 1;
    }
  }
  input[name="pizza"] {
    display: none;
  }
  @media (max-width: 900px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  }
`;

const MenuItemStyles = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0 1.3rem;
  align-content: center;
  position: relative;
  align-items: center;
  .gatsby-image-wrapper {
    grid-row: span 2;
    height: 100%;
  }
  p {
    margin: 0;
  }
  button {
    font-size: 1.5rem;
  }
  button + button {
    margin-left: 1rem;
  }
  .remove {
    background: none;
    color: var(--red);
    font-size: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: none;
    line-height: 1rem;
  }
`;

const OrderPage: React.FC<{ data: any }> = ({ data }) => {
  const pizzas = data.allSanityPizza.pizzas as OrderPizza[];
  const { values, updateValue, reset } = useForm({ name: '', email: '', pizza: '' });
  const { order, addToOrder, removeFromOrder, error, loading, message, submitOrder } = usePizza({
    pizzas,
    inputs: values,
    reset,
  });
  const renderField = (name: keyof typeof values, label: string) => (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        name={name}
        value={values[name]}
        onChange={updateValue}
      />
    </>
  );
  return (
    <>
      <SEO
        title="Order the best pizza in town"
        description="Pizzas delivered fresh to you doorstep."
      />
      <h1>Order</h1>
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your info</legend>
          {renderField('name', 'Name')}
          {renderField('email', 'Email')}
          <input
            type="text"
            name="pizza"
            value={values.pizza}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                style={{ width: 50, heigth: 50 }}
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
              />
              <h2>{pizza.name}</h2>
              <div>
                {sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => addToOrder({ id: pizza.id, size })}
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          {order.map((item, index) => {
            const pizza = pizzas.find(({ id }) => id === item.id);
            if (!pizza) return null;
            return (
              <MenuItemStyles key={`${item.id}-${index}`}>
                <Img fluid={pizza.image.asset.fluid} />
                <h2>{pizza.name}</h2>
                <p>
                  {formatMoney(calculatePizzaPrice(pizza.price, item.size))}
                  <button
                    type="button"
                    onClick={() => removeFromOrder(index)}
                    className="remove"
                    title={`Remove ${item.size} ${pizza.name}`}
                  >
                    &times;
                  </button>
                </p>
              </MenuItemStyles>
            );
          })}
        </fieldset>
        <fieldset>
          <h3>
            Your total is: {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <div>
            {error ? <p>Error: {error}</p> : null}
            {message ? <p>{message}</p> : null}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'placing order...' : 'Order'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
};

export default OrderPage;
