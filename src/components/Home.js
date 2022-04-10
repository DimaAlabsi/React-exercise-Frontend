import React, { Component } from "react";

import {
  // Card,
  // Col,
  // Container,
  Modal,
  // Row,
  Button,
  Form,
} from "react-bootstrap";
class Home extends Component {
  render() {
    return (
      <>
        <h1>Items Page</h1>
        <div>
          <section class="intro">
            <div class="mask d-flex align-items-center h-100">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="cardcust">
                      <div class="card-body p-5 text-center">
                        <form
                          onSubmit={this.props.addHandle}
                          class="my-md-5 pb-5"
                        >
                          <h1 class="fw-bold mb-0">Add Item</h1>

                          <i class="fas fa-user-astronaut fa-3x my-5"></i>

                          <div class="form-outline mb-3">
                            <input
                              type="number"
                              name="quantity"
                              placeholder="quantity"
                              onChange={this.props.quantityHandle}
                              class="form-control form-control-lg"
                            />
                          </div>

                          <div class="form-outline mb-3">
                            <input
                              type="number"
                              placeholder="price"
                              name="price"
                              onChange={this.props.priceHandle}
                              class="form-control form-control-lg"
                            />
                          </div>

                          <div class="form-outline mb-3">
                            <input
                              type="number"
                              placeholder="itemCode"
                              name="itemCode"
                              onChange={this.props.itemCodeHandle}
                              class="form-control form-control-lg"
                            />
                          </div>

                          <button
                            class="btn btn-primary btn-lg btn-rounded gradient-custom text-body px-5"
                            type="submit"
                          >
                            Add a new Item
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="container mx-auto mt-4">
          <div class="row">
            {this.props.items.map((i) => {
              return (
                <div class="col-md-4">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title"> Item Code : {i.itemCode}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">
                        Quantity :{i.quantity}
                      </h6>
                      <p class="card-text"> Price : {i.price}</p>
                      <button
                        onClick={() => {
                          this.props.handleUpdate(
                            i.id,
                            i.itemCode,
                            i.quantity,
                            i.price
                          );
                        }}
                        class="btn mr-2"
                      >
                        <i class="fas fa-link"> Update</i>
                      </button>
                      <button
                        onClick={() => this.props.handleDelete(i.id)}
                        class="btn "
                      >
                        <i class="fab fa-github"> Delete</i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Modal show={this.props.showmodal} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Update Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.props.handlesubmit}>
              <Form.Group className="mb-3">
                <Form.Label>itemCode</Form.Label>
                <Form.Control
                  type="number"
                  value={this.props.itemCode}
                  name="itemCode"
                  onChange={this.props.itemCodeHandle}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={this.props.quantity}
                  name="quantity"
                  onChange={this.props.quantityHandle}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>price</Form.Label>
                <Form.Control
                  type="number"
                  value={this.props.price}
                  name="price"
                  onChange={this.props.priceHandle}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Home;
