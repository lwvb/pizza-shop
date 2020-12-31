import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

interface Topping {
  name: string;
  id: string;
  vegetarian: boolean;
}

interface ToppingWithCount extends Topping {
  count: number;
}

interface Pizza {
  toppings: Topping[];
}

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    background: var(--grey);
    align-items: center;
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &.active {
      background: var(--yellow);
    }
  }
`;

const ToppingsFilter: React.FC<{current: string}> = ({ current }) => {
  const { allSanityPizza: { pizzas }} = useStaticQuery<{ allSanityPizza: { pizzas: Pizza[]} }>(graphql`
    query ToppingsAndPizzas {
      allSanityPizza {
        pizzas: nodes {
          toppings {
            id
            name
            isVegetarian
          }
        }
      }
    }
  `);

  const toppings = Object.values(
    pizzas
      .flatMap((pizza) => pizza.toppings)
      .reduce((current: Record<string, ToppingWithCount>, next) => {
        if (current[next.id]) {
          return { ...current, [next.id]: { ...current[next.id], count: current[next.id].count + 1}};
        }
        return { ...current, [next.id]: { ...next, count: 1 } };
      }, {})
    ).sort((a, b) => b.count - a.count);

  return (
    <ToppingsStyles>
      {toppings.map(({ id, name, count}) => (
        <Link key={id} to={`/topping/${name}`} className={id === current ? 'active' : ''}>
          <span className="name">{name}</span>
          <span className="count">{count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}

export default ToppingsFilter;
