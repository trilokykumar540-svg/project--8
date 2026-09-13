import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <p>ABOUT WOODMAGIC</p>

          <h1>
            Craftsmanship Built Around Your Needs
          </h1>

          <span>
            Professional carpenter and custom furniture
            work for homes, offices and businesses.
          </span>
        </div>
      </section>

      <section className="about-section">
        <div className="about-grid">

          <div className="about-image-box owner-image-box">
            <img
              src="/owner-photo.jpg"
              alt="Triloky Kumar - Owner of WoodMagic"
              className="about-owner-image"
            />

            <div className="about-image-overlay">
              <strong>Triloky Kumar</strong>
              <span>Owner, WoodMagic</span>
            </div>
          </div>

          <div className="about-content">
            <p className="section-label">
              MEET THE OWNER
            </p>

            <h2>
              Triloky Kumar
              <br />
              Owner of WoodMagic
            </h2>

            <p>
              Triloky Kumar is the owner of WoodMagic
              and works closely with customers to provide
              custom furniture, furniture repair and
              professional wooden work.
            </p>

            <p>
              His focus is simple — understand each
              customer's requirement, provide practical
              solutions and complete every project with
              attention to quality, finishing and durability.
            </p>

            <div className="about-points">
              <div>✓ Custom Furniture</div>
              <div>✓ Furniture Repair</div>
              <div>✓ Home & Office Work</div>
              <div>✓ Direct Customer Contact</div>
            </div>

            <Link
              to="/get-quote"
              className="button button-primary"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="section-title">
          <p>OUR APPROACH</p>
          <h2>What You Can Expect From Us</h2>
        </div>

        <div className="values-grid">

          <article className="value-card">
            <span>01</span>

            <h3>
              Understand Requirement
            </h3>

            <p>
              We first understand your furniture size,
              style, space and requirement.
            </p>
          </article>

          <article className="value-card">
            <span>02</span>

            <h3>
              Practical Solution
            </h3>

            <p>
              We suggest practical furniture and wooden
              work according to your requirement.
            </p>
          </article>

          <article className="value-card">
            <span>03</span>

            <h3>
              Quality Completion
            </h3>

            <p>
              Work is completed with focus on finishing,
              usability and durability.
            </p>
          </article>

        </div>
      </section>
    </>
  );
}

export default About;