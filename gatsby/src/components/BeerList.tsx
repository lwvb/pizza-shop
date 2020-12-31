import React from 'react';
import styled from 'styled-components';

export interface Beer {
  id: string;
  name: string;
  price: string;
  rating: {
    average: number;
    reviews: number;
  }
  image: string;
}

const BeerGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const BeerStyles = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
  h3 {
    flex: 1;
  }
  .rating {
    vertical-align: bottom;
    align-self: flex-end;
  }
  .inactive {
    filter: grayscale(100%);
  }
`;

const Beer: React.FC<Beer> = ({ name, image, price, rating }) => {
  const stars = Math.round(rating.average);
  return (
    <BeerStyles>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {price}
      <p title={`${stars} out of 5 stars`} className="rating">
        {`⭐`.repeat(stars)}
        <span className="inactive">{`⭐`.repeat(5-stars)}</span>
        <span>({rating.reviews})</span>
      </p>
    </BeerStyles>
  )
}

const BeerList: React.FC<{ beers: Beer[]}> = ({ beers }) => (
  <BeerGridStyles>
    {beers.map((beer) => <Beer {...beer} key={beer.id} />)}
  </BeerGridStyles>
);

export default BeerList;
