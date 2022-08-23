import React from "react";
import PageHeader from "../common/pageHeader";
import { Navigate } from "react-router-dom";
import { getOrders } from "../../services/orderService"
import OrderExtends from "../common/Orders/orderExtends";
import OrderDisplayControllers from "../common/Orders/orderDisplayControllers";
import OrderDisplayModes from "../common/Orders/orderDisplayModes";

class OrderManagement extends OrderExtends {
  state = {
    orders: [],
    isMount: false,
    display: this.getOrderDisplay(),

  };

  async componentDidMount() {
    try {
      let myOrders = [];
      const {data  : orders} = await getOrders();
      for (let i = 0; i < orders.length; i++) {
        myOrders.push(orders[i]);
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
          title="Order Management"
          subTitle="Here you can Manage Orders"
        />
        <div className="container">
        <OrderDisplayControllers
          display={display}
          handleDisplay={this.handleDisplay}
          />
          <div>
            <OrderDisplayModes
              orders={orders}
              display={display}
              handleDelete={this.handleDelete}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OrderManagement;
