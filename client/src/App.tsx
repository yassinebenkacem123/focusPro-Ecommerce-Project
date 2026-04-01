import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/product/Products";
import Authentication from "./pages/authentication/Authentication";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RequireRole from "./utils/RequireRole";
import AdminLayout from "./pages/admin/AdminLayout";
import Customers from "./pages/admin/Customers";
import Orders from "./pages/admin/Orders";
import Categories from "./pages/admin/Categories";
import PaymentRevenus from "./pages/admin/PaymentRevenus";
import ProductList from "./pages/admin/ProductList";
import ProductReviews from "./pages/admin/ProductReviews";
import Brands from "./pages/admin/Brands";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminProfile from "./pages/admin/AdminProfile";
import Cart from "./pages/cart/Cart";
import UserLayout from "./pages/userProfile/UserLayout";
import ProfileOverview from "./pages/userProfile/ProfileOverview";
import UserOrders from "./pages/userProfile/UserOrders";
import ReturnsAndCancellations from "./pages/userProfile/ReturnsAndCancellations";
import Reviews from "./pages/userProfile/Reviews";
import Wishlist from "./pages/userProfile/Wishlist";
import PaymentMethods from "./pages/userProfile/PaymentMethods";
import Addresses from "./pages/userProfile/Addresses";
import Sellers from "./pages/admin/Sellers";
import AdminSellerManagement from "./pages/admin/AdminSellerManagement";
import AddNewSeller from "./pages/admin/AddNewSeller";
function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="auth" element={<Authentication />} />
          <Route
            path="profile"
            element={
              <RequireRole allowedRoles={["ROLE_USER", "ROLE_ADMIN", "ROLE_SELLER"]}>
                <UserLayout />
              </RequireRole>
            }
          >
            <Route index element={<ProfileOverview />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="returns" element={<ReturnsAndCancellations />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>

        <Route
          path="/admin"
          element={
            <RequireRole allowedRoles={["ROLE_ADMIN"]}>
              <AdminLayout />
            </RequireRole>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payment-revenus" element={<PaymentRevenus />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product-reviews" element={<ProductReviews />} />
          <Route path="brands" element={<Brands />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="sellers/seller/:sellerId" element={<AdminSellerManagement />} />
          <Route path="add-seller" element={<AddNewSeller />} />

        </Route>

        <Route
          path="/seller"
          element={
            <RequireRole allowedRoles={["ROLE_SELLER"]}>
              <SellerDashboard />
            </RequireRole>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
