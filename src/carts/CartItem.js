import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";

export default function CartItem() {
  let cnt = 0;

  let formData = new FormData()
  formData.append("cart", 2)
  formData.append("item", 3)
  formData.append("quantity", 50);
  formData.append("line_item_total", 200);

  // axiosInstance.post(`carts/details`, formData)
  return (
    <div>
      <div className="">CartItem</div>
    </div>
  );
}
