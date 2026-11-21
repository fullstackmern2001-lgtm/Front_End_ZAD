import { Table, Form, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import React from "react";
import useCartItems from "../../hook/cart/useCartItems";
const CartItems = ({ items, updateQty, removeItem }) => {
  const {
    validItems,
    getMinimumQuantity,
    getDisplayedQuantity,
    handleQuantityChange,
    handleQuantityBlur,
    handleRemove,
  } = useCartItems(items, updateQty, removeItem);

  if (validItems.length === 0)
    return <p className="text-center text-muted">Your cart is empty.</p>;

  return (
    <Table responsive bordered hover className="align-middle text-center">
      <thead className="table-light">
        <tr>
          <th>الصورة</th>
          <th>الاسم</th>
          <th>السعر</th>
          <th>العدد</th>
          <th>السعر الاجمالي</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {validItems.map((item) => {
          const minQuantity = getMinimumQuantity(item);
          const displayedQuantity = getDisplayedQuantity(item);
          return (
            <tr key={item._id}>
              <td className="d-flex align-items-center gap-3">
                <img
                  src={item.service.image}
                  alt={item.service.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg"
                />
              </td>
              <td className="!text-[14px]">{item.service.name}</td>
              <td>${Number(item.price).toFixed(2)}</td>
              <td className="max-w-[80px]">
                <Form.Control
                  type="number"
                  min={minQuantity}
                  step="1"
                  value={displayedQuantity}
                  onChange={(event) => handleQuantityChange(item._id, event)}
                  onBlur={() =>
                    handleQuantityBlur(item, displayedQuantity, minQuantity)
                  }
                  aria-label={`كمية ${item.service.name}`}
                />
                <small className="text-muted">
                  أقل كمية: {minQuantity}
                </small>
              </td>
              <td>
                ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemove(item._id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default React.memo(CartItems);
