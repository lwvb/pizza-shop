import React from 'react';
import { graphql } from 'gatsby';
import BeerList from '../components/BeerList';
import SEO from '../components/SEO';

export const query = graphql`
  {
    allBeer {
      nodes {
        id
        name
        price
        rating {
          average
          reviews
        }
        image
      }
    }
  }
`

const BeersPage: React.FC<{ data: any }> = ({ data: { allBeer }}) => (
  <>
    <SEO title="Beers" description={`We have ${allBeer.nodes.length} beers in stock`} />
    <h2 className="center">
      We have {allBeer.nodes.length} Beers Available. Dine in Only!
    </h2>
    <BeerList beers={allBeer.nodes} /> 
  </>
);

export default BeersPage;
