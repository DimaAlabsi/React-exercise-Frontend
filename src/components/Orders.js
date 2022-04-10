import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  // Card,
  // Col,
  // Container,
  Modal,
  // Row,
  Button,
  Form,
} from "react-bootstrap";
export class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      showmodal: false,
      id: 0,
      deliveryDate: "",
      date: "",
      customerId: 0,
      orderNo: 0,
    };
  }
  omponentDidMount = () => {
    this.handelCall();
  };
  handelCall = () => {
    console.log("call");
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/order`).then((res) => {
      this.setState({
        orders: res.data,
      });
    });
  };
  addHandle = (e) => {
    e.preventDefault();
    let config = {
      method: "POST",
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: "/order",
      data: {
        customerId: this.state.customerId,
        orderNo: this.state.orderNo,
        deliveryDate: this.state.deliveryDate,
        date: this.state.date,
      },
    };
    axios(config).then((res) => {
      console.log(res.data);
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/order`).then((res) => {
        this.setState({
          orders: res.data,
        });
      });
    });
  };
  handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/order/${id}`);
    this.handelCall();
  };

  // --------------------------------------------------
  handleClose = () => {
    this.setState({
      showmodal: false,
    });
  };
  handleItem = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleUpdate = (id, orderNo, customerId, date, deliveryDate) => {
    this.setState({
      id: id,
      orderNo: orderNo,
      customerId: customerId,
      date: date,
      deliveryDate: deliveryDate,

      showmodal: true,
    });
  };
  handlesubmit = async (e) => {
    e.preventDefault();
    let list = {
      orderNo: this.state.orderNo,
      customerId: this.state.customerId,
      date: this.state.date,
      deliveryDate: this.state.deliveryDate,
    };
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/order/${this.state.id}`,
      list
    );
    this.setState({
      showmodal: false,
    });
    this.handelCall();
  };
  render() {
    return (
      <div>
        <h1>Orders</h1>
        <section class="intro">
          <div class="mask d-flex align-items-center h-100">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div class="cardcust">
                    <div class="card-body p-5 text-center">
                      <Button onClick={this.addHandle}>show orders</Button>
                      <form onSubmit={this.addHandle} class="my-md-5 pb-5">
                        <h1 class="fw-bold mb-0">Add New Order</h1>

                        <i class="fas fa-user-astronaut fa-3x my-5"></i>
                        <div class="form-outline mb-3">
                          <input
                            type="date"
                            name="date"
                            placeholder="date"
                            onChange={this.handleItem}
                            class="form-control form-control-lg"
                          />
                        </div>

                        <div class="form-outline mb-3">
                          <input
                            type="date"
                            name="deliveryDate"
                            placeholder="deliveryDate"
                            onChange={this.handleItem}
                            class="form-control form-control-lg"
                          />
                        </div>

                        <div class="form-outline mb-3">
                          <input
                            type="number"
                            placeholder="customerId"
                            name="customerId"
                            onChange={this.handleItem}
                            class="form-control form-control-lg"
                          />
                        </div>

                        <div class="form-outline mb-3">
                          <input
                            type="number"
                            placeholder="orderNo"
                            name="orderNo"
                            onChange={this.handleItem}
                            class="form-control form-control-lg"
                          />
                        </div>

                        <button
                          class="btn btn-primary btn-lg btn-rounded gradient-custom text-body px-5"
                          type="submit"
                        >
                          Add a new Order
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="container">
          {this.state.orders.map((i) => {
            return (
              <table>
                <thead>
                  <tr>
                    <th>orderNo</th>

                    <th>CustomerId</th>

                    <th>date</th>

                    <th>Delivey Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i.orderNo} </td>
                    <td>{i.customerId}</td>
                    <td>{i.date}</td>
                    <td>{i.deliveryDate}</td>
                    <td>
                      <button
                        onClick={() => {
                          this.handleUpdate(
                            i.orderNo,
                            i.customerId,
                            i.date,
                            i.deliveryDate
                          );
                        }}
                        class="btn mr-2"
                      >
                        <i class="fas fa-link"> Update</i>
                      </button>
                    </td>
                    <td>
                      {" "}
                      <button
                        onClick={() => this.handleDelete(i.id)}
                        class="btn "
                      >
                        <i class="fab fa-github"> Delete</i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            );
          })}
          ;
          <Modal show={this.state.showmodal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> Update Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handlesubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>customerID{this.state.customerId}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>orderNo</Form.Label>
                  <Form.Control
                    type="number"
                    value={this.state.orderNo}
                    name="orderNo"
                    onChange={this.handleItem}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>customerID</Form.Label>
                  <Form.Control
                    type="number"
                    value={this.state.customerId}
                    name="customerId"
                    onChange={this.handleItem}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>date</Form.Label>
                  <Form.Control
                    type="date"
                    value={this.state.deliveryDate}
                    name="deliveryDate"
                    onChange={this.handleItem}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={this.state.deliveryDate}
                    name="deliveryDate"
                    onChange={this.handleItem}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Orders;
