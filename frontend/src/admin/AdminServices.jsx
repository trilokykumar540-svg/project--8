import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminServices() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("adminToken");

  const fetchServices = async () => {
    try {
      const response = await fetch(
        "/api/services"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load services."
        );
      }

      setServices(data.services);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
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
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.price.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setSaving(true);

      const url = editingId
        ? `/api/services/${editingId}`
        : "/api/services";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");

        alert("Session expired. Please login again.");

        navigate("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save service."
        );
      }

      if (editingId) {
        setServices(
          services.map((service) =>
            service._id === editingId
              ? data.service
              : service
          )
        );
      } else {
        setServices([
          data.service,
          ...services,
        ]);
      }

      setFormData({
        title: "",
        description: "",
        price: "",
      });

      setEditingId(null);
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service._id);

    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      title: "",
      description: "",
      price: "",
    });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!ok) return;

    try {
      const response = await fetch(
        `/api/services/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");

        alert("Session expired. Please login again.");

        navigate("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete service."
        );
      }

      setServices(
        services.filter(
          (service) => service._id !== id
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>WoodMagic</h2>

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
          <h1>Manage Services</h1>
        </div>

        <div className="admin-service-form-card">
          <h2>
            {editingId
              ? "Edit Service"
              : "Add New Service"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Service title"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Service description"
              value={formData.description}
              onChange={handleChange}
            />

            <input
              type="text"
              name="price"
              placeholder="Example: Starting from ₹5,000"
              value={formData.price}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Service"
                : "Add Service"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-edit-btn"
                onClick={handleCancelEdit}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <div className="admin-service-list">
          <h2>Current Services</h2>

          {loading ? (
            <p>Loading services...</p>
          ) : services.length === 0 ? (
            <p>No services available.</p>
          ) : (
            services.map((service) => (
              <div
                className="admin-service-item"
                key={service._id}
              >
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <strong>{service.price}</strong>
                </div>

                <div className="admin-service-actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(service)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(service._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminServices;