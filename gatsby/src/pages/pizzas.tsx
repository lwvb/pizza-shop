import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilters';

export const query = graphql`
query Pizzas($toppingId: String) {
  allSanityPizza(filter: { 
    toppings: {elemMatch: {id: {eq: $toppingId}}}
  }) {
    pizzas: nodes {
      id
      name
      price
      slug {
        current
      }
      toppings {
        id
        name
        isVegetarian
      }
      image {
        asset {
          fluid(maxWidth: 400) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
}
`;

const PizzasPage: React.FC<{ data: any, pageContext: any }> = ({ data: { allSanityPizza }, pageContext }) => (
  <>
    <SEO
      title={pageContext.toppingName ? `Pizzas with ${pageContext.toppingName}` : 'All pizzas'}
      description={`Try one of these great slicemaster pizzas, what about ${allSanityPizza.pizzas[0]?.name}`}
      image={allSanityPizza.pizzas[0]?.image?.asset?.fluid?.src}
    />
    <ToppingsFilter current={pageContext.toppingId} />
    <PizzaList pizzas={allSanityPizza.pizzas} /> 
  </>
);

export default PizzasPage;
