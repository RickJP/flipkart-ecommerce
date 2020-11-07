import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.actions';
import Modal from '../../components/UI/Modal';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';

function Products() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [show, setShow] = useState(false);
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();

    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', description);
    form.append('category', categoryId);

    for (let pic of productPictures) {
      form.append('productPictures', pic);
    }

    // for (let e of form.entries()) {
    //   console.log(e[0] + ' - ' + e[1] + ' - ' + e[2] + ' - ' + e[3]);
    // }

    if (name !== '') {
      dispatch(addProduct(form));
    }

    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table responsive='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((p) => (
                <tr onClick={() => showProductDetailsModal(p)} key={p._id}>
                  <td>3</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.quantity}</td>
                  <td>{p.category.name}</td>
                  <td></td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const showProductDetailsModal = (product) => {
    console.log(product);
    setProductDetails(product);
    setProductDetailsModal(true);
  };

  const renderAddProductModal = () => {
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={'Add New Product'}>
        <Input
          label='Name'
          value={name}
          placeholder={`Category Name`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label='Quantity'
          value={quantity}
          placeholder={`Quantity`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label='Price'
          value={price}
          placeholder={`Price`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label='Description'
          value={description}
          placeholder={`Description`}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className='form-control'
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}>
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{JSON.stringify(pic.name)}</div>
            ))
          : null}

        <input
          type='file'
          name='productPicture'
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailsModal(false);
  };

  const renderProductDetailsModal = () => {
    // if (!productDetails) return null;

    return (
      <Modal
        show={productDetailsModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={`Product Details`}
        size='lg'>
        <Row>
          <Col md='6'>
            <label className='key'>Name</label>
            <p className='value'>{productDetails?.name}</p>
          </Col>
          <Col md='6'>
            <label className='key'>Price</label>
            <p className='value'>{productDetails?.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <label className='key'>Quantity</label>
            <p className='value'>{productDetails?.quantity}</p>
          </Col>
          <Col md='6'>
            <label className='key'>Category</label>
            <p className='value'>{productDetails?.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <label className='key'>Description</label>
            <p className='value'>{productDetails?.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className='key'>Product Pictures</label>
            <div className='productPictures'>
              {productDetails?.productPictures.map((pic) => (
                <div className='productImgContainer'>
                  <img src={generatePublicUrl(pic?.img)} alt='' />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className='__category-option'>
              <h2>PRODUCTS</h2>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
}

export default Products;
