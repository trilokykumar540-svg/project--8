import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await fetch(
          "/api/business"
        );

        const data = await response.json();

        if (response.ok) {
          setBusiness(data.business);
        }
      } catch (error) {
        console.error("Footer error:", error);
      }
    };

    fetchBusiness();
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

  const address =
    business?.address || "Sonpurwa";

  const city = business?.city || "";
  const state = business?.state || "";

  return (
    <footer className="premium-footer">

      <div className="footer-main">

        {/* BUSINESS */}

        <div className="footer-brand">

          <div className="footer-logo">
            <span>Wood</span>Magic
          </div>

          <p>
            Professional carpenter and custom furniture
            services for your home and business.
          </p>

          <div className="footer-mini-contact">
            <a href={`tel:${phone}`}>
              ☎ {phone}
            </a>

            <a
              href={`https://wa.me/91${whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>

        </div>

        {/* QUICK LINKS */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/get-quote">Get Quote</Link>

        </div>

        {/* SERVICES */}

        <div className="footer-column">

          <h3>Our Services</h3>

          <Link to="/services">
            Custom Furniture
          </Link>

          <Link to="/services">
            Bed Making
          </Link>

          <Link to="/services">
            Wardrobe Work
          </Link>

          <Link to="/services">
            Furniture Repair
          </Link>

          <Link to="/services">
            Door & Window Work
          </Link>

        </div>

        {/* CONTACT */}

        <div className="footer-column footer-contact">

          <h3>Contact Us</h3>

          <div className="footer-contact-item">
            <span>Phone</span>

            <a href={`tel:${phone}`}>
              {phone}
            </a>
          </div>

          <div className="footer-contact-item">
            <span>WhatsApp</span>

            <a
              href={`https://wa.me/91${whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              Chat With Us
            </a>
          </div>

          <div className="footer-contact-item">
            <span>Address</span>

            <p>
              {address}

              {(city || state) && (
                <>
                  <br />
                  {city}
                  {city && state ? ", " : ""}
                  {state}
                </>
              )}
            </p>
          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="footer-bottom">

        <div className="footer-bottom-inner">

          <p>
            © {new Date().getFullYear()} {businessName}.
            All Rights Reserved.
          </p>

          <p>
            Professional Carpenter & Furniture Services
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;