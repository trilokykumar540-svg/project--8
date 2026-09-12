import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminBusiness() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    whatsapp: "",
    address: "",
    city: "",
    state: "",
    mapLink: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleUnauthorized = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    alert("Session expired. Please login again.");

    navigate("/admin/login");
  };

  const fetchBusinessInfo = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/business"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load business info."
        );
      }

      setFormData({
        businessName: data.business.businessName || "",
        phone: data.business.phone || "",
        whatsapp: data.business.whatsapp || "",
        address: data.business.address || "",
        city: data.business.city || "",
        state: data.business.state || "",
        mapLink: data.business.mapLink || "",
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.phone.trim() ||
      !formData.whatsapp.trim() ||
      !formData.address.trim()
    ) {
      alert("Phone, WhatsApp and address are required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "http://localhost:5000/api/business",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update business info."
        );
      }

      setFormData({
        businessName: data.business.businessName || "",
        phone: data.business.phone || "",
        whatsapp: data.business.whatsapp || "",
        address: data.business.address || "",
        city: data.business.city || "",
        state: data.business.state || "",
        mapLink: data.business.mapLink || "",
      });

      alert("Business information updated successfully.");
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="admin-content">
        <p>Loading business information...</p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Balaji Carpenter</h2>

        <nav>
          <Link to="/admin">Dashboard</Link>
          <Link to="/admin/services">Services</Link>
          <Link to="/admin/gallery">Gallery</Link>
          <Link to="/admin/enquiries">Enquiries</Link>
          <Link to="/admin/business">Business Info</Link>
        </nav>

        <button onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <div className="admin-header">
          <p>ADMIN PANEL</p>
          <h1>Business Information</h1>
        </div>

        <div className="admin-service-form-card">
          <form onSubmit={handleSubmit}>
            <label>Business Name</label>

            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Balaji Carpenter"
            />

            <label>Phone Number *</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9931697178"
            />

            <label>WhatsApp Number *</label>

            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="9931697178"
            />

            <label>Address *</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Business address"
            />

            <label>City</label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />

            <label>State</label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
            />

            <label>Google Maps Link</label>

            <input
              type="text"
              name="mapLink"
              value={formData.mapLink}
              onChange={handleChange}
              placeholder="https://maps.google.com/..."
            />

            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Business Info"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AdminBusiness;