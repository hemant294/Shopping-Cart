import React from "react";
import "./SingleProduct.css";
import { Card, Button } from "react-bootstrap";
import { CartState } from "../Context/Context";
import Rating from "./Rating";

const SingleProductComp = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <Card className="products">
      <Card.Img variant="top" src={prod.image} alt={prod.name} className="images" />
      <Card.Body>
        <Card.Title>{prod.name}</Card.Title>
        <Card.Subtitle>
          <span>₹ {prod.price.split(".")[0]}</span>
          {prod.fastDelivery ? <div>Fast fastDelivery</div> : <div>4 day delivery</div>}
          <Rating rating={prod.ratings} />
        </Card.Subtitle>
        {cart.some((p) => p.id === prod.id) ? (
          <Button
            onClick={() => {
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: prod,
              });
            }}
            variant="danger"
          >
            Remove from cart
          </Button>
        ) : (
          <Button
            onClick={() => {
              dispatch({
                type: "Add_To_CART",
                payload: prod,
              });
            }}
            variant="primary"
            disabled={!prod.isStock}
          >
            {!prod.isStock ? "Out of Stock" : "Add to cart"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};


export default SingleProductComp;
