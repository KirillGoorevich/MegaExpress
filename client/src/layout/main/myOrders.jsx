import React, { Component } from "react";
import PageHeader from "../common/pageHeader";
import { Navigate } from "react-router-dom";
import { getOrders } from "../../services/orderService"
import OrderDisplayModes from "../common/Orders/orderDisplayModes";

class MyOrders extends Component {
  state = {
    orders: [],
    isMount: false,
    display: "order-cards",

  };

  async componentDidMount() {
    try {
      const { user } = this.props;
      let myOrders = [];
      const {data  : orders} = await getOrders();
      for (let i = 0; i < orders.length; i++) {
        if(orders[i].buyerId === user._id){
          myOrders.push(orders[i]);
        }
      }
      this.setState({ orders: myOrders, isMount: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { user } = this.props;
    if (!user) return <Navigate replace to="/" />;

    const orders = [...this.state.orders];

    const { isMount, display } = this.state;
    if (!isMount) return null;

    return (
      <React.Fragment>
        <PageHeader
          title="My Orders"
          subTitle="Here you can find your orders"
        />
        <div className="container">
          <div>
            <OrderDisplayModes
              orders={orders}
              display={display}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyOrders;
