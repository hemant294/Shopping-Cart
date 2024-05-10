import React, { useEffect, useState } from "react";
import { CartState } from "../Context/Context";
import { ListGroup, Button, Row, Col, Form, Image } from "react-bootstrap";
import "./cart.css";
import Rating from "./Rating";
import { MdDelete } from "react-icons/md";
import { type } from "@testing-library/user-event/dist/type";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState("");

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <div className="Home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>₹ {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control 
                  as="select" 
                  value={prod.qty}
                  onChange={(e) => {
                    dispatch({
                      type: "CHANGE_CART_QTY",
                      payload: {
                        id: prod.id,
                        qty: e.target.value
                      }
                    })
                  }}
                  >
                    {[...Array(prod.isStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col>
                  <Button
                    variant="light"
                    cursor="pointer"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <MdDelete style={{ fontSize: "30px" }} />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summry">
        <span className="title">Subtitle {cart.length} items</span>
        <span>Total: ₹ {total}</span>
        <Button>Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
