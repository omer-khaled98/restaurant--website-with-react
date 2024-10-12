import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { CartContext } from "../context/cartContext";

const Cards = ({ item }) => {
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { setCartLength } = useContext(CartContext); // Use the context

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = async () => {
    console.log(item);
    try {
      const token = localStorage.getItem("token");
      const cart = await axios.post(
        `https://restaurant-api-with-node-js.vercel.app//api/cart/${item._id}`,
        {
          quantity: 1,
        },
        {
          headers: { token },
        }
      );

      console.log(cart.data.cart.mealItems.length);
      setCartLength(cart.data.cart.mealItems.length); // Update the cart length in context

      Swal.fire({
        icon: "success",
        title: "Added to cart successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding to cart", error.message);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You must log in first!",
      });
    }
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5 overflow-hidden">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer " />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.imageUrl}
            alt="Shoes"
            className="hover:scale-105 transition-all duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <p>{item.description}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-green">$ </span> {item.price}
          </h5>
          <button className="btn bg-green text-white" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
