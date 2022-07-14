import { Component } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteCard, changeLikeStatus, changeCartStatus } from "../../../services/cardService";

class CardExtends extends Component {
  handleDelete = (cardID) => {
    Swal.fire({
      title: "Are you sure you wont to delete this product?",
      showCancelButton: true,
      confirmButtonText: "Delete Card",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let cards = [...this.state.cards];
        cards = cards.filter((card) => card._id !== cardID);
        this.setState({ cards });
        await deleteCard(cardID);
        toast.success("You have successfully deleted the product!");
      }
    });
  };

  handleChange = (e) => {
    const data = [...this.state.data];
    let cards = data;
    const searchTerm = e.target.value;
    const cardsFiltered = cards.filter((card) => {
      return (
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.bizNumber.includes(searchTerm.toLowerCase())
      );
    });
    this.setState({ cards: cardsFiltered });
  };

  //used only in myFavoriteProducts.jsx
  removeFavCards = async (cardId, user) => {
    let cards = [...this.state.cards];
    let card = cards.find((card) => card._id === cardId);
    card.likes = card.likes.filter((id) => id !== user._id);
    this.setState({ cards });
    await changeLikeStatus(card._id);
    window.location.reload(false);
  };

  changeLikeStatus = async (cardId, user) => {
    try {
      let cards = [...this.state.data];
      let card = cards.find((card) => card._id === cardId);
      if (!card) return;

      let cardLikes = card.likes;

      if (!cardLikes.length) {
        card.likes.push(user._id);
        this.setState({ cards });
        await changeLikeStatus(card._id);
        return;
      }

      let isUserLikedCard = cardLikes.find((id) => id === user._id);

      if (!isUserLikedCard) {
        card.likes.push(user._id);
        this.setState({ cards });
        await changeLikeStatus(card._id);
        return;
      }

      card.likes = card.likes.filter((id) => id !== user._id);

      this.setState({ cards });

      await changeLikeStatus(card._id);

      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  //used only in cart.jsx
  removeCartCards = async (cardId, user) => {
    let cards = [...this.state.cards];
    let card = cards.find((card) => card._id === cardId);
    card.cart = card.cart.filter((id) => id !== user._id);
    this.setState({ cards });
    await changeCartStatus(card._id);
    window.location.reload(false);
  };

  changeCartStatus = async (cardId, user) => {
    try {
      let cards = [...this.state.data];
      let card = cards.find((card) => card._id === cardId);
      if (!card) return;

      let cart = card.cart;

      if (!cart.length) {
        card.cart.push(user._id);
        this.setState({ cards });
        await changeCartStatus(card._id);
        return;
      }

      let isInCart = cart.find((id) => id === user._id);

      if (!isInCart) {
        card.cart.push(user._id);
        this.setState({ cards });
        await changeCartStatus(card._id);
        return;
      }

      card.cart = card.cart.filter((id) => id !== user._id);

      this.setState({ cards });

      await changeCartStatus(card._id);

      return;
    } catch (error) {
      console.log(error.message);
    }
  };

  handleDisplay = (display) => {
    let disChange = display;
    this.setState({ display: disChange });
  };
}

export default CardExtends;
