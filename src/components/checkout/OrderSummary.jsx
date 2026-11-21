import React from "react";
import { Button } from "react-bootstrap";
import LoadingSection from "../../components/utils/LoadingSection";

const OrderSummary = ({
  subtotal,
  loading,
  onProceed,
}) => {
  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <h5 className="fw-bold mb-3">ملخص الطلب</h5>

      <div className="flex justify-between mb-2">
        <span>السعر الفرعي</span>
        <span>${subtotal?.toFixed(2) || 0}</span>
      </div>

      <div className="flex justify-between fw-bold mb-4">
        <span>الإجمالي</span>
        <span>${subtotal?.toFixed(2) || 0}</span>
      </div>

      <Button
        variant="dark"
        className="w-full py-2"
        onClick={onProceed}
        disabled={loading}
      >
        {loading ? <LoadingSection /> : "اضغط للدفع"}
      </Button>
    </div>
  );
};

export default React.memo(OrderSummary);
