import { Col, Row } from 'react-bootstrap';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';

export const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    categoryName,
    setCategoryName,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
    onSubmit,
    itemsSelected,
  } = props;

  return (
    <Modal
      show={show}
      itemsSelected={itemsSelected}
      handleClose={handleClose}
      modalTitle={modalTitle}
      onSubmit={onSubmit}>
      <Row>
        <Col>
          <Input
            value={categoryName}
            placeholder={`Category Name`}
            onChange={(e) => setCategoryName(e.target.value)}
            className='form-control-sm'
          />
        </Col>
        <Col>
          <select
            className='form-control-sm'
            onChange={(e) => setParentCategoryId(e.target.value)}>
            <option>Select Category</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type='file'
            name='categoryImage'
            onChange={handleCategoryImage}
            className='form-control-md'
          />
        </Col>
      </Row>
    </Modal>
  );
};
