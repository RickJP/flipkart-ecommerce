import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { linearCategories } from '../../helpers/linearCategories';
import { createPage } from '../../actions';

const NewPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    console.log(page);
    if (!page.loading) {
      setCreateModal(false);
      setTitle('');
      setType('');
      setCategoryId('');
      setDescription('');
      setProducts([]);
      setBanners([]);
    }
  }, [page]);

  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    //e.target.preventDefault();
    const form = new FormData();

    if (title === '') {
      alert('Title is required');
      setCreateModal(false);
      return;
    }

    form.append('title', title);
    form.append('description', description);
    form.append('category', categoryId);
    form.append('type', type);

    banners.forEach((banner, index) => {
      form.append('banners', banner);
    });

    products.forEach((product, index) => {
      form.append('products', product);
    });

    dispatch(createPage(form));
  };

  const handleCategoryChange = (e) => {
    const category = categories.find(
      (category) => category._id === e.target.value,
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={'Create New Page'}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}>
        <Container>
          <Row>
            <Col>
              {/* <select
                className='form-control form-control-sm'
                value={type}
                onChange={(e) => handleCategoryChange(e)}>
                <option value=''>Select Type</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.type}
                  </option>
                ))}
              </select> */}
              <select
                className='form-control form-control-sm'
                value={categoryId}
                onChange={handleCategoryChange}>
                <option>Select Category</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* <Input
                type='select'
                value={categoryId}
                onChange={handleCategoryChange}
                options={categories}
                placeholder={'Select Category'}></Input> */}
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                className='form-control form-control-sm'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Page Title`}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                className='form-control form-control-sm'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`Page Description`}
              />
            </Col>
          </Row>

          <Row>
            {banners?.length > 0
              ? banners.map((banner, index) => (
                  <Row key={index}>
                    <Col>{banner.name}</Col>
                  </Row>
                ))
              : null}
            <Col>
              <Input type='file' name='banners' onChange={handleBannerImages} />
            </Col>
          </Row>

          <Row>
            {products?.length > 0
              ? products.map((product, index) => (
                  <Row key={index}>
                    <Col>{product.name}</Col>
                  </Row>
                ))
              : null}
            <Col>
              <Input
                type='file'
                name='products'
                onChange={handleProductImages}
              />
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      {page.loading ? (
        <>
          <p>Creating page...</p>
        </>
      ) : (
        <>
          {' '}
          {renderCreatePageModal()}
          <button onClick={() => setCreateModal(true)}>Create Page</button>
        </>
      )}
    </Layout>
  );
};

export default NewPage;
