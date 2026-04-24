import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
// import Products from "./pages/Products";
import Products from "./pages/Products";
import Payments from "./pages/Payments";
import Customers from "./pages/Customers"
import Reports from "./pages/Reports"
import Reviews from"./pages/Reviews"
import Marketing from "./pages/Marketing";
import Orders from "./pages/Orders";
import Returns from "./pages/Returns";
import Settings from "./pages/Settings";
import VendorDashboard from "./pages/Vendors";
import VendorDetail from "./pages/VendorDetail";
import AdminUsers from "./pages/Adminusers";
import Cms from "./pages/Cms";
import Support from "./pages/Support";
import DeliveryStatus from "./pages/Deliverystatus";
import ReferralSystem from "./pages/Referralsystem";
import Categories from "./pages/Categories";
import Inventory from "./pages/Inventory";
import Coupons from "./pages/Coupons";
import Referrers from "./pages/Referrers";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/customers" element={<Customers/>}/>
          <Route path="/reports" element={<Reports/>}/>
          <Route path="/reviews" element={<Reviews/>}/>
          <Route path="/marketing" element={<Marketing/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/returns" element={<Returns/>}/>
           <Route path="/settings" element={<Settings/>}/>
           <Route path="/vendors"  element={<VendorDashboard/>}/>
           <Route path="/vendorsdetails/:id" element={<VendorDetail />} />
           <Route path="/admin-users"  element={<AdminUsers/>}/>
           <Route path="/cms"  element={<Cms/>}/>
           <Route path="/delivery"  element={<DeliveryStatus/>}/>
           <Route path="/referrals"  element={<ReferralSystem/>}/>
           <Route path="/support"  element={<Support/>}/>
           <Route path="/categories" element={<Categories/>}/>
           <Route path="/inventory" element={<Inventory/>}/>
           <Route path="/coupons" element={<Coupons/>}/>
           <Route path="/referrers" element={<Referrers/>}/>
        
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;