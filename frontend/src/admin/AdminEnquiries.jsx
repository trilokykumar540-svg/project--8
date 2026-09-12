import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminEnquiries() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleUnauthorized = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    alert("Session expired. Please login again.");

    navigate("/admin/login");
  };

  const fetchEnquiries = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/enquiries",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load enquiries."
        );
      }

      setEnquiries(data.enquiries);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/enquiries/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status."
        );
      }

      setEnquiries((prevEnquiries) =>
        prevEnquiries.map((item) =>
          item._id === id
            ? {
                ...item,
                status: data.enquiry.status,
              }
            : item
        )
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );

    if (!ok) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/enquiries/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete enquiry."
        );
      }

      setEnquiries((prevEnquiries) =>
        prevEnquiries.filter(
          (item) => item._id !== id
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
          <h1>Customer Enquiries</h1>
        </div>

        {loading ? (
          <p>Loading enquiries...</p>
        ) : enquiries.length === 0 ? (
          <div className="empty-enquiries">
            <h3>No enquiries available.</h3>
          </div>
        ) : (
          <div className="admin-enquiry-list">
            {enquiries.map((enquiry) => (
              <div
                className="admin-enquiry-card"
                key={enquiry._id}
              >
                <div className="enquiry-top">
                  <div>
                    <h2>{enquiry.name}</h2>

                    <span
                      className={`status-badge ${enquiry.status.toLowerCase()}`}
                    >
                      {enquiry.status}
                    </span>
                  </div>
                </div>

                <div className="enquiry-details">
                  <p>
                    <strong>Phone:</strong>{" "}
                    {enquiry.phone}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {enquiry.location}
                  </p>

                  <p>
                    <strong>Service:</strong>{" "}
                    {enquiry.service}
                  </p>

                  <p>
                    <strong>Requirement:</strong>{" "}
                    {enquiry.requirement}
                  </p>

                  <p>
                    <strong>Preferred Date:</strong>{" "}
                    {enquiry.preferredDate ||
                      "Not provided"}
                  </p>
                </div>

                <div className="enquiry-contact-actions">
                  <a
                    href={`tel:${enquiry.phone}`}
                    className="enquiry-call-btn"
                  >
                    Call Customer
                  </a>

                  <a
                    href={`https://wa.me/91${enquiry.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="enquiry-whatsapp-btn"
                  >
                    WhatsApp
                  </a>
                </div>

                <div className="enquiry-status-section">
                  <label>Change Status</label>

                  <select
                    value={enquiry.status}
                    onChange={(e) =>
                      handleStatusChange(
                        enquiry._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="New">New</option>
                    <option value="Contacted">
                      Contacted
                    </option>
                    <option value="Confirmed">
                      Confirmed
                    </option>
                    <option value="Completed">
                      Completed
                    </option>
                  </select>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(enquiry._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminEnquiries;