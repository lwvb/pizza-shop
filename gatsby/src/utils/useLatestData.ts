import { useEffect, useState } from "react";

export interface HotSlice {
  _id: string;
  name: string;
  slug: { current: string };
  image: any;
}
export interface Slicemaster {
  _id: string;
  name: string;
  image: any;
}

const gql = String.raw;

const image = `
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

const useLatestData = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hotSlices, setHotSlices] = useState<HotSlice[]>([]);
  const [sliceMasters, setSliceMasters] = useState<Slicemaster[]>([]);

  const loadData = async () => {
    if (!process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT) {
      setError(true);
      return;
    }
    setLoading(true);
    const response = await fetch(process.env.GATSBY_SANITY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        query: gql`
          query homepage {
            StoreSettings(id: "main-store") {
              _id
              name
              slicemaster {
                _id
                name
                ${image}
              }
              hotSlices {
                _id
                name
                slug {
                  current
                }
                ${image}
              }
            }
          }
        `,
      })
    });
    const { data } = await response.json();
    if (!data) {
      setError(true);
      setLoading(false);
      return;
    }
    setError(false);
    setHotSlices(data.StoreSettings.hotSlices);
    setSliceMasters(data.StoreSettings.slicemaster);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
    const timeOut = setInterval(loadData, 3000);
    return () => clearInterval(timeOut);
  }, []);

  return { hotSlices, sliceMasters, error, loading };
}

export default useLatestData;
