import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import { linearCategories } from '../../helpers/linearCategories';

const NewPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  const handleBannerImages = (e) => {
    console.log(e);
  };

  const handleProductImages = (e) => {
    console.log(e);
  };

  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={'Create New Page'}
        handleClose={() => setCreateModal(false)}>
        <Container>
          <Row>
            <Col>
              <select
                className='form-control form-control-sm'
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}>
                <option value=''>Select Category</option>
                {categories.map((c, i) => (
                  <option key={i} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
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
            <Col>
              <Input type='file' name='banners' onChange={handleBannerImages} />
            </Col>
          </Row>

          <Row>
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
      {renderCreatePageModal()}
      <button onClick={() => setCreateModal(true)}>Create Page</button>
    </Layout>
  );
};

export default NewPage;
