import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <p>ABOUT BALAJI CARPENTER</p>
          <h1>Craftsmanship Built Around Your Needs</h1>

          <span>
            Professional carpenter and custom furniture
            work for homes, offices and businesses.
          </span>
        </div>
      </section>

      <section className="about-section">
        <div className="about-grid">
          <div className="about-image-box">
            <div className="about-image-overlay">
              <strong>Quality</strong>
              <span>Craftsmanship</span>
            </div>
          </div>

          <div className="about-content">
            <p className="section-label">
              WHO WE ARE
            </p>

            <h2>
              Reliable Carpenter Work With Attention
              To Every Detail
            </h2>

            <p>
              Balaji Carpenter provides custom furniture,
              repair and wooden work according to customer
              requirements.
            </p>

            <p>
              Our focus is simple — understand the
              customer's requirement, provide practical
              solutions and complete the work with quality
              finishing.
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
            <h3>Understand Requirement</h3>
            <p>
              We first understand your furniture size,
              style, space and requirement.
            </p>
          </article>

          <article className="value-card">
            <span>02</span>
            <h3>Practical Solution</h3>
            <p>
              We suggest practical furniture and wooden
              work according to your requirement.
            </p>
          </article>

          <article className="value-card">
            <span>03</span>
            <h3>Quality Completion</h3>
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