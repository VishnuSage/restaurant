import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { searchRestaurant } from "../redux/restaurantSlice";

function Header() {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar variant="dark mt-3">
        <Container>
          <Link to="/" style={{ textDecoration: "none", overflow: "hidden" }}>
            <div className="d-flex justify-content-between align-items-center">
              <Navbar.Brand href="#home">
                <img
                  alt=""
                  src="https://cdn-icons-png.freepik.com/256/6643/6643359.png?semt=ais_hybrid"
                  width="30"
                  height="30"
                  className="d-inline-block align-top me-3"
                />{" "}
                FOOD <span className="text-warning">CIRCLE</span>
              </Navbar.Brand>
              <input
                onChange={(e) => dispatch(searchRestaurant(e.target.value))}
                type="text"
                className="form-control ms-5 w-100"
                placeholder="Search by Neighbourhood"
              />
            </div>
          </Link>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
