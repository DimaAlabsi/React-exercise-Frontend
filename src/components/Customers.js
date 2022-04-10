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
export class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      id: 0,
      customers: [],
      showmodal: false,
    };
  }
  componentDidMount = () => {
    this.handelCall();
  };
  handelCall = () => {
    console.log("call");
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer`).then((res) => {
      this.setState({
        customers: res.data,
      });
    });
  };
  addHandle = (e) => {
    e.preventDefault();
    let config = {
      method: "POST",
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: "/customer",
      data: {
        name: this.state.name,
      },
    };
    axios(config).then((res) => {
      console.log(res.data);
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/customer`).then((res) => {
        this.setState({
          customers: res.data,
        });
      });
    });
  };
  handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/customer/${id}`);
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
  handleUpdate = (id, name) => {
    this.setState({
      id: id,
      name: name,
      showmodal: true,
    });
  };
  handlesubmit = async (e) => {
    e.preventDefault();
    let list = {
      name: this.state.name,
    };
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/customer/${this.state.id}`,
      list
    );
    this.setState({
      showmodal: false,
    });
    this.handelCall();
  };

  render() {
    return (
      <>
        <h1>customers Page</h1>
        <section class="intro">
          <div class="mask d-flex align-items-center h-100">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                  <div class="cardcust">
                    <div class="card-body p-5 text-center">
                      <form onSubmit={this.addHandle} class="my-md-5 pb-5">
                        <h1 class="fw-bold mb-0">Add Item</h1>

                        <i class="fas fa-user-astronaut fa-3x my-5"></i>

                        <div class="form-outline mb-3">
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={this.handleItem}
                            class="form-control form-control-lg"
                          />
                        </div>

                        <button
                          class="btn btn-primary btn-lg btn-rounded gradient-custom text-body px-5"
                          type="submit"
                        >
                          Add a new Customer
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
          <section class="mx-auto section my-5">
            {this.state.customers.map((i) => {
              return (
                <div class="card testimonial-card mt-2 mb-3">
                  <div class="card-up aqua-gradient"></div>
                  <div class="avatar mx-auto white">
                    <img
                      src="http://cdn.onlinewebfonts.com/svg/img_552555.png"
                      width={100}
                      height={100}
                      class="rounded-circle img-fluid"
                      alt="woman avatar"
                    />
                  </div>
                  <div class="card-body text-center">
                    <h4 class="card-title font-weight-bold">{i.name}</h4>
                    <h6>{i.id}</h6>
                    <button
                      onClick={() => {
                        this.handleUpdate(i.id, i.name);
                      }}
                      class="btn mr-2"
                    >
                      <i class="fas fa-link"> Update</i>
                    </button>
                    <button
                      onClick={() => this.handleDelete(i.id)}
                      class="btn "
                    >
                      <i class="fab fa-github"> Delete</i>
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
        <Modal show={this.state.showmodal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Update Customer's Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handlesubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.name}
                  name="name"
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
      </>
    );
  }
}

export default Customers;
