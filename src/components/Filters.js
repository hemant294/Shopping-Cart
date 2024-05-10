import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Filters.css";
import Rating from "./Rating";
import { CartState } from "../Context/Context";
import { type } from "@testing-library/user-event/dist/type";
const Filters = () => {
  const {productState: {byFastDelivery, byRating, byStock, searchQuery, sort}, productDispatch} = CartState();
  console.log(byFastDelivery, byRating, byStock, searchQuery, sort);

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          type="radio"
          name="group1"
          label="Accending"
          id={`inline-1`}
          onChange={() => 
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowtohigh",
            })
          }
          onCheck={sort === "lowtohigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          type="radio"
          name="group1"
          label="Descending"
          id={`inline-2`}
          onChange={() => 
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "hightolow",
            })
          }
          onCheck={sort === "hightolow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          type="checkbox"
          name="group1"
          label="Inclue out of stock"
          id={`inline-3`}
          onChange={() => 
            productDispatch({
              type: "FILTER_BY_STOCK"
            })
          }
          onCheck = {byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          type="checkbox"
          name="group1"
          label="Fast Delievery only"
          id={`inline-4`}
          onChange={() => 
            productDispatch({
              type: "FILTER_BY_DELIVERY"
            })
          }
          onCheck = {byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          onClick={(i) => 
            productDispatch({
              type: "FILTER_BY_RATING",
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>
      <Button 
        variant="light"
        onClick={() => 
          productDispatch({
            type: "CLEAR_FILTER" ,
          })
        }
        >Clear Filter</Button>
    </div>
  );
};

export default Filters;
