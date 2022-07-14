import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const ROUTES = {
  ROOT: "ROOT",
  ABOUT: "ABOUT",
  LOGOUT: "LOGOUT",
  CREATE_PRODUCT: "CREATE_PRODUCT",
  MY_PRODUCTS: "MY_PRODUCTS",
  MY_FAV_PRODUCTS: "MY_FAV_PRODUCTS",
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
  SELLER_REGISTER: "SELLER_REGISTER",
  MY_ORDERS: "MY_ORDERS",
  CART: "CART",
};

const ROUTES_DEF = {
  [ROUTES.ROOT]: { to: "/", label: "Home" },
  [ROUTES.ABOUT]: { to: "/about", label: "About" },
  [ROUTES.LOGOUT]: { to: "/logout", label: "Logout" },
  [ROUTES.CREATE_PRODUCT]: { to: "/create-product", label: "Create Product" },
  [ROUTES.MY_PRODUCTS]: { to: "/my-products", label: "My Products" },
  [ROUTES.MY_FAV_PRODUCTS]: { to: "/my-fav-products", label: "Favorite Products" },
  [ROUTES.LOGIN]: { to: "/login", label: "Login" },
  [ROUTES.SIGNUP]: { to: "/signup", label: "Signup" },
  [ROUTES.SELLER_REGISTER]: { to: "/seller-register", label: "Seller Signup" },
  [ROUTES.MY_ORDERS]: { to: "/my-orders", label: "My Orders" },
  [ROUTES.CART]: { to: "/cart", label: <FontAwesomeIcon icon={faCartShopping}/> },
};

export { ROUTES_DEF, ROUTES };
