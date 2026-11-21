import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../store/features/wishlist/wishlistThunk";
import notify from "../useNotifaction";

const useFavoriteCard = (service) => {
  const dispatch = useDispatch();
  const { wishlist, error } = useSelector((state) => state.wishlist);
  const isFav = wishlist.some((item) => item._id === service._id);
  const priceValue = Number(service?.price ?? 0);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleToggle = () => {
    try {
      if (error === "You are not login , please login first") {
        notify("الرجاء تسجيل الدخول اولا ", "error");
        return;
      }

      dispatch(toggleWishlist(service._id));
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 300);
      isFav
        ? notify("تم حذف الخدمة من المفضلة", "error")
        : notify("تمت إضافة الخدمة إلى المفضلة", "success");
    } catch (requestError) {
      notify(requestError, "error");
    }
  };

  return { isFav, priceValue, isBouncing, handleToggle };
};

export default useFavoriteCard;
