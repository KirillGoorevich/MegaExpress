import React from "react";
import NavRouteLink from "../../common/Navigation/NavRouteLink";
import { ROUTES } from "../../../model/routes";

const LeftNavigation = ({ user }) => {
  return (
    <ul className="navbar-nav">
      <NavRouteLink route={ROUTES.ABOUT} />
      {(!user) && <NavRouteLink route={ROUTES.SELLER_REGISTER} />}
      {user && user.biz && <NavRouteLink route={ROUTES.MY_PRODUCTS} />}
      {user && <NavRouteLink route={ROUTES.MY_FAV_PRODUCTS} />}
      {user && user.biz && <NavRouteLink route={ROUTES.CREATE_PRODUCT} />}
    </ul>
  );
};

export default LeftNavigation;
