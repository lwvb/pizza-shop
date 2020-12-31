import React from 'react';
import { graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

interface Person {
  name: string;
  description: string
  image: { asset: { fluid: FluidObject } };
}

export const query = graphql`
  query Slicemaster($id: String!) {
    person: sanityPerson(id: { eq: $id }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 700) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;



const Slicemaster: React.FC<{ data: any }> = ({ data }) => {
  const { name, description, image } = data.person as Person;
  return  (
    <>
      <SEO
        title={`Slicemaster ${name}`}
        description={description.substr(0, 100)}
        image={image?.asset?.fluid?.src}
      />
      <div className="center">
        <Img fluid={image.asset.fluid} alt={name} />
        <h2 className="mark">{name}</h2>
        <p>{description}</p>
      </div>
    </>
  )
}

export default Slicemaster;
