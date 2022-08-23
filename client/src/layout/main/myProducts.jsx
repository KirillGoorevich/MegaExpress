import React from "react";
import PageHeader from "../common/pageHeader";
import { getMyCards } from "../../services/cardService";
import CardExtends from "../common/Cards/cardExtends";
import { Link, Navigate } from "react-router-dom";
import DisplayControllers from "../common/DisplayModes/displayControllers";
import DisplayModes from "../common/DisplayModes/displayMode";

class MyProducts extends CardExtends {
  state = {
    data: [],
    cards: [],
    isMount: false,
    display: "cards",
  };

  async componentDidMount() {
    try {
      const { data } = await getMyCards();
      this.setState({ data, cards: data, isMount: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { user } = this.props;
    if (!user || (user && !user.biz)) return <Navigate replace to="/" />;

    const cards = [...this.state.cards];
    const { isMount, display } = this.state;
    if (!isMount) return null;

    return (
      <React.Fragment>
        <PageHeader
          title="My Products"
          subTitle="Here you can find your products for sale"
        />
        <div className="container">
          <Link to="/create-product">
            <span className="btn btn-primary">Create a new Product</span>
          </Link>
          <br />
          <br />
          <div>
            <DisplayControllers
              display={display}
              handeDisplay={this.handleDisplay}
            />
            <DisplayModes
              cards={cards}
              handleDelete={this.handleDelete}
              changeLikeStatus={this.changeLikeStatus}
              display={display}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyProducts;
