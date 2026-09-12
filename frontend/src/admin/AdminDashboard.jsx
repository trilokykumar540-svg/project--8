import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [stats, setStats] = useState({
    services: 0,
    gallery: 0,
    enquiries: 0,
    newEnquiries: 0,
  });

  const [loading, setLoading] = useState(true);

  const handleUnauthorized = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    alert("Session expired. Please login again.");

    navigate("/admin/login");
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          servicesResponse,
          galleryResponse,
          enquiriesResponse,
        ] = await Promise.all([
          fetch("http://localhost:5000/api/services"),

          fetch("http://localhost:5000/api/gallery"),

          fetch(
            "http://localhost:5000/api/enquiries",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ]);

        if (enquiriesResponse.status === 401) {
          handleUnauthorized();
          return;
        }

        const servicesData =
          await servicesResponse.json();

        const galleryData =
          await galleryResponse.json();

        const enquiriesData =
          await enquiriesResponse.json();

        if (!servicesResponse.ok) {
          throw new Error(
            servicesData.message ||
              "Failed to load services."
          );
        }

        if (!galleryResponse.ok) {
          throw new Error(
            galleryData.message ||
              "Failed to load gallery."
          );
        }

        if (!enquiriesResponse.ok) {
          throw new Error(
            enquiriesData.message ||
              "Failed to load enquiries."
          );
        }

        const enquiries =
          enquiriesData.enquiries || [];

        const newEnquiries =
          enquiries.filter(
            (item) => item.status === "New"
          ).length;

        setStats({
          services:
            servicesData.services?.length || 0,

          gallery:
            galleryData.items?.length || 0,

          enquiries: enquiries.length,

          newEnquiries,
        });
      } catch (error) {
        console.error(
          "Dashboard data error:",
          error
        );

        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

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
          <Link to="/admin">
            Dashboard
          </Link>

          <Link to="/admin/services">
            Services
          </Link>

          <Link to="/admin/gallery">
            Gallery
          </Link>

          <Link to="/admin/enquiries">
            Enquiries
          </Link>

          <Link to="/admin/business">
            Business Info
          </Link>
        </nav>

        <button onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <div className="admin-header">
          <p>ADMIN PANEL</p>

          <h1>Dashboard</h1>

          <span>
            Manage Balaji Carpenter website
            content and customer enquiries.
          </span>
        </div>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <div className="admin-stats-grid">
            <Link
              to="/admin/services"
              className="admin-stat-card"
            >
              <h3>Total Services</h3>

              <strong>
                {stats.services}
              </strong>

              <span>
                Manage Services
              </span>
            </Link>

            <Link
              to="/admin/gallery"
              className="admin-stat-card"
            >
              <h3>Gallery Items</h3>

              <strong>
                {stats.gallery}
              </strong>

              <span>
                Manage Gallery
              </span>
            </Link>

            <Link
              to="/admin/enquiries"
              className="admin-stat-card"
            >
              <h3>Total Enquiries</h3>

              <strong>
                {stats.enquiries}
              </strong>

              <span>
                View Enquiries
              </span>
            </Link>

            <Link
              to="/admin/enquiries"
              className="admin-stat-card"
            >
              <h3>New Enquiries</h3>

              <strong>
                {stats.newEnquiries}
              </strong>

              <span>
                Needs Attention
              </span>
            </Link>
          </div>
        )}

        <div className="admin-dashboard-actions">
          <h2>Quick Actions</h2>

          <div className="dashboard-action-grid">
            <Link to="/admin/services">
              Add / Manage Services
            </Link>

            <Link to="/admin/gallery">
              Upload Gallery Photos
            </Link>

            <Link to="/admin/enquiries">
              Check Customer Enquiries
            </Link>

            <Link to="/admin/business">
              Update Business Info
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;