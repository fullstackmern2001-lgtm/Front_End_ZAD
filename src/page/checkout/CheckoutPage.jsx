import React from "react";
import useCheckout from "../../hook/checkOut/useCheckout";
import PaymentOptions from "../../components/checkout/PaymentOptions";
import OrderSummary from "../../components/checkout/OrderSummary";

const CheckoutPage = () => {
  const {
    loading,
    paymentMethod,
    setPaymentMethod,
    handleProceedPayment,
    subtotal,
  } = useCheckout();

  return (
    <div className="container !py-5 !mt-[70px]">
      <h2 className="mb-4 text-center md:text-left">طريق الدفع</h2>
      <div className="row flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="col-lg-7 col-12 flex flex-col gap-4">
          <div className="p-4 border rounded shadow-sm bg-white">
            <h5 className="fw-bold mb-3">تفاصيل الدفع</h5>
            <div className="d-flex justify-content-between fw-bold mb-4">
              <span>إجمالي السعر</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <PaymentOptions
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="col-lg-5 col-12">
          <OrderSummary
            subtotal={subtotal}
            loading={loading}
            onProceed={handleProceedPayment}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CheckoutPage);
