import React from "react";
import useCartPage from "../../hook/cart/useCartPage";
import CartItems from "../../components/cart/CartItems";
import CartSummary from "../../components/cart/CartSummary";
import { CartSkeleton } from "../../components/utils/ContentSkeletons";

const CartPage = () => {
  const {
    cart,
    isLoading,
    cartItems,
    updateQty,
    removeItem,
    clearCart,
    handleCheckout,
  } = useCartPage();

  return (
    <div className="container !py-5 !mt-[70px]">
      <h2 className="mb-4 text-center md:text-left">سلة الخدمات</h2>

      {isLoading ? (
        <CartSkeleton />
      ) : cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <div className="row flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="col-lg-8 col-12">
            <CartItems
              items={cartItems}
              updateQty={updateQty}
              removeItem={removeItem}
            />
          </div>

          {/* Cart Summary */}
          <div className="col-lg-4 col-12">
            <CartSummary
              cart={cart}
              isLoading={isLoading}
              onCheckout={handleCheckout}
              onClearCart={clearCart}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(CartPage);
