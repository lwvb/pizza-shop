import React from 'react';
import { graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

interface Pizza {
  id: string;
  name: string;
  image: { asset: { fluid: FluidObject } };
  toppings: {
    id: string;
    name: string;
    isVegetarian: boolean;
  }[];
}

export const query = graphql`
  query Pizza($id: String!) {
    pizza: sanityPizza(id: { eq: $id }) {
      id
      name
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        id
        name
        isVegetarian
      }
    }
  }
`;

const PizzaStyles = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;


const Pizza: React.FC<{ data: any }> = ({ data }) => {
  const { name, image, toppings } = data.pizza as Pizza;
  return  (
    <>
      <SEO
        title={name}
        description={toppings.map(({ name }) => name).join(', ')}
        image={image?.asset?.fluid?.src} 
      />;
      <PizzaStyles>
        <Img fluid={image.asset.fluid} alt={name} />
        <div>
          <h2 className="mark">{name}</h2>
          <ul>
            {toppings.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      </PizzaStyles>
    </>
  )
}

export default Pizza;
