import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsById } from '../../actions/product.actions';

export const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    const { productId } = props.match.params;

    console.log(props);

    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);
  return (
    <Layout>
      <div>{product.productDetails.name}</div>
    </Layout>
  );
};
