import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';

import './style.css';

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;

  return (
    <Layout>
      <div className='cartContainer'>
        <Card headerleft={`My Cart`} headerright={`Deliver To`}>
          {Object.keys(cartItems).map((key, index) => (
            <div key={index}>
              <div className='cartProductContainer'>
                <img src='' alt='' />
              </div>

              <div className='cartItemDetails row'>
                <div className='column'>
                  {cartItems[key].name} - quantity - {cartItems[key].qty}
                </div>
                <div className='column'>Mr Brown</div>
              </div>
            </div>
          ))}
        </Card>
        <Card style={{ width: '500px' }}>Price</Card>
      </div>
    </Layout>
  );
};

export default CartPage;
