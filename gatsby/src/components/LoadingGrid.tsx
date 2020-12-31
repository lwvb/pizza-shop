import React from 'react';
import styled from 'styled-components';

const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

export const ItemStyles = styled.div`
  text-align: center;
  position: relative;
  img {
    height: auto;
    font-size: 0;
  }
  p {
    transform: rotate(-2deg) translateY(-140%);
    position: absolute;
    width: 100%;
    left: 0;
  }
  .mark {
    display: inline;
  }
  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: 40px;
    }
  }
  img.loading {
    --shine: white;
    --background: var(--grey);
    background-image: linear-gradient(90deg, var(--background) 0px, var(--shine) 40px, var(--background) 80px);
    background-size: 500px;
    animation: shine 2s infinite linear;
  }
`;

interface Props {
  count: number;
  loading: boolean;
  title: string;
  description: string;
}

const Loading: React.FC = () => (
  <ItemStyles>
    <p><span className="mark">Loading...</span></p>
    <img 
      src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
      className="loading"
      alt="Loading"
      width="500"
      height="400"
    />  
  </ItemStyles>

);

const LoadingGrid: React.FC<Props> = ({ count, loading, children, title, description }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">{title}</span>
    </h2>
    <p>{description}</p>
    <ItemsGrid>
      {loading 
        ? Array.from(Array(count).keys()).map(item => <Loading key={item} />)
        : children
      }
    </ItemsGrid>
  </div>
);

export default LoadingGrid;
