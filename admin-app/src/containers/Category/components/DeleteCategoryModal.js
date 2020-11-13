import react from 'react';
import Input from '../../../components/UI/Input';
import Modal from '../../../components/UI/Modal';

export const DeleteCategoryModal = (props) => {
  const {
    show,
    modalTitle,
    handleClose,
    deleteCategories,
    setDeleteCategoryModal,
    expandedArray,
    checkedArray,
  } = props;

  return (
    <Modal
      modalTitle={modalTitle}
      show={show}
      handleClose={() => setDeleteCategoryModal(false)}
      buttons={[
        {
          label: 'No',
          color: 'primary',
          onClick: handleClose,
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
