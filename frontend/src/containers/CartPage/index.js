import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCartItems } from '../../actions';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import CartItem from './CartItem';

import './style.css';

import { MaterialButton } from '../../components/MaterialUI';

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  //const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };
  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  return (
    <Layout>
      <div
        className='cartContainer'
        style={{ margin: '15px 30px', alignItems: 'flex-start' }}>
        <Card
          headerleft={`My Cart`}
          headerright={`Deliver To`}
          style={{ width: 'calc(100% - 400px)', overflow: 'hidden' }}>
          {Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
            />
          ))}

          <div
            style={{
              width: '100%',
              display: 'flex',
              background: '#ffffff',
              justifyContent: 'flex-end',
              boxShadow: '0 0 10px 10px #eee',
              padding: '10px 0',
              boxSizing: 'border-box',
            }}>
            <div style={{ width: '250px' }}>
              <MaterialButton
                title='PLACE ORDERS'
                onClick={() => props.history.push('/checkout')}
              />
            </div>
          </div>
        </Card>
        <Card headerleft='Price' style={{ width: '380px' }}></Card>
      </div>
    </Layout>
  );
};

export default CartPage;
