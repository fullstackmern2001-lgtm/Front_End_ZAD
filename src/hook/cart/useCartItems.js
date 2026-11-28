import { useMemo, useState } from "react";

const useCartItems = (items, updateQty, removeItem) => {
  const [quantityDrafts, setQuantityDrafts] = useState({});
  const validItems = useMemo(
    () => items?.filter((item) => item?.service) || [],
    [items],
  );

  const handleQuantityChange = (itemId, event) => {
    setQuantityDrafts((previous) => ({
      ...previous,
      [itemId]: event.target.value,
    }));
  };

  const handleQuantityBlur = (item, displayedQuantity, minQuantity) => {
    const requestedQuantity = Number(displayedQuantity);
    setQuantityDrafts((previous) => {
      const next = { ...previous };
      delete next[item._id];
      return next;
    });
    if (requestedQuantity !== item.quantity) {
      updateQty(item._id, requestedQuantity, minQuantity);
    }
  };

  const getMinimumQuantity = (item) =>
    Math.max(1, Math.ceil(Number(item.service.minQuantity) || 1));
  const getDisplayedQuantity = (item) =>
    quantityDrafts[item._id] ?? item.quantity;
  const handleRemove = (itemId) => removeItem(itemId);

  return {
    validItems,
    quantityDrafts,
    getMinimumQuantity,
    getDisplayedQuantity,
    handleQuantityChange,
    handleQuantityBlur,
    handleRemove,
  };
};

export default useCartItems;
