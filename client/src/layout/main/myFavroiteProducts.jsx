import React from "react";
import PageHeader from "../common/pageHeader";
import { getCards } from "../../services/cardService";
import CardExtends from "../common/Cards/cardExtends";
import { Navigate } from "react-router-dom";
import DisplayControllers from "../common/DisplayModes/displayControllers";
import DisplayModes from "../common/DisplayModes/displayMode";

class FavroiteProducts extends CardExtends {
  state = {
    data: [],
    cards: [],
    isMount: false,
    display: "cards",
  };

  async componentDidMount() {
    try {
      const { user } = this.props;
      let myCards = [];
      const { data } = await getCards();
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].likes.length; j++) {
          if (data[i].likes[j] === user._id) {
            myCards.push(data[i]);
          }
        }
      }
      this.setState({ data, cards: myCards, isMount: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { user } = this.props;
    if (!user) return <Navigate replace to="/" />;

    const cards = [...this.state.cards];

    const { isMount, display } = this.state;
    if (!isMount) return null;

    return (
      <React.Fragment>
        <PageHeader
          title="My Favorite Products"
          subTitle="Here you can find your Favorite products"
        />
        <div className="container">
          <div>
            <DisplayControllers
              display={display}
              handeDisplay={this.handleDisplay}
            />
            <DisplayModes
              cards={cards}
              handleDelete={this.handleDelete}
              changeLikeStatus={this.removeFavCards}
              display={display}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default FavroiteProducts;
