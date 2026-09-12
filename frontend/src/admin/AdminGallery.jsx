import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminGallery() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    imageBase64: "",
  });

  const handleUnauthorized = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    alert("Session expired. Please login again.");
    navigate("/admin/login");
  };

  const fetchGallery = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/gallery"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load gallery."
        );
      }

      setItems(data.items);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        imageBase64: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.category.trim() ||
      !formData.imageBase64
    ) {
      alert("Title, category and image are required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "http://localhost:5000/api/gallery",
        {
          method: "POST",
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
          data.message || "Failed to upload image."
        );
      }

      setItems((prevItems) => [
        data.item,
        ...prevItems,
      ]);

      setFormData({
        title: "",
        category: "",
        description: "",
        price: "",
        imageBase64: "",
      });

      const imageInput =
        document.getElementById("galleryImage");

      if (imageInput) {
        imageInput.value = "";
      }

      alert("Gallery item added successfully.");
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to delete this gallery item?"
    );

    if (!ok) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/gallery/${id}`,
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
          data.message || "Failed to delete gallery item."
        );
      }

      setItems((prevItems) =>
        prevItems.filter(
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
          <h1>Manage Gallery</h1>
        </div>

        <div className="admin-service-form-card">
          <h2>Add New Work</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Work title"
              value={formData.title}
              onChange={handleChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category e.g. Bed, Wardrobe"
              value={formData.category}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <input
              type="text"
              name="price"
              placeholder="Example: Starting from ₹10,000"
              value={formData.price}
              onChange={handleChange}
            />

            <input
              id="galleryImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {formData.imageBase64 && (
              <img
                src={formData.imageBase64}
                alt="Preview"
                style={{
                  width: "180px",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />
            )}

            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Uploading..."
                : "Add to Gallery"}
            </button>
          </form>
        </div>

        <div className="admin-service-list">
          <h2>Gallery Items</h2>

          {loading ? (
            <p>Loading gallery...</p>
          ) : items.length === 0 ? (
            <p>No gallery items available.</p>
          ) : (
            items.map((item) => (
              <div
                className="admin-service-item"
                key={item._id}
              >
                <div>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      width: "160px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  <h3>{item.title}</h3>

                  <p>
                    <strong>Category:</strong>{" "}
                    {item.category}
                  </p>

                  <p>{item.description}</p>

                  {item.price && (
                    <strong>{item.price}</strong>
                  )}
                </div>

                <div className="admin-service-actions">
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(item._id)
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

export default AdminGallery;