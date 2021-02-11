import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";

export default function Cart() {

        axiosInstance.get("carts/order")
  return (
    <div>
      <div className="rightSection" id="card">
        Your Order Have Been Completed, We Will Contatce With You Soon
      </div>
    </div>
  );
}
