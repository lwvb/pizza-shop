import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

export interface Pizza {
  id: string;
  name: string;
  price: number;
  toppings: {
    id: string;
    name: string;
    isVegetarian: boolean;
  }[]
  slug: {
    current: string;
  };
  image: any;
}

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2, p {
    margin: 0;
  }
`;

const Pizza: React.FC<Pizza> = ({ name, slug, toppings, image }) => (
  <PizzaStyles>
    <Link to={`/pizza/${slug.current}`}>
      <h2><span className="mark">{name}</span></h2>
    </Link>
    <p>
      {toppings.map((topping) => topping.name).join(', ')}
    </p>
    <Img fluid={image.asset.fluid} alt={name} />
  </PizzaStyles>
)

const PizzaList: React.FC<{ pizzas: Pizza[]}> = ({ pizzas }) => (
  <PizzaGridStyles>
    {pizzas.map((pizza) => <Pizza {...pizza} key={pizza.id} />)}
  </PizzaGridStyles>
);

export default PizzaList;
