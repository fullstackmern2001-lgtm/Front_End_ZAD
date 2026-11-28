import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notify from "../useNotifaction";
import { toggleWishlist } from "../../store/features/wishlist/wishlistThunk";
import { addServiceToCart } from "../../store/features/cart/cartThunk";

const useAddServiceToCart = (service) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { isAuth } = useSelector((state) => state.auth);
  const { isLoading: isCartLoading } = useSelector((state) => state.cart);

  const minQuantity = Math.max(1, Math.ceil(Number(service?.minQuantity) || 1));
  const price = Number(service?.price ?? 0);
  const [quantity, setQuantity] = useState(minQuantity);
  const [isQuantityPromptOpen, setIsQuantityPromptOpen] = useState(false);

  useEffect(() => {
    setQuantity(minQuantity);
  }, [service?._id, minQuantity]);

  const isFav = wishlist.some((item) => item?._id === service?._id);
  const donationTotal = price * Number(quantity || 0);

  const handleQuantityChange = (event) => {
    const nextQuantity = event.target.value;
    setQuantity(nextQuantity === "" ? "" : Number(nextQuantity));
  };

  const handleToggleWishlist = () => {
    if (!isAuth) {
      notify("الرجاء تسجيل الدخول اولا", "error");
      return;
    }
    notify(
      isFav ? "تم ازالتها من المفضله" : "تم اضافه للمفضله",
      isFav ? "error" : "success",
    );
    dispatch(toggleWishlist(service?._id));
  };

  const handleAddToCart = async () => {
    if (!isAuth) {
      notify("الرجاء تسجيل الدخول اولا", "error");
      return;
    }
    if (!isQuantityPromptOpen) {
      setQuantity(minQuantity);
      setIsQuantityPromptOpen(true);
      return;
    }
    const requestedQuantity = Number(quantity);
    if (!Number.isInteger(requestedQuantity) || requestedQuantity < minQuantity) {
      notify(`الحد الأدنى للتبرع لهذه الخدمة هو ${minQuantity}`, "warn");
      return;
    }

    try {
      await dispatch(
        addServiceToCart({
          serviceId: service._id,
          quantity: requestedQuantity,
        }),
      ).unwrap();
      setIsQuantityPromptOpen(false);
      notify("تمت إضافة الخدمة إلى السلة", "success");
    } catch (requestError) {
      notify(requestError || "تعذر إضافة الخدمة إلى السلة", "error");
    }
  };

  const cancelAddToCart = () => {
    setIsQuantityPromptOpen(false);
    setQuantity(minQuantity);
  };

  return {
    handleAddToCart,
    handleToggleWishlist,
    quantity,
    setQuantity,
    minQuantity,
    isCartLoading,
    isQuantityPromptOpen,
    cancelAddToCart,
    isFav,
    price,
    donationTotal,
    handleQuantityChange,
  };
};

export default useAddServiceToCart;
