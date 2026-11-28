import { useNavigate } from "react-router-dom";
import useCartData from "./useCartData";
import useCartActions from "./useCartActions";
import notify from "../useNotifaction";

const useCartPage = () => {
  const { cart, isLoading } = useCartData();
  const { updateQty, removeItem, clearCart } = useCartActions();
  const navigate = useNavigate();
  const cartItems = cart?.cartItems?.filter((item) => item?.service) || [];

  const handleCheckout = () => {
    if (cartItems.length >= 1) {
      navigate("/checkout");
    } else {
      notify("من فضلك أضف خدمات إلى السلة", "warn");
    }
  };

  return {
    cart,
    isLoading,
    cartItems,
    updateQty,
    removeItem,
    clearCart,
    handleCheckout,
  };
};

export default useCartPage;
