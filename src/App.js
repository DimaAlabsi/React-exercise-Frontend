import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Orders from "./components/Orders";
import Customers from "./components/Customers";
import Footer from "./components/Footer";
import axios from "axios";
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      id: 0,
      itemCode: 0,
      quantity: 0,
      price: 0,
      showmodal: false,
    };
  }
  componentDidMount = () => {
    this.handelCall();
  };
  handelCall = () => {
    console.log("call");
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/items`).then((res) => {
      this.setState({
        items: res.data,
      });
    });
  };
  addHandle = (e) => {
    e.preventDefault();
    let config = {
      method: "POST",
      baseURL: process.env.REACT_APP_BACKEND_URL,
      url: "/items",
      data: {
        price: this.state.price,
        quantity: this.state.quantity,
        itemCode: this.state.itemCode,
      },
    };
    axios(config).then((res) => {
      console.log(res.data);
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/items`).then((res) => {
        this.setState({
          items: res.data,
        });
      });
    });
  };
  handleDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/items/${id}`);
    this.handelCall();
  };

  handleClose = () => {
    this.setState({
      showmodal: false,
    });
  };

  itemCodeHandle = (e) => {
    this.setState({
      itemCode: e.target.value,
    });
  };
  quantityHandle = (e) => {
    this.setState({
      quantity: e.target.value,
    });
  };
  priceHandle = (e) => {
    this.setState({
      price: e.target.value,
    });
  };

  handleUpdate = (id, itemCode, quantity, price) => {
    this.setState({
      id: id,
      itemCode: itemCode,
      quantity: quantity,
      price: price,
      showmodal: true,
    });
  };
  handlesubmit = async (e) => {
    e.preventDefault();
    let list = {
      itemCode: this.state.itemCode,
      quantity: this.state.quantity,
      price: this.state.price,
    };
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/items/${this.state.id}`,
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
        <Router>
          <Header />

          <Switch>
            <Route exact path="/">
              <Home
                items={this.state.items}
                id={this.state.id}
                showmodal={this.state.showmodal}
                itemCode={this.state.itemCode}
                quantity={this.state.quantity}
                price={this.state.price}
                itemCodeHandle={this.itemCodeHandle}
                quantityHandle={this.quantityHandle}
                priceHandle={this.priceHandle}
                handlesubmit={this.handlesubmit}
                handleClose={this.handleClose}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                addHandle={this.addHandle}
              />
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/orders">
              <Orders />
            </Route>
          </Switch>
          <Switch>
            <Route exact path="/customers">
              <Customers />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default App;
