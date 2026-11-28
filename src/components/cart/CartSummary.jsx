import React from "react";
import { Button } from "react-bootstrap";
import LoadingSection from "../../components/utils/LoadingSection";

const CartSummary = ({
  cart,
  isLoading,
  onCheckout,
  onClearCart,
}) => {
  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h5 className="fw-bold mb-3">تفاصيل الكارت</h5>

      {/* Subtotal */}
      <div className="d-flex justify-content-between mb-2">
        <span>اجمالي السعر</span>
        <span>${cart?.totalCartPrice?.toFixed(2)}</span>
      </div>
      <Button
        variant="dark"
        className="w-100 py-2 mb-2"
        onClick={onCheckout}
        disabled={isLoading}
      >
        {isLoading ? <LoadingSection /> : "عمليه الدفع"}
      </Button>
      <Button variant="danger" className="w-100 py-2" onClick={onClearCart}>
        مسح السله
      </Button>
    </div>
  );
};

export default React.memo(CartSummary);
