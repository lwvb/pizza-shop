import React from 'react';
import { WrapPageElementNodeArgs, WrapRootElementNodeArgs } from 'gatsby';
import Layout from '../components/Layout';
import { OrderProvider } from '../components/OrderContext';

export function wrapPageElement({ element, props }: WrapPageElementNodeArgs) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }: WrapRootElementNodeArgs) {
  return <OrderProvider>{element}</OrderProvider>;
}
