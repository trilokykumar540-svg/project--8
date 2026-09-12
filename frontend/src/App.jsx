import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";
import GetQuote from "./pages/GetQuote.jsx";

import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminServices from "./admin/AdminServices.jsx";
import AdminGallery from "./admin/AdminGallery.jsx";
import AdminEnquiries from "./admin/AdminEnquiries.jsx";
import AdminBusiness from "./admin/AdminBusiness.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";

function App() {
  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/get-quote" element={<GetQuote />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/services"
          element={
            <ProtectedRoute>
              <AdminServices />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/gallery"
          element={
            <ProtectedRoute>
              <AdminGallery />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/enquiries"
          element={
            <ProtectedRoute>
              <AdminEnquiries />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/business"
          element={
            <ProtectedRoute>
              <AdminBusiness />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;