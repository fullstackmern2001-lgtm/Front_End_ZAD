import test from "node:test";
import assert from "node:assert/strict";
import { getPaymentMethodLabel } from "../src/utils/paymentMethodLabel.js";

test("labels each supported payment method distinctly", () => {
  assert.equal(getPaymentMethodLabel("card"), "💳 بطاقة بنكية (Visa / Card)");
  assert.equal(getPaymentMethodLabel("paypal"), "🌐 PayPal");
  assert.equal(
    getPaymentMethodLabel("palpay"),
    "📱 محفظة بال بي (PalPay)",
  );
});

test("does not mislabel unknown or legacy payment methods as a card", () => {
  assert.equal(getPaymentMethodLabel("legacy"), "وسيلة دفع غير موثقة");
  assert.equal(getPaymentMethodLabel(undefined), "وسيلة دفع غير موثقة");
});
