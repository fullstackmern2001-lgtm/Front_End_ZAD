import React from "react";
import visaLogo from "../../assets/pay/visa.png";
import masterCardLogo from "../../assets/pay/master_card.png";
import paypalLogo from "../../assets/pay/paypal.png";

const PaymentOptions = ({ paymentMethod, setPaymentMethod }) => {
  return (
    <div className="mb-4">
      <h6 className="fw-semibold mb-3">طرق الدفع المتاحة</h6>

      <div className="space-y-3">
        {/* الدفع عبر الفيزا والبطاقات البنكية */}
        <label
          htmlFor="payment-card"
          className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${
            paymentMethod === "card"
              ? "border-green-600 bg-green-50/50 shadow-sm"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="payment-card"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
              className="w-4 h-4 text-green-600 focus:ring-green-500 cursor-pointer"
            />
            <div>
              <span className="font-medium text-gray-900 block text-sm md:text-base">
                الدفع بالبطاقة البنكية (فيزا / ماستركارد)
              </span>
              <span className="text-xs text-gray-500">
                دفع إلكتروني آمن ومشفر عبر بوابة Stripe
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={visaLogo}
              alt="Visa"
              className="h-6 w-auto object-contain"
            />
            <img
              src={masterCardLogo}
              alt="MasterCard"
              className="h-6 w-auto object-contain"
            />
          </div>
        </label>

        <label
          htmlFor="payment-paypal"
          className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${
            paymentMethod === "paypal"
              ? "border-green-600 bg-green-50/50 shadow-sm"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="payment-paypal"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
              className="w-4 h-4 text-green-600 focus:ring-green-500 cursor-pointer"
            />
            <div>
              <span className="font-medium text-gray-900 block text-sm md:text-base">
                الدفع الدولي عبر PayPal
              </span>
              <span className="text-xs text-gray-500">
                الدفع بالدولار الأمريكي عبر حساب PayPal
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <img
              src={paypalLogo}
              alt="PayPal"
              className="h-8 w-auto object-contain"
            />
          </div>
        </label>
      </div>
    </div>
  );
};

export default React.memo(PaymentOptions);
