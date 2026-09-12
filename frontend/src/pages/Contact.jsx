import { useEffect, useState } from "react";

function Contact() {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBusiness = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/business"
        );

        const data = await response.json();

        if (response.ok) {
          setBusiness(data.business);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBusiness();
  }, []);

  if (loading) {
    return (
      <div className="loading-box">
        Loading contact information...
      </div>
    );
  }

  const phone =
    business?.phone || "9931697178";

  const whatsapp = (
    business?.whatsapp || "9931697178"
  ).replace(/\D/g, "");

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <p>CONTACT US</p>

          <h1>Let's Discuss Your Furniture Requirement</h1>

          <span>
            Call, WhatsApp or send us your requirement.
          </span>
        </div>
      </section>

      <section className="public-section">
        <div className="contact-premium-grid">
          <article className="contact-premium-card">
            <div className="contact-icon">01</div>

            <h3>Call Us</h3>

            <p>
              Speak directly with us about your work.
            </p>

            <a href={`tel:${phone}`}>
              {phone}
            </a>
          </article>

          <article className="contact-premium-card">
            <div className="contact-icon">02</div>

            <h3>WhatsApp</h3>

            <p>
              Send your furniture requirement directly.
            </p>

            <a
              href={`https://wa.me/91${whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              Chat on WhatsApp
            </a>
          </article>

          <article className="contact-premium-card">
            <div className="contact-icon">03</div>

            <h3>Our Location</h3>

            <p>{business?.address}</p>

            <span>
              {business?.city}
              {business?.city && business?.state
                ? ", "
                : ""}
              {business?.state}
            </span>
          </article>
        </div>

        {business?.mapLink && (
          <div className="contact-map-box">
            <div>
              <p className="section-label">
                FIND US
              </p>

              <h2>
                Visit Us On Google Maps
              </h2>
            </div>

            <a
              href={business.mapLink}
              target="_blank"
              rel="noreferrer"
              className="button button-primary"
            >
              Open Google Maps
            </a>
          </div>
        )}
      </section>
    </>
  );
}

export default Contact;