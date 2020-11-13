import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  getAllCategories,
  updateCategories,
  deleteCategories as deletCategoriesAction,
} from '../../actions';
import Layout from '../../components/Layout';
import './style.css';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowDown,
  IoIosArrowForward,
} from 'react-icons/io';

function Category(props) {
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

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

    setAddCategoryModal(false);
  };
  const handleShow = () => setAddCategoryModal(true);

  const renderCategories = (categories) => {
    console.log('render categories');
    let _categories = [];
    for (let category of categories) {
      _categories.push({
        label: category.name,
        value: category._id,
        children:
          category?.children?.length > 0 && // added ?
          renderCategories(category.children),
      });
    }
    return _categories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children?.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
    const categories = createCategoryList(category.categories);

    const checkedArray = [];
    const expandedArray = [];

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find((c, index) => categoryId === c.value);
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find((c, index) => categoryId === c.value);
        category && expandedArray.push(category);
      });

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoriesInput = (key, value, index, type) => {
    if (type === 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item,
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item,
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
      form.append('type', item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append('_id', item.value);
      form.append('name', item.name);
      form.append('parentId', item.parentId ? item.parentId : '');
      form.append('type', item.type);
    });

    dispatch(updateCategories(form)).then((result) => {
      if (result) {
        dispatch(getAllCategories());
      }
    });
    setUpdateCategoryModal(false);
  };

  const renderUpdateCategoriesModal = () => {
    console.log('updateCategoriesModal');
    return (
      <Modal
        show={updateCategoryModal}
        handleClose={updateCategoriesForm}
        modalTitle={'Update Categories'}
        size='lg'
        saveChangesBtn={true}>
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>

        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`Category Name`}
                  onChange={(e) =>
                    handleCategoriesInput(
                      'name',
                      e.target.value,
                      index,
                      'expanded',
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className='form-control'
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoriesInput(
                      'parentId',
                      e.target.value,
                      index,
                      'expanded',
                    )
                  }>
                  <option>Select Category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className='form-control'>
                  <option value=''>Select Type</option>
                  <option value='store'>Store</option>
                  <option value='product'>Product</option>
                  <option value='page'>Page</option>
                </select>
              </Col>
            </Row>
          ))}

        <h6>Checked Array</h6>

        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`Category Name`}
                  onChange={(e) =>
                    handleCategoriesInput(
                      'name',
                      e.target.value,
                      index,
                      'checked',
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className='form-control'
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoriesInput(
                      'parentId',
                      e.target.value,
                      index,
                      'checked',
                    )
                  }>
                  <option>Select Category</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className='form-control'>
                  <option value=''>Select Type</option>
                  <option value='store'>Store</option>
                  <option value='product'>Product</option>
                  <option value='page'>Page</option>
                </select>
              </Col>
            </Row>
          ))}

        {/* <input
          type='file'
          name='categoryImage'
          onChange={handleCategoryImage}
        /> */}
      </Modal>
    );
  };

  const renderAddCategoryModal = () => {
    console.log('add category modal');
    return (
      <Modal
        show={addCategoryModal}
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
    );
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);
    dispatch(deletCategoriesAction(idsArray)).then((result) => {
      if (result) {
        dispatch(getAllCategories());
        setDeleteCategoryModal(false);
      }
    });
  };

  const renderDeleteCategoryModal = () => {
    console.log('delete category modal');
    return (
      <Modal
        modalTitle='Confirm'
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: 'No',
            color: 'primary',
            onClick: () => {
              alert('no');
            },
          },
          {
            label: 'Yes',
            color: 'danger',
            onClick: deleteCategories,
          },
        ]}>
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
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
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}></CheckboxTree>
          </Col>
        </Row>
        <Row>
          <Col>
            <button onClick={deleteCategory}>Delete</button>
            <button onClick={updateCategory}>Edit</button>
          </Col>
        </Row>
      </Container>

      {addCategoryModal && renderAddCategoryModal()}
      {updateCategoryModal && renderUpdateCategoriesModal()}
      {deleteCategoryModal && renderDeleteCategoryModal()}
    </Layout>
  );
}

export default Category;
