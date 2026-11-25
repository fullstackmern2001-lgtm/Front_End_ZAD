export const getPaymentMethodLabel = (paymentMethodType) => {
  switch (paymentMethodType) {
    case "paypal":
      return "🌐 PayPal";
    case "palpay":
      return "📱 محفظة بال بي (PalPay)";
    case "card":
      return "💳 بطاقة بنكية (Visa / Card)";
    default:
      return "وسيلة دفع غير موثقة";
  }
};
