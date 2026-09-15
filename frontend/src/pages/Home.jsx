import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/api";

function Home() {
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const loadHome = async () => {
      try {
        const [businessRes, servicesRes, galleryRes] =
          await Promise.all([
            fetch(`${API_URL}/api/business`),
            fetch(`${API_URL}/api/services`),
            fetch(`${API_URL}/api/gallery`),
          ]);

        const businessData = await businessRes.json();
        const servicesData = await servicesRes.json();
        const galleryData = await galleryRes.json();

        if (businessRes.ok) {
          setBusiness(businessData.business);
        }

        if (servicesRes.ok) {
          setServices(
            servicesData.services?.slice(0, 3) || []
          );
        }

        if (galleryRes.ok) {
          setGallery(
            galleryData.items?.slice(0, 3) || []
          );
        }
      } catch (error) {
        console.error("Home data error:", error);
      }
    };

    loadHome();
  }, []);

  const businessName =
    business?.businessName || "WoodMagic";

  const phone =
    business?.phone || "9931697178";

  const whatsapp =
    (business?.whatsapp || "9931697178").replace(
      /\D/g,
      ""
    );

  return (
    <>
      {/* HERO */}

      <section className="home-hero">
        <div className="hero-container">

          <div className="hero-copy">
            <p className="eyebrow">
              PROFESSIONAL CARPENTER SERVICES
            </p>

            <h1>
              Custom Furniture &
              <br />
              Carpenter Work You Can Trust
            </h1>

            <p className="hero-description">
              {businessName} provides quality furniture,
              repair and custom carpenter services for
              homes and businesses.
            </p>

            <div className="hero-buttons">
              <Link
                to="/get-quote"
                className="button button-primary"
              >
                Get Free Quote
              </Link>

              <a
                href={`tel:${phone}`}
                className="button button-light"
              >
                Call Now
              </a>
            </div>

            <div className="hero-features">
              <div>
                <span>✓</span>
                Quality Work
              </div>

              <div>
                <span>✓</span>
                Custom Designs
              </div>

              <div>
                <span>✓</span>
                Home & Office
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE */}

      <section className="why-section">

        <div className="why-heading">

          <div>
            <p className="eyebrow dark">
              WHY CHOOSE US
            </p>

            <h2>
              Quality Carpenter Work For
              <br />
              Your Home & Business
            </h2>
          </div>

          <p className="why-text">
            From custom beds and wardrobes to furniture
            repair and wooden work, we focus on quality,
            practical designs and customer requirements.
          </p>

        </div>

        <div className="why-grid">

          <article className="why-card">
            <div className="why-icon">01</div>
            <h3>Custom Work</h3>
            <p>
              Furniture made according to your size,
              space and requirement.
            </p>
          </article>

          <article className="why-card">
            <div className="why-icon">02</div>
            <h3>Quality Work</h3>
            <p>
              Professional finishing with attention to
              design and durability.
            </p>
          </article>

          <article className="why-card">
            <div className="why-icon">03</div>
            <h3>Direct Contact</h3>
            <p>
              Contact directly through phone or
              WhatsApp for your requirement.
            </p>
          </article>

        </div>

      </section>

      {/* SERVICES */}

      <section className="services-home">

        <div className="section-title">
          <p>OUR SERVICES</p>

          <h2>
            Carpenter Services For Your Needs
          </h2>

          <span>
            Explore our professional carpenter and
            furniture services.
          </span>
        </div>

        {services.length === 0 ? (
          <div className="empty-state">
            Services will be added soon.
          </div>
        ) : (
          <div className="services-home-grid">

            {services.map((service, index) => (
              <article
                className="service-home-card"
                key={service._id}
              >
                <div className="service-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3>{service.title}</h3>

                <p>
                  {service.description}
                </p>

                <strong>
                  {service.price}
                </strong>

                <Link to="/get-quote">
                  Request Quote →
                </Link>
              </article>
            ))}

          </div>
        )}

        <div className="section-button">
          <Link
            to="/services"
            className="button button-primary"
          >
            View All Services
          </Link>
        </div>

      </section>

      {/* GALLERY */}

      <section className="work-section">

        <div className="section-title">
          <p>OUR WORK</p>

          <h2>
            Recent Carpenter Work
          </h2>

          <span>
            Take a look at some of our recent
            furniture projects.
          </span>
        </div>

        {gallery.length === 0 ? (
          <div className="empty-state">
            Recent work photos will be added soon.
          </div>
        ) : (
          <div className="work-grid">

            {gallery.map((item) => (
              <article
                className="work-card"
                key={item._id}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                />

                <div className="work-info">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}

          </div>
        )}

        <div className="section-button">
          <Link
            to="/gallery"
            className="button button-primary"
          >
            View Full Gallery
          </Link>
        </div>

      </section>

      {/* CTA */}

      <section className="home-bottom-cta">

        <p>
          HAVE A PROJECT IN MIND?
        </p>

        <h2>
          Let's Build Something Great
          For Your Home
        </h2>

        <span>
          Tell us your requirement and get your
          free quote today.
        </span>

        <div className="cta-actions">
          <Link
            to="/get-quote"
            className="button button-primary"
          >
            Get Free Quote
          </Link>

          <a
            href={`https://wa.me/91${whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="button button-light"
          >
            WhatsApp
          </a>
        </div>

      </section>
    </>
  );
}

export default Home;