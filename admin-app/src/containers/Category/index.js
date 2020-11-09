import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../actions';
import Layout from '../../components/Layout';
import './style.css';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';

function Category(props) {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  const handleClose = () => {
    const form = new FormData();

    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);

    if (categoryName !== '') {
      dispatch(addCategory(form));
    }

    setCategoryName('');
    setParentCategoryId('');

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let _categories = [];
    for (let category of categories) {
      _categories.push(
        <li key={category.id}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>,
      );
    }
    return _categories;
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

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className='__category-option'>
              <h2>CATEGORY</h2>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>
              {renderCategories(category.categories)}
              {/* {JSON.stringify(createCategoryList(category.categories))} */}
            </ul>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={'Add New Category'}
        saveChangesBtn={true}>
        <Input
          value={categoryName}
          placeholder={`Category Name`}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          className='form-control'
          onChange={(e) => setParentCategoryId(e.target.value)}>
          <option>Select Category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <input
          type='file'
          name='categoryImage'
          onChange={handleCategoryImage}
        />
      </Modal>
    </Layout>
  );
}

export default Category;
