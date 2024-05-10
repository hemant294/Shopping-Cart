import React from "react";
import { CartState } from "../Context/Context";
import SingleProductComp from "./SingleProductComp";
import "./Home.css";
import Filters from "./Filters";

const Home = () => {
  const {
    state: { products },
    productState: { byFastDelivery, byRating, byStock, searchQuery, sort },
  } = CartState();
  console.log("products", products);

  const tranformProduct = () => {
    let sortedProduct = products;

    if (sort) {
      sortedProduct = sortedProduct.sort((a, b) => 
        sort === "lowtohigh" ? a.price - b.price : b.price - a.price
      )
    }

    if(byStock){
      sortedProduct = sortedProduct.filter((prod) => prod.isStock);
    }

    if(byFastDelivery){
      sortedProduct = sortedProduct.filter((prod) => prod.fastDelivery)
    }

    if (byRating) {
      sortedProduct = sortedProduct.filter((prod) => prod.ratings >= byRating)
    }

    if(searchQuery){
      sortedProduct = sortedProduct.filter((prod) => prod.name.toLowerCase().includes(searchQuery))
    }

    
    return sortedProduct;

  };

  return (
    <div className="Home">
      <Filters />
      <div className="productContainer">
        {tranformProduct().map((prod) => {
          return <SingleProductComp prod={prod} />;
        })}
      </div>
    </div>
  );
};

export default Home;
