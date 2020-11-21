import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
import { Link } from 'react-router-dom';
import './style.css';
const ProductStore = (props) => {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  });
  const product = useSelector((state) => state.product);

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, [dispatch]);

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className='card' key={index}>
            <div className='cardHeader'>
              <div>
                {props.match.params.slug.split('-')[0]} mobile under{' '}
                {priceRange[key]}
              </div>
              <button>view all</button>
            </div>
            <div className='productContainerOuter'>
              {product.productsByPrice[key].map((p, index) => (
                <Link
                  to={`/${p.slug}/${p._id}/p`}
                  style={{ display: 'block' }}
                  key={index}
                  className='productContainer'>
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
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductStore;
