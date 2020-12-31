import { CreatePagesArgs, SourceNodesArgs } from 'gatsby';
import * as path from 'path';
import fetch from 'isomorphic-fetch';
import { promises } from 'fs';

interface PizzaGraphqlResult {
  pizzas: {
    nodes: {
      id: string;
      slug: { current: string };
    }[];
  }
};
interface ToppingsGraphqlResult {
  toppings: {
    nodes: {
      id: string;
      name: string;
    }[];
  }
};
interface SlicemasterGraphqlResult {
  slicemasters: {
    totalCount: number;
    nodes: {
      id: string;
      slug: { current: string };
    }[];
  }
};

interface Beer {
  name: string
}

const fetchBeersAndTurnIntoNodes = async ({ actions, createNodeId, createContentDigest}: SourceNodesArgs) => {
  const reponse = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await reponse.json() as Beer[];
  const nodes = beers.map(beer => {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: undefined,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    }
    return { ...beer, ...nodeMeta };
  });
  nodes.forEach(node => actions.createNode(node));
}

export const sourceNodes = async (params: SourceNodesArgs) => {
  return fetchBeersAndTurnIntoNodes(params);
}


async function turnPizzasIntoPages({ graphql, actions }: CreatePagesArgs) {
  const template = path.resolve('./src/templates/Pizza.tsx');
  const { data } = await graphql<PizzaGraphqlResult>(`
    query { 
      pizzas: allSanityPizza {
        nodes {
          id
          slug {
            current
          }
        }
      }
    }
  `);
  data?.pizzas.nodes.forEach(({ id, slug }) => {
    actions.createPage({
      path: `pizza/${slug.current}`,
      component: template,
      context: { id }
    })
  });
}

async function turnToppingsIntoPages({ graphql, actions }: CreatePagesArgs) {
  const template = path.resolve('./src/pages/pizzas.tsx');
  const { data } = await graphql<ToppingsGraphqlResult>(`
    query { 
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);
  data?.toppings.nodes.forEach(({ id, name }) => {
    actions.createPage({
      path: `topping/${name}`,
      component: template,
      context: { toppingId: id, toppingName: name }
    })
  });
}

async function turnSlicemastersIntoPages({ graphql, actions }: CreatePagesArgs) {
  const template = path.resolve('./src/templates/Slicemaster.tsx');
  const { data } = await graphql<SlicemasterGraphqlResult>(`
    query { 
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE || '4');
  const totalCount = data?.slicemasters.totalCount || 0;
  const pageCount = Math.ceil(totalCount / pageSize);
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i +1}`,
      component: path.resolve('./src/pages/slicemasters.tsx'),
      context: {
        skip: i * pageSize,
        limit: pageSize,
        currentPage: i+1,
      }
    })
  });
  data?.slicemasters.nodes.forEach(({ slug, id }) => {
    actions.createPage({
      path: `slicemaster/${slug.current}`,
      component: template,
      context: { id }
    })
  })
}

export const createPages = async (params: CreatePagesArgs) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ])
}