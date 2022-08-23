import { Component } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteUser, makeUserAdmin } from "../../../services/userService";

class UserExtends extends Component {
  handleDelete = (userID) => {
    Swal.fire({
      title: "Are you sure you wont to delete this user?",
      showCancelButton: true,
      confirmButtonText: "Delete User",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let users = [...this.state.users];
        users = users.filter((user) => user._id !== userID);
        this.setState({ users });
        await deleteUser(userID);
        toast.success("You have successfully deleted the user!");
      }
    });
  };

  handleDisplay = (display) => {
    let disChange = display;
    this.setState({ display: disChange });
    localStorage.setItem("userDisplay",JSON.stringify(display));
  };

  //display remains same on reload thanks to local storage
  getUserDisplay(){
    const storedDisplay = JSON.parse(localStorage.getItem("userDisplay"));
    if(!storedDisplay){
      return "user-cards";
    }
    return storedDisplay;
  }

  makeAdmin = (userID) => {
    Swal.fire({
      title: "Are you sure you wont to make this user admin?",
      showCancelButton: true,
      confirmButtonText: "Make User Admin",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await makeUserAdmin(userID);
        window.location.reload(false);
        toast.success("You have successfully made the user an admin!");
      }
    });
  };
}


export default UserExtends;
