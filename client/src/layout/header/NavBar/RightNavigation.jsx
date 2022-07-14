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
      {user && <NavRouteLink route={ROUTES.CART} />}
      {user && <NavRouteLink route={ROUTES.MY_ORDERS} />}
      {user && <NavRouteLink route={ROUTES.LOGOUT} />}
    </ul>
  );
};

export default RightNavigation;
