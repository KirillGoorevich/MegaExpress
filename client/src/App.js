import HomePage from "./layout/main/home";
import About from "./layout/main/about.jsx";
import { Routes, Route } from "react-router-dom";
import Error404 from "./layout/main/error404";
import Header from "./layout/header/Header.jsx";
import Footer from "./layout/footer/footer.jsx";
import Logout from "./layout/main/logout";
import MyProducts from "./layout/main/myProducts";
import MyFavroiteProducts from "./layout/main/myFavroiteProducts";
import Login from "./layout/main/login";
import Signup from "./layout/main/signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUser } from "./services/userService";
import CreateProduct from "./layout/main/createProduct";
import EditProductConvertor from "./layout/main/editProductConvertor";
import ShowProductConvertor from "./layout/main/showProductConvertor";
import AdminShortcut from "./layout/common/Admin/AdminShortcut";
import AdminSignup from "./layout/common/Admin/AdminSignup";
import SellerSignup from "./layout/main/sellerSignup";
import PlaceOrderConvertor from "./layout/main/placeOrderConvertor";
import MyOrders from "./layout/main/myOrders";
import Cart from "./layout/main/cart";
import RetrievePassword from "./layout/main/retrievePassword";
import ResetPassword from "./layout/main/resetPassword";
import CatOrderConvertor from "./layout/main/catConvertor";
import IdleTimerContainer from "./services/idleTimerContainer";
import UserManagementInterface from "./layout/main/userManagementInterface"
import OrderManagement from "./layout/main/orderManagement";
import MyAccount from "./layout/main/myAccount";

function App() {
  const user = getCurrentUser();
  return (
    <div className="App">

      {/* This logs out idle users */}
      <IdleTimerContainer/>

      <Header user={user} />
      <ToastContainer />

      <main style={{ minHeight: "85vh",backgroundColor: "#F8F8F8"}}>
        <Routes>
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/about" element={<About />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/my-products" element={<MyProducts user={user} />} />
          <Route path="/create-product" element={<CreateProduct user={user} />} />
          <Route
            path="/edit-product/:id"
            element={<EditProductConvertor user={user} />}
          />
          <Route
            path="/product-details/:id"
            element={<ShowProductConvertor user={user} />}
          />
          <Route
            path="/my-fav-products"
            element={<MyFavroiteProducts user={user} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/seller-register" element={<SellerSignup />} />
          <Route
            path="/place-order/:id"
            element={<PlaceOrderConvertor user={user} />}
          />
          <Route
            path="/my-orders"
            element={<MyOrders user={user} />}
          />
          <Route
            path="/cart"
            element={<Cart user={user} />}
          />
          <Route path="/retrieve-password" element={<RetrievePassword />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route
            path="/cat-order-converter/"
            element={<CatOrderConvertor/>}
          />
          <Route
            path="/user-management-interface"
            element={<UserManagementInterface user={user} />}
          />
          <Route
            path="/order-management"
            element={<OrderManagement user={user} />}
          />
          <Route
          path="/my-account"
          element={<MyAccount user={user} />}
          />
        </Routes>
      </main>

      <Footer />
      <AdminShortcut />
    </div>
  );
}

export default App;
