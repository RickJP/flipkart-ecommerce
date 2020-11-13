import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  getAllCategories,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from '../../actions';
import Layout from '../../components/Layout';
import './style.css';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosAdd,
  IoIosTrash,
  IoIosCloudUpload,
} from 'react-icons/io';
import { UpdateCategoriesModal } from './components/UpdateCategoriesModal';
import { AddCategoryModal } from './components/AddCategoryModal';
import { DeleteCategoryModal } from './components/DeleteCategoryModal';

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

    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    // const expandedIdsArray = expandedArray.map((item, index) => ({
    //   _id: item.value,
    // }));
    // const idsArray = expandedIdsArray.concat(checkedIdsArray);

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategories());
          setDeleteCategoryModal(false);
        }
      });
    }
  };

  const closeDeleteModal = () => {
    setDeleteCategoryModal(false);
  };

  const categoryList = createCategoryList(category.categories);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className='__category-option'>
              <h2>CATEGORY</h2>
              <div className='action-btn-container'>
                <span>Actions:</span>
                <button className='btn' onClick={handleShow}>
                  <IoIosAdd /> Add
                </button>
                <button className='btn' onClick={deleteCategory}>
                  <IoIosTrash /> Delete
                </button>
                <button className='btn' onClick={updateCategory}>
                  <IoIosCloudUpload /> Edit
                </button>
              </div>
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
      </Container>

      {updateCategoryModal && (
        <UpdateCategoriesModal
          show={updateCategoryModal}
          handleClose={updateCategoriesForm}
          modalTitle={'Update Categories'}
          size='lg'
          saveChangesBtn={true}
          expandedArray={expandedArray}
          checkedArray={checkedArray}
          handleCategoriesInput={handleCategoriesInput}
          categoryList={categoryList}></UpdateCategoriesModal>
      )}

      {addCategoryModal && (
        <AddCategoryModal
          show={addCategoryModal}
          handleClose={handleClose}
          modalTitle={'Add New Category'}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          parentCategoryId={parentCategoryId}
          setParentCategoryId={setParentCategoryId}
          categoryList={categoryList}
          handleCategoryImage={handleCategoryImage}></AddCategoryModal>
      )}

      {deleteCategoryModal && (
        <DeleteCategoryModal
          show={deleteCategoryModal}
          handleClose={closeDeleteModal}
          deleteCategories={deleteCategories}
          setDeleteCategoryModal={setDeleteCategoryModal}
          expandedArray={expandedArray}
          checkedArray={checkedArray}></DeleteCategoryModal>
      )}
    </Layout>
  );
}

export default Category;
