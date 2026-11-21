import React from "react";
import { Form } from "react-bootstrap";

const PaymentOptions = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="mb-4">
      <h6 className="fw-semibold mb-3">طرق الدفع</h6>
      <Form.Check
        type="radio"
        label="الدفع باستخدام الفيزا"
        name="payment"
        value="credit"
        checked={paymentMethod === "credit"}
        onChange={() => setPaymentMethod("credit")}
      />
    </div>
  );
};

export default React.memo(PaymentOptions);
