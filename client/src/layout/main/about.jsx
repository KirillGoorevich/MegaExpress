const About = () => {
  return (
    <div className="container">
      <div className="center">
      <div className="col-12 col-md-8">
        <div style={{display: "flex",justifyContent: "center"}}>
        <span className="text-center display-4" style={{color: "#ffc107"}}>About&nbsp;</span>
        <span className="text-center display-4" style={{color: "#e62e04"}}>MegaExpress</span>
        </div>
        <h2 className="fs-5">MegaExpress delivers worldwide, from the humble kitchen appliance to solid gold, We Deliver!</h2>
        <hr />
      </div>
    </div>

      <div className="row">
        <div className="col-12 col-md-8 center">
          <div className="col-10">
            <p>
              Peruse our wide selection of products until you find something you like.
            </p>
            <p>
              A click on a prouct will send you to the product page, where as a user you can buy the product or add it to your cart.
            </p>
            <p>
              Don't have a user? Just register it's super easy!
            </p>
            <p>
              Did you like a product? Add it to your favroites by pressing the heart icon at the bottom right.
            </p>
            <p>
              Did you like a product but can't find it? Use the serch bar to filter through the products.
            </p>
            <p>
              Do you wish to sell on MegaExpress? Just Register as a seller.
            </p>
            <p>
              As a seller you can post products on MegaExpress which other users will buy.
              You can edit or delete these products as necessary.
              You can also buy products yourself.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4 center">
          <img className="img-fluid" src="/assets/images/card1.jpg" alt="card" />
        </div>
      </div>
    </div>
  );
};

export default About;
