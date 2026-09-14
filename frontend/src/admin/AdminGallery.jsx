import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminGallery() {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");

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
        "/api/gallery"
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

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      price: "",
      imageBase64: "",
    });

    setEditingId(null);
    setExistingImageUrl("");

    const imageInput =
      document.getElementById("galleryImage");

    if (imageInput) {
      imageInput.value = "";
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);

    setFormData({
      title: item.title || "",
      category: item.category || "",
      description: item.description || "",
      price: item.price || "",
      imageBase64: "",
    });

    setExistingImageUrl(item.imageUrl || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.category.trim()
    ) {
      alert("Title and category are required.");
      return;
    }

    if (!editingId && !formData.imageBase64) {
      alert("Image is required.");
      return;
    }

    try {
      setSaving(true);

      const url = editingId
        ? `/api/gallery/${editingId}`
        : "/api/gallery";

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
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
            (editingId
              ? "Failed to update gallery item."
              : "Failed to upload image.")
        );
      }

      if (editingId) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === editingId
              ? data.item
              : item
          )
        );

        alert("Gallery item updated successfully.");
      } else {
        setItems((prevItems) => [
          data.item,
          ...prevItems,
        ]);

        alert("Gallery item added successfully.");
      }

      resetForm();
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
        `/api/gallery/${id}`,
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

      if (editingId === id) {
        resetForm();
      }
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
          <h1>Manage Gallery</h1>
        </div>

        <div className="admin-service-form-card">
          <h2>
            {editingId
              ? "Edit Gallery Item"
              : "Add New Work"}
          </h2>

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

            {editingId &&
              !formData.imageBase64 &&
              existingImageUrl && (
                <div>
                  <p>Current Image</p>

                  <img
                    src={existingImageUrl}
                    alt="Current"
                    style={{
                      width: "180px",
                      marginTop: "10px",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}

            {formData.imageBase64 && (
              <div>
                <p>
                  {editingId
                    ? "New Image Preview"
                    : "Image Preview"}
                </p>

                <img
                  src={formData.imageBase64}
                  alt="Preview"
                  style={{
                    width: "180px",
                    marginTop: "10px",
                    borderRadius: "8px",
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? editingId
                  ? "Updating..."
                  : "Uploading..."
                : editingId
                ? "Save Changes"
                : "Add to Gallery"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  marginLeft: "10px",
                }}
              >
                Cancel Edit
              </button>
            )}
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
                    onClick={() =>
                      handleEdit(item)
                    }
                  >
                    Edit
                  </button>

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