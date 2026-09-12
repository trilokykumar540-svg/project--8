import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Services() {
  const [services, setServices] = useState([]);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [serviceRes, businessRes] =
          await Promise.all([
            fetch("http://localhost:5000/api/services"),
            fetch("http://localhost:5000/api/business"),
          ]);

        const serviceData = await serviceRes.json();
        const businessData = await businessRes.json();

        if (serviceRes.ok) {
          setServices(serviceData.services || []);
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
          <p>OUR SERVICES</p>

          <h1>
            Professional Carpenter & Furniture Services
          </h1>

          <span>
            Choose the service you need and contact us
            directly for your requirement.
          </span>
        </div>
      </section>

      <section className="public-section">
        {loading ? (
          <div className="loading-box">
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="empty-state">
            Services will be added soon.
          </div>
        ) : (
          <div className="public-service-grid">
            {services.map((service, index) => (
              <article
                className="public-service-card"
                key={service._id}
              >
                <div className="service-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h2>{service.title}</h2>

                <p>{service.description}</p>

                <strong>{service.price}</strong>

                <div className="card-actions">
                  <Link
                    to="/get-quote"
                    className="small-primary-btn"
                  >
                    Get Quote
                  </Link>

                  <a
                    href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                      `Hello, mujhe ${service.title} service ke baare me jankari chahiye.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="small-outline-btn"
                  >
                    WhatsApp
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

export default Services;