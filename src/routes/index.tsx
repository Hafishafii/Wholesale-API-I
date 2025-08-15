import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import {
  Address,
  BestSale,
  CartPage,
  CategoryPage,
  Checkout,
  CustomizedOrderRequests,
  CustomizeYourOrder,
  DetailedOrderRequest,
  EditProfile,
  Home,
  LandingPage,
  Login,
  NotFound,
  NotificationDetails,
  Notifications,
  OrderDetailsPage,
  OrderPage,
  OTPVerificationPage,
  ProductDetailsPage,
  ProductList,
  Purchase,
  Register,
  UserAccount,
  UserProfile,
} from "../pages";
import AdminOnlyRoute from "./AdminOnlyRoute";
import {
  AccountDetails,
  AddProductPage,
  AdminHome,
  AdminLogin,
  AdminProfilePage,
  ChangePassword,
  EditProfile as AdminEditProfile,
  NotificationPage,
  OrderDetailsPage as AdminOrderDetailsPage,
  OrderRequestsPage,
  NotFound as AdminNotFound,
  ProductListPage,
} from "../pages/admin";
import OrderTrack from "../pages/OrderTrack";
import PaymentSuccessPage from "../features/payment/PaymentSuccessPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import WishlistPage from "../pages/WishlistPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import EnterOTPPage from "../pages/EnterOTPPage";
import HelpDeskPage from "../pages/HelpDeskPage";
import FAQPage from "../pages/FAQPage";
import ResetNewPasswordPage from "../pages/ResetNewPasswordPage";
import AddressPage from "../pages/AddressPage";
import { useUser } from "../hooks/useUser";
import EditProductPage from "../pages/admin/EditProductPage";

const AppRoutes = () => {
  useUser();
  return (
    <Routes>
       <Route path="/" element={<LandingPage />} /> {/*Suhail*/}
      <Route path="/home" element={<Home />} /> {/*Suhail*/}
      <Route path="/login" element={<Login />} /> {/*Suhail*/}
      <Route path="/register-otp" element={<OTPVerificationPage />} /> {/*Suhail*/}
      <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/*Saranya*/}
      <Route path="/register" element={<Register />} /> {/*Suhail*/}

      <Route element={<ProtectedRoute />}>
        <Route path="/products" element={<ProductList />} /> {/*Akshay*/} 
        <Route path="/orders" element={<OrderPage />} /> {/*Akshay*/}
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} /> {/*Akshay*/}

        <Route path="/cart" element={<CartPage />} /> {/*Akshay*/}
        <Route path="/products/:id" element={<ProductDetailsPage />} /> {/*Akshay*/}
        <Route path="/notifications" element={<Notifications />} /> {/*Suhail*/}
         <Route path="/notifications/:id" element={<NotificationDetails />} /> {/*Suhail*/}
        <Route path="/customize-order" element={<CustomizeYourOrder />} /> {/*Suhail*/}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/address/edit" element={<Address />} />
        <Route path="/bestsale" element={<BestSale />} />
        <Route path="/paymentsuccess" element={<PaymentSuccessPage />} />
        <Route path="/order/track/:id" element={<OrderTrack />} />
        <Route path="/wishlist" element={<WishlistPage />} /> {/*Saranya*/}
        <Route path="/enter-otp" element={<EnterOTPPage />} />
        <Route path="/faqs" element={<FAQPage />} /> {/*Saranya*/}

        <Route path="/reset-password" element={<ResetNewPasswordPage />} /> {/*Saranya*/}
        <Route path="/address" element={<AddressPage />} /> {/*Saranya*/}
        <Route path="/account" element={<UserAccount />} /> {/*Navin*/}
        <Route path="/purchase" element={<Purchase />} /> {/*Navin*/}
        <Route path="/profile" element={<UserProfile />} /> {/*Navin*/}
        <Route path="/profile/edit" element={<EditProfile />} /> {/*Navin*/}
        <Route path="/profile/requests" element={<CustomizedOrderRequests />} />
        <Route
          path="/profile/requests/:id"
          element={<DetailedOrderRequest />}
        />
        <Route
          path="/profile/change-password"
          element={<ChangePasswordPage />} 
        /> {/*Saranya*/}
        <Route path="/help-desk" element={<HelpDeskPage />} />
      </Route>

      {/* ADMIN ROUTES  */}
      <Route path="/admin/login" element={<AdminLogin />} /> {/*Aravind*/}

      <Route path="/admin/*" element={<AdminOnlyRoute />}>
        <Route index element={<AdminHome />} />  {/*Aravind*/}
        <Route path="notification" element={<NotificationPage />} /> {/*Hafis*/}
        <Route path="categories" element={<CategoryPage />} />
        <Route path="products" element={<ProductListPage />} /> {/*Hafis*/}
        <Route path="add-product" element={<AddProductPage />} /> {/*Hafis*/}
        <Route path="products/:id/edit" element={<EditProductPage />} /> {/* Hafis */}
        <Route path="orders" element={<OrderRequestsPage />} /> {/*Hafis*/}
        <Route path="orders/:id" element={<AdminOrderDetailsPage />} /> {/*Hafis*/}
        <Route path="profile" element={<AdminProfilePage />} /> {/*Hafis*/}
        <Route path="profile/edit" element={<AdminEditProfile />} />  {/*Aravind*/}
        <Route path="profile/change-password" element={<ChangePassword />} />  {/*Aravind*/}
        <Route path="profile/details" element={<AccountDetails />} />  {/*Aravind*/}
        <Route path="*" element={<AdminNotFound />} />  {/*Aravind*/}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
