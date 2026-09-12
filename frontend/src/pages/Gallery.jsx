import { useEffect, useState } from "react";

function Gallery() {
  const [items, setItems] = useState([]);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [galleryRes, businessRes] =
          await Promise.all([
            fetch("http://localhost:5000/api/gallery"),
            fetch("http://localhost:5000/api/business"),
          ]);

        const galleryData = await galleryRes.json();
        const businessData = await businessRes.json();

        if (galleryRes.ok) {
          setItems(galleryData.items || []);
        }

        if (businessRes.ok) {
          setBusiness(businessData.business);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const whatsapp = (
    business?.whatsapp || "9931697178"
  ).replace(/\D/g, "");

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <p>OUR WORK</p>

          <h1>
            Furniture & Carpenter Work Gallery
          </h1>

          <span>
            Explore some of our furniture and wooden
            work projects.
          </span>
        </div>
      </section>

      <section className="public-section">
        {loading ? (
          <div className="loading-box">
            Loading gallery...
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            Gallery photos will be added soon.
          </div>
        ) : (
          <div className="premium-gallery-grid">
            {items.map((item) => (
              <article
                className="premium-gallery-card"
                key={item._id}
              >
                <div className="gallery-image-wrap">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                  />

                  <span>{item.category}</span>
                </div>

                <div className="gallery-detail">
                  <h2>{item.title}</h2>

                  {item.description && (
                    <p>{item.description}</p>
                  )}

                  {item.price && (
                    <strong>{item.price}</strong>
                  )}

                  <a
                    href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                      `Hello, mujhe ${item.title} ke baare me jankari chahiye.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="small-primary-btn"
                  >
                    Enquire Now
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Gallery;