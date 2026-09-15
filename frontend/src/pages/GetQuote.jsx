import { useEffect, useState } from "react";
import { API_URL } from "../config/api";

function GetQuote() {
  const [business, setBusiness] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    service: "",
    requirement: "",
    preferredDate: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/business`
        );

        const data = await response.json();

        if (response.ok) {
          setBusiness(data.business);
        }
      } catch (error) {
        console.error(
          "Business info error:",
          error
        );
      }
    };

    fetchBusiness();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
    setMessageType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setMessageType("");

    if (!formData.name.trim()) {
      setMessage("Please enter your full name.");
      setMessageType("error");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setMessage(
        "Please enter a valid 10-digit mobile number."
      );
      setMessageType("error");
      return;
    }

    if (!formData.location.trim()) {
      setMessage("Please enter your location.");
      setMessageType("error");
      return;
    }

    if (!formData.service) {
      setMessage("Please select a service.");
      setMessageType("error");
      return;
    }

    if (!formData.requirement.trim()) {
      setMessage(
        "Please tell us about your requirement."
      );
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/enquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to submit enquiry."
        );
      }

      setMessage(
        "Thank you! Your enquiry has been submitted successfully. We will contact you soon."
      );

      setMessageType("success");

      setFormData({
        name: "",
        phone: "",
        location: "",
        service: "",
        requirement: "",
        preferredDate: "",
      });
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const businessName =
    business?.businessName || "WoodMagic";

  const phone =
    business?.phone || "9931697178";

  const whatsapp = (
    business?.whatsapp || "9931697178"
  ).replace(/\D/g, "");

  return (
    <>
      <section className="page-hero quote-page-hero">
        <div className="page-hero-content">
          <p>GET FREE QUOTE</p>

          <h1>
            Tell Us About Your Carpenter Requirement
          </h1>

          <span>
            Share your requirement and we will get in
            touch with you directly.
          </span>
        </div>
      </section>

      <section className="professional-quote-section">
        <div className="professional-quote-container">

          {/* LEFT SIDE */}

          <div className="quote-information-panel">
            <p className="quote-label">
              REQUEST A QUOTE
            </p>

            <h2>
              Let's Discuss Your Furniture Project
            </h2>

            <p className="quote-intro">
              Need custom furniture, repair work or
              professional carpenter service? Send us
              your details and {businessName} will
              contact you regarding your requirement.
            </p>

            <div className="quote-benefits">
              <div className="quote-benefit-item">
                <div className="quote-benefit-number">
                  01
                </div>

                <div>
                  <h3>Tell Us Your Requirement</h3>
                  <p>
                    Share the type of carpenter or
                    furniture work you need.
                  </p>
                </div>
              </div>

              <div className="quote-benefit-item">
                <div className="quote-benefit-number">
                  02
                </div>

                <div>
                  <h3>Direct Contact</h3>
                  <p>
                    We will contact you directly by
                    phone or WhatsApp.
                  </p>
                </div>
              </div>

              <div className="quote-benefit-item">
                <div className="quote-benefit-number">
                  03
                </div>

                <div>
                  <h3>Discuss The Work</h3>
                  <p>
                    Discuss design, requirement, price
                    and other work details.
                  </p>
                </div>
              </div>
            </div>

            <div className="quote-direct-contact">
              <p className="direct-title">
                Prefer Direct Contact?
              </p>

              <div className="direct-contact-buttons">
                <a
                  href={`tel:${phone}`}
                  className="quote-call-button"
                >
                  Call {phone}
                </a>

                <a
                  href={`https://wa.me/91${whatsapp}?text=${encodeURIComponent(
                    `Hello ${businessName}, mujhe carpenter work ke baare me jankari chahiye.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="quote-whatsapp-button"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}

          <div className="professional-quote-form">
            <div className="quote-form-heading">
              <p>FREE ESTIMATE</p>

              <h2>Request Your Quote</h2>

              <span>
                Fields marked with * are required.
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="quote-form-row">
                <div className="quote-field">
                  <label>
                    Full Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="quote-field">
                  <label>
                    Mobile Number
                    <span>*</span>
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="quote-form-row">
                <div className="quote-field">
                  <label>
                    Location
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="City / locality"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="quote-field">
                  <label>
                    Service
                    <span>*</span>
                  </label>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select a service
                    </option>

                    <option value="Bed Making">
                      Bed Making
                    </option>

                    <option value="Wardrobe Work">
                      Wardrobe Work
                    </option>

                    <option value="Table & Chair">
                      Table & Chair
                    </option>

                    <option value="Door & Window">
                      Door & Window
                    </option>

                    <option value="Furniture Repair">
                      Furniture Repair
                    </option>

                    <option value="Custom Furniture">
                      Custom Furniture
                    </option>

                    <option value="Other Carpenter Work">
                      Other Carpenter Work
                    </option>
                  </select>
                </div>
              </div>

              <div className="quote-field">
                <label>
                  Tell Us About Your Requirement
                  <span>*</span>
                </label>

                <textarea
                  name="requirement"
                  placeholder="Example: I need a custom wardrobe for my bedroom. Approx size is..."
                  value={formData.requirement}
                  onChange={handleChange}
                />
              </div>

              <div className="quote-field">
                <label>
                  Preferred Work Date
                  <small> Optional</small>
                </label>

                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                />
              </div>

              {message && (
                <div
                  className={`quote-message ${messageType}`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="professional-submit-button"
                disabled={loading}
              >
                {loading
                  ? "Submitting Your Request..."
                  : "Submit Quote Request"}
              </button>

              <p className="quote-form-note">
                By submitting this form, you are
                requesting {businessName} to contact
                you regarding your carpenter work.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default GetQuote;