import React from "react";
import { getCards } from "../../services/cardService";
import CardExtends from "../common/Cards/cardExtends";
import DisplayControllers from "../common/DisplayModes/displayControllers";
import DisplayModes from "../common/DisplayModes/displayMode";





class CatOrder extends CardExtends {
  state = {
    data: [],
    cards: [],
    isMount: false,
    display: "cat",
    cat: "",
  };


  async componentDidMount() {
    try {
      const { cat } = this.props;
      let myCards = [];
      const { data } = await getCards();
      for (let i = 0; i < data.length; i++){
        if (data[i].subcategory === cat){
          myCards.push(data[i]);
        }
      }
      this.setState({ data, cards: myCards, isMount: true ,cat: cat});
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const cards = [...this.state.cards];
    return (
      <React.Fragment>
        <div style={{textAlign: "center",color: "#414244"}}>
        <h1>Order By Category: {this.state.cat.charAt(0).toUpperCase() + this.state.cat.slice(1)}</h1>
        <h2>Here you can find Items by Catagory</h2>
        </div>
        <div className="container">
          <div>
            <DisplayControllers
              display={this.state.display}
              handeDisplay={this.handleDisplay}
            />
            <DisplayModes
              cards={cards}
              handleDelete={this.handleDelete}
              changeLikeStatus={this.removeFavCards}
              removeCartCards={this.removeCartCards}
              display={this.state.display}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CatOrder;
