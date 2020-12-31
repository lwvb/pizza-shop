import React from 'react';
import SEO from '../components/SEO';
import useLatestData, { Slicemaster, HotSlice} from '../utils/useLatestData';
import { Link } from 'gatsby';
import { HomePageGrid } from '../styles/grids';
import LoadingGrid, { ItemStyles } from '../components/LoadingGrid';

const Image: React.FC<{ image: any, alt: string}> = ({ image, alt }) => (
  <img
    src={`${image.asset.url}?w=500&h=400&fit=crop`}
    alt={alt}
    style={{background: `url(${image.asset.metadata.lqip})`, backgroundSize: 'cover'}}
  />      
)

const CurrentlySlicing: React.FC<{ slicemasters: Slicemaster[]}> = ({ slicemasters }) => {
  if (!slicemasters.length) {
    return <p>No one is working right now!</p>;
  }
  return (
    <>
      {slicemasters.map(({ _id: id, name, image}) => (
        <ItemStyles key={id}>
          <p><span className="mark">{name}</span></p>
          <Image image={image} alt={name} />
        </ItemStyles>
      ))}
    </>
  )
}

const HotSlices: React.FC<{ slices: HotSlice[]}> = ({ slices }) => {
  if (!slices.length) {
    return <p>No slices in the case right now!</p>;
  }
  return (
    <>
      {slices.map(({ _id: id, slug, name, image}) => (
        <ItemStyles key={id}>
          <Link to={`/pizza/${slug.current}`}>
            <p><span className="mark">{name}</span></p>
          </Link>
          <Image image={image} alt={name} />
        </ItemStyles>
      ))}
    </>
  )
}

const Homepage: React.FC = () => {
  const { hotSlices, sliceMasters, loading, error } = useLatestData();
  return (
    <>
      <SEO
        title="Welcome"
        description="Check out our pizza's and place your order now"
      />
      <div className="center">
        <h1>The best Pizza in town</h1>
        <p>Open 11am to 11pm Every Single Day</p>
        <HomePageGrid>
          <LoadingGrid count={4} loading={!sliceMasters.length && loading} title="Slicemasters on" description="Standing by, ready to slice you up!">
            <CurrentlySlicing slicemasters={sliceMasters} />            
          </LoadingGrid>
          <LoadingGrid count={4} loading={!hotSlices.length && loading} title="Hot Slices" description="Come on by, buy the slice">
            <HotSlices slices={hotSlices} />
          </LoadingGrid>
        </HomePageGrid>
      </div>
    </>
  );
};

export default Homepage;
