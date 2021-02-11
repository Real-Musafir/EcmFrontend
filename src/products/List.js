import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useHistory } from "react-router-dom";
import CartItem from "../carts/CartItem";
import Cart from "../carts/Cart";
import { Link, NavLink } from "react-router-dom";
import Fade from 'react-reveal/Fade'

export default function List() {

   let u_id = "";
   const st = localStorage.getItem("access_token")
     ? localStorage.getItem("access_token")
     : null;
   if (st) {
     const jwt = require("jsonwebtoken");
     const token1 = st;
     const decode1 = jwt.decode(token1);
     u_id = decode1.user_id;
   }
   console.log(u_id, "This is user");

    const [appState, setAppState] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartState, setCartState] = useState([]);
    const [cartArry, setCartArry] = useState([]);
    const [amount, setAmount] = useState(0)
    const [show, setShow]=useState(false)
    useEffect(() => {
        axiosInstance.get("products/").then((res) => {
        const allProducts = res.data;
        console.log(allProducts, "All Products")
        setAppState(allProducts);
        });
    }, [setAppState]);


    const ShowCart = () => {
      useEffect(() => {
        if(u_id){
        axiosInstance.get("carts/").then((res) => {
          setCartArry(res.data);
          setCartItems(res.data)
          console.log(cartArry, "All Cart");
          
        });
        axiosInstance.get("carts/cart").then((res) => {
          const allProducts = res.data;
          allProducts.forEach((ct) => {
            setAmount(parseInt(ct.total));
          });
        });
      }
      }, [setCartArry]);
    };

    const showChek=()=>{
      console.log(show, "Show is here");
      if(show == false){
        setShow(true)      }
      else{
        setShow(false)
      }
    }

    const removeFromCart=(props)=>{
      let formData = new FormData();
      formData.append("item", props.item);
      formData.append("quantity", 0);
      axiosInstance.post(`carts/details`, formData);
      setCartItems([...cartItems.filter((x)=>x.item!=props.item)])
      setAmount(amount - parseInt(props.line_item_total));
      
      
    }

    const addCart=(props)=>{
       if(u_id){
         let formData = new FormData();
         formData.append("item", props.id);
         formData.append("quantity", 1);
         console.log(props, "This is the product");
         axiosInstance.post(`carts/details`, formData);
         let added = true;
         cartItems.forEach((itm) => {
           if (itm.item === props.id) {
             itm.quantity++;
             itm.line_item_total =
               parseInt(itm.line_item_total) + parseInt(props.price);
             itm.line_item_total = itm.line_item_total + ".00";
             setCartItems([...cartItems], cartItems);
             setAmount(amount + parseInt(props.price));
             console.log(itm.quantity, "The quentity");
             console.log(itm, "Already exist in list");
             added = false;
           }
         });
         if (added == true) {
           console.log("added this item");
           const object = {
             item: props.id,
             item_title: props.title,
             quantity: 1,
             line_item_total: props.price,
           };
           console.log(object, "This is new object");
           let ln = cartItems.length;
           cartItems[ln] = object;
           setCartItems([...cartItems], cartItems);
           setAmount(amount + parseInt(props.price));
           added = false;
         }
       }
      
    }


  return (
    <div>
      <Fade bottom cascade={true}>
        <div className="leftSection">
          {appState.map((product) => (
            <div className="card" key={product.id} tabIndex={-1}>
              <img src={product.image} style={{ width: "100%",  height:"250px" }} />
              <h5>{product.title}</h5>
              <p className="price">{product.price} Tk</p>
              <p>
                <button onClick={() => addCart(product)}>Add to Cart</button>
              </p>
            </div>
          ))}
        </div>
      </Fade>
      <div className="rigthSection">
        {ShowCart()}
        <Fade left cascade={true}>
          <div className="cartt">
            {u_id && (
              <div>
                <h5> You have {cartItems.length} Items in your cart </h5>
              </div>
            )}
            {cartItems.map((itm) => (
              <div className="cartText" key={itm.item} tabIndex={-1}>
                <div>
                  >{itm.item_title}--
                  {(itm.quantity < 10 ? "0" : "") + itm.quantity}p =={" "}
                  {itm.line_item_total} Tk
                  <button
                    className="ml-2 rmButton"
                    onClick={() => removeFromCart(itm)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Fade>

        {u_id ? (
          <div>
            {amount ? (
              <div>
                <div className="amount">
                  Total=={amount}.00 Tk
                  <button onClick={() => showChek()} className="proceedBtn">
                    Proceed
                  </button>
                </div>
                {show && (
                  <Fade right cascade={true}>
                    <div>
                      <form>
                        <label for="fname">Your Name:</label>
                        <input type="text" id="fname" name="fname" />
                        <br />
                        <label for="lname">Mobile Number:</label>
                        <input type="text" id="lname" name="lname" />
                        <br />
                        <div>
                          <NavLink className="orderButton" exact to="/carts">
                            CheckOut
                          </NavLink>
                        </div>
                      </form>
                    </div>
                  </Fade>
                )}
                {/* <div>
                  <NavLink className="orderButton" exact to="/carts">
                    CheckOut
                  </NavLink>
                </div> */}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <h5>You Must Be Login First To add Item in your cart</h5>
        )}
      </div>
    </div>
  );
}
