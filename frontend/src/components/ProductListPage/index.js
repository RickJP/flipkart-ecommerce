import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions/product.actions';
import { generatePublicUrl } from '../../urlConfig';
import Layout from '../Layout';
import './style.css';

export const ProductListPage = (props) => {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  });
  const product = useSelector((state) => state.product);

  const category = props.match.params.slug;

  useEffect(() => {
    dispatch(getProductsBySlug(category));
  }, [dispatch, category]);

  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className='card' key={index}>
            <div className='cardHeader'>
              <div>
                {category} mobile under {priceRange[key]}
              </div>
              <button>view all</button>
            </div>
            <div className='productContainerOuter'>
              {product.productsByPrice[key].map((p, index) => (
                <div key={index} className='productContainer'>
                  <div className='productImgContainer'>
                    {p.productPictures[0] && (
                      <img
                        src={generatePublicUrl(p.productPictures[0].img)}
                        alt=''
                      />
                    )}
                  </div>
                  <div className='productInfo'>
                    <div className='productName'>{p.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>2336</span>
                    </div>
                    <div className='productPrice'>{p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Layout>
  );
};
