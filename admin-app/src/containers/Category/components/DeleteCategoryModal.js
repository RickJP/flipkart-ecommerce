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
    itemsSelected,
  } = props;

  return (
    <Modal
      modalTitle={modalTitle}
      show={show}
      handleClose={() => setDeleteCategoryModal(false)}
      buttons={
        itemsSelected && [
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
        ]
      }>
      {itemsSelected ? (
        <>
          {expandedArray.length > 0 && <h5>Expanded</h5>}
          {expandedArray.map((item, index) => (
            <span key={index}>{item.name}</span>
          ))}
          {checkedArray.length > 0 && <h5>Checked</h5>}
          {checkedArray.map((item, index) => (
            <span key={index}>{item.name}</span>
          ))}
        </>
      ) : (
        <h6 style={{ color: 'red' }}>
          Nothing to delete. Please select an item.
        </h6>
      )}
    </Modal>
  );
};
