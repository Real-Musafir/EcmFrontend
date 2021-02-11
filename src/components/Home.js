import React from "react";
import Cart from "../carts/Cart";
import List from "../products/List";

const Home = () => {
  const st = localStorage.getItem("access_token");
    console.log(st, "This is token");
  return <div>
    <List />
    {/* <Cart /> */}
</div>
};
export default Home;
