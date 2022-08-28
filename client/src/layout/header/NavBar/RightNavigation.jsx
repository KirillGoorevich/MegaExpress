import React from "react";
import { ROUTES } from "../../../model/routes";
import NavRouteLink from "../../common/Navigation/NavRouteLink";

const RightNavigation = ({ user }) => {
  return (
    <ul className="navbar-nav">
      {!user && (
        <>
          <NavRouteLink route={ROUTES.LOGIN} />
          <NavRouteLink route={ROUTES.SIGNUP} />
        </>
      )}
      {user && user.isAdmin && <NavRouteLink route={ROUTES.User_Management_Interface} />}
      {user && user.isAdmin && <NavRouteLink route={ROUTES.Order_Management} />}
      {user && <NavRouteLink route={ROUTES.CART} />}
      {user && <NavRouteLink route={ROUTES.MY_ORDERS} />}
      {user && <NavRouteLink route={ROUTES.LOGOUT} />}
      {user && <NavRouteLink route={ROUTES.My_Account} />}
    </ul>
  );
};

export default RightNavigation;
