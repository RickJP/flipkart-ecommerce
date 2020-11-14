import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';

export const UpdateCategoriesModal = (props) => {
  const {
    size,
    show,
    handleClose,
    modalTitle,
    expandedArray,
    checkedArray,
    handleCategoriesInput,
    categoryList,
    onSubmit,
    saveChangesBtn,
    itemsSelected,
  } = props;

  return (
    <Modal
      show={show}
      itemsSelected={itemsSelected}
      handleClose={handleClose}
      modalTitle={modalTitle}
      size={size}
      onSubmit={onSubmit}
      saveChangesBtn={saveChangesBtn}>
      {expandedArray.length > 0 && (
          <Row>
            <Col>
              <h6>Expanded</h6>
            </Col>
          </Row>
        ) &&
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
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className='form-control'
                value={item.type}
                onChange={(e) =>
                  handleCategoriesInput(
                    'type',
                    e.target.value,
                    index,
                    'expanded',
                  )
                }>
                <option value=''>Select Type</option>
                <option value='store'>Store</option>
                <option value='product'>Product</option>
                <option value='page'>Page</option>
              </select>
            </Col>
          </Row>
        ))}

      {checkedArray.length > 0 && <h6>Checked Array</h6> &&
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
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className='form-control'
                value={item.type}
                onChange={(e) =>
                  handleCategoriesInput(
                    'type',
                    e.target.value,
                    index,
                    'checked',
                  )
                }>
                <option value=''>Select Type</option>
                <option value='store'>Store</option>
                <option value='product'>Product</option>
                <option value='page'>Page</option>
              </select>
            </Col>
          </Row>
        ))}
      {!itemsSelected && (
        <h6 style={{ color: 'red' }}>
          Nothing to edit. Please select an item.
        </h6>
      )}
    </Modal>
  );
};
