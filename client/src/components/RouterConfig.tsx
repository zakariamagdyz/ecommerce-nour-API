import { Suspense, lazy } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Error from "./Error";
import Spinner from "./Spinner";
import OrderData from "../context/order";
// hooks
import { useAppSelector } from "../redux/hooks";

const Cart = lazy(() => import("../pages/Cart"));
const Home = lazy(() => import("../pages/Home"));
const ProductList = lazy(() => import("../pages/ProductList"));
const Register = lazy(() => import("../pages/auth/Register"));
const Login = lazy(() => import("../pages/auth/Login"));
const Product = lazy(() => import("../pages/Product"));
const ForgotPass = lazy(() => import("../pages/auth/ForgotPass"));
const ResetPass = lazy(() => import("../pages/auth/ResetPass"));
const Activation = lazy(() => import("../pages/auth/Activation"));
const ProcessingOrder = lazy(() => import("../pages/ProcessingOrder"));
const OrderDetail = lazy(() => import("../pages/OrderDetail"));

const RequireAuth = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/login" />;

  return <Outlet />;
};

const RequireLogout = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) return <Navigate to="/" />;

  return <Outlet />;
};

const RouterConfig = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="category/:id" element={<ProductList />} />
        <Route
          path="products/:id"
          element={
            <OrderData>
              <Product />
            </OrderData>
          }
        />

        <Route path="/cart" element={<Cart />} />
        <Route element={<RequireLogout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/reset-password/:token" element={<ResetPass />} />
        </Route>
        <Route path="/activate-account/:activation" element={<Activation />} />
        <Route path="/processing-order" element={<ProcessingOrder />} />
        <Route path="/order-details" element={<OrderDetail />} />
        <Route element={<RequireAuth />}>
          <Route path="profile" element={<div>Profile</div>} />
        </Route>

        <Route
          path="*"
          element={
            <Error
              message="Sorry, This page is not found"
              imageUrl="https://i.imgur.com/Q2BAOd2.png"
            />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;
