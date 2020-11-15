import React from 'react';
import Layout from '../../components/Layout';
import ProductStore from './ProductStore';
import getParams from '../../utils/getParams';
import './style.css';
import ProductPage from './ProductPage';

export const ProductListPage = (props) => {
  const renderProduct = () => {
    const params = getParams(props.location.search);
    let content = null;

    switch (params.type) {
      case 'store':
        content = <ProductStore {...props} />;
        break;
      case 'page':
        content = <ProductPage {...props} />;
        break;
      default:
        content = null;
        break;
    }

    return content;
  };
  return <Layout>{renderProduct()}</Layout>;
};
