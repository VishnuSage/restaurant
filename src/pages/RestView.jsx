import React from "react";
import { Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Collapse from "react-bootstrap/Collapse";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function RestView() {
  const { id } = useParams();
  console.log("Parameter Data");
  console.log(id);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = useState(false);
  const allRestaurant = useSelector(
    (state) => state.restaurantSlice.allRestaurant.restaurants
  );
  console.log("all Restaurant");
  console.log(allRestaurant);
  const selectedRestaurant = allRestaurant.find((item) => item.id == id);
  console.log(selectedRestaurant);

  return (
    <>
      <Row className="mt-5 mb-5">
        <Col md={1}></Col>
        <Col md={3}>
          <img
            src={selectedRestaurant?.photograph}
            width="100%"
            height="365px"
            alt=""
            className="rounded"
          />
        </Col>
        <Col md={7} className="px-5">
          <hr />
          <h5 className="text-center">
            Restaurant <span className="text-warning">Details</span>
          </h5>
          <hr />
          <ListGroup>
            <ListGroup.Item>
              <h5 className="text-center p-2">{selectedRestaurant.name}</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              Neighbourhood: {selectedRestaurant.neighborhood}
            </ListGroup.Item>
            <ListGroup.Item>
              Address: {selectedRestaurant.address}
            </ListGroup.Item>
            <ListGroup.Item>
              Cuisine Type: {selectedRestaurant.cuisine_type}
            </ListGroup.Item>
            <ListGroup.Item className="text-center p-3 mb-2">
              <button className="btn btn-warning" onClick={handleShow}>
                Operating Hours
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Operating Hours</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ListGroup>
                    <ListGroup.Item>
                      Monday: {selectedRestaurant.operating_hours.Monday}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Tuesday: {selectedRestaurant.operating_hours.Tuesday}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Wednesday: {selectedRestaurant.operating_hours.Wednesday}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Thursday: {selectedRestaurant.operating_hours.Thursday}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Friday: {selectedRestaurant.operating_hours.Friday}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Saturday: {selectedRestaurant.operating_hours.Saturday}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Sunday: {selectedRestaurant.operating_hours.Sunday}
                    </ListGroup.Item>
                  </ListGroup>
                </Modal.Body>
              </Modal>
              <button
                className="btn btn-warning ms-3"
                onClick={() => setOpen(!open)}
              >
                Click Here to see Reviews
              </button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}></Col>
        <Col md={7}>
          <Collapse in={open}>
            <div>
              {selectedRestaurant.reviews?.length > 0 ? (
                selectedRestaurant.reviews.map((item, index) => (
                  <div key={index}>
                    <hr />
                    <div className="mt-2">
                      <h6>
                        Name and Date: {item.name} - {item.date}
                      </h6>
                      <p>Rating: {item.rating}</p>
                      <p>Description: {item.comments}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews found</p>
              )}
            </div>
          </Collapse>
        </Col>
      </Row>
    </>
  );
}

export default RestView;
