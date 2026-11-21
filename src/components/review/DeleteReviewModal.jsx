import React from "react";
import { Modal, Button } from "react-bootstrap";
import useDeleteReview from "../../hook/review/useDeleteReview";

const DeleteReviewModal = ({
  show,
  handleClose,
  reviewId,
  onReviewChange,
  onDeleted,
}) => {
  const { loading, handleConfirmDelete } = useDeleteReview(
    reviewId,
    handleClose,
    onReviewChange,
    onDeleted,
  );

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>تأكيد الحذف</Modal.Title>
      </Modal.Header>
      <Modal.Body>هل أنت متأكد من حذف هذا التعليق؟</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          إلغاء
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirmDelete}
          disabled={loading}
        >
          {loading ? "جارٍ الحذف..." : "حذف"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(DeleteReviewModal);
