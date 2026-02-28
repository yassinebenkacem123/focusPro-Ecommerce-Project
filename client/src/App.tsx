import { Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import { AnimatePresence } from "framer-motion"
import Products from "./pages/product/Products"
import Authentication from "./pages/authentication/Authentication"
import SellerDashboard from "./pages/seller/SellerDashboard"
import AdminDashboard from "./pages/admin/AdminDashboard"
import RequireRole from "./utils/RequireRole"
import AdminLayout from "./pages/admin/AdminLayout"
import Customers from "./pages/admin/Customers"
import Orders from "./pages/admin/Orders"
import Categories from "./pages/admin/Categories"
import PaymentRevenus from "./pages/admin/PaymentRevenus"
import ProductList from "./pages/admin/ProductList"
import AddProduct from "./pages/admin/AddProduct"
import ProductReviews from "./pages/admin/ProductReviews"
import Brands from "./pages/admin/Brands"
import AdminSettings from "./pages/admin/AdminSettings"
import AdminProfile from "./pages/admin/AdminProfile"
import Cart from "./pages/cart/Cart"
function App() {

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="auth" element={<Authentication />} />
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
            <Route path ="orders" element={<Orders />} />
            <Route path="payment-revenus" element={<PaymentRevenus />} />
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<ProductList />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="product-reviews" element={<ProductReviews />} />
            <Route path="brands" element={<Brands />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} /> 
            </Route>
           
          <Route
            path="/seller/dashboard"
            element={
              <RequireRole allowedRoles={["ROLE_SELLER"]}>
                <SellerDashboard />
              </RequireRole>
            }
          />
      </Routes>
    </AnimatePresence>
  )
}

export default App
