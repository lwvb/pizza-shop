import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

export const query = graphql`
query Slicemasters($skip: Int = 0, $limit: Int = 4) {
  slicemasters: allSanityPerson(skip: $skip, limit: $limit) {
    totalCount
    nodes {
      name
      id
      slug {
        current
      }
      description
      image {
        asset {
          fluid(maxWidth: 410) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
}
`;

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const Slicemaster = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

const SlicemastersPage: React.FC<{ data: any, pageContext: any }> = ({ data, pageContext }) => {
  const slicemasters = data.slicemasters.nodes;
  const { limit, currentPage } = pageContext;
  return (
    <>
      <SEO
        title={`Slicemasters - Page ${pageContext.currentPage || 1}`}
        description="Who is going to slice your delicious pizza?"
      />
      <Pagination base='slicemasters' limit={limit} currentPage={currentPage} totalCount={data.slicemasters.totalCount} />
      <SlicemasterGrid>
        {slicemasters.map((person: any) => (
          <Slicemaster key={person.id}>
            <Link to={`/slicemaster/${person.slug.current}`}>
              <h2>
                <span className="mark">{person.name}</span>
              </h2>
            </Link>
            <Img fluid={person.image.asset.fluid} />
            <p className="description">
              {person.description}
            </p>
          </Slicemaster>
        ))}
      </SlicemasterGrid>
    </>
  );
};

export default SlicemastersPage;
