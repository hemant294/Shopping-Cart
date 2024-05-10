import React from "react";
import { Container, FormControl, Navbar, Nav, Dropdown, Badge, Button } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import {  NavLink } from "react-router-dom";
import { CartState } from "../Context/Context";
import { MdDelete } from "react-icons/md";
import "./Header.css";
const Header = () => {

  const {state: {cart}, dispatch, productDispatch} = CartState();
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <NavLink to="/">Shopping Cart</NavLink>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a product"
            className="m-auto"
            onChange={(e) => 
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              })
            }
          />
        </Navbar.Text> 
        <Nav>
          <Dropdown align="end
          ">
            <Dropdown.Toggle variant="success" position="relative">
              <FaShoppingCart color="white" fontSize="25px"/>
              <Badge bg="none">{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{minWidth: 370, marginTop: 20}}>
              {
                cart.length > 0 ? (
                  <>
                    {
                      cart.map(prod => (
                        <span className="cartitem" key={prod.id}>
                          <img 
                            src={prod.image}
                            className="cartItemImg"
                            alt={prod.name}
                          />
                          <div className="cartItemDetail">
                            <span>{prod.name}</span>
                            <span>₹ {prod.price.split(".")[0]}</span>
                          </div>
                          <MdDelete 
                            fontSize="20px"
                            style={{cursor: "pointer"}}
                            onClick={() => 
                              dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: prod,
                            })}
                          />
                        </span>
                      ))
                    }
                    <NavLink to="/cart"> 
                      <Button style={{width: "95%", margin: "0 10px"}}>Go To Cart</Button>
                    </NavLink>
                  </>
                ) : 
                (<span style={{padding: 10,  }}>Cart is Empty!</span>)
              }
              
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
