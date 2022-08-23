import { Component } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteOrder } from "../../../services/orderService";

class OrderExtends extends Component {
  handleDelete = (userID) => {
    Swal.fire({
      title: "Are you sure you wont to delete this order?",
      showCancelButton: true,
      confirmButtonText: "Delete Order",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let orders = [...this.state.orders];
        orders = orders.filter((user) => user._id !== userID);
        this.setState({ orders });
        await deleteOrder(userID);
        toast.success("You have successfully deleted the order!");
      }
    });
  };

  handleDisplay = (display) => {
    let disChange = display;
    this.setState({ display: disChange });
    localStorage.setItem("orderDisplay",JSON.stringify(display));
  };

  //display remains same on reload thanks to local storage
  getOrderDisplay(){
    const storedDisplay = JSON.parse(localStorage.getItem("orderDisplay"));
    if(!storedDisplay){
      return "order-cards";
    }
    return storedDisplay;
  }
}


export default OrderExtends;
