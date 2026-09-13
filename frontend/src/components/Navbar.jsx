import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="main-navbar">
      <div className="nav-container">

        <Link to="/" className="brand">
       <div className="brand-name">
  <span>Wood</span>Magic
</div>

          <div className="brand-subtitle">
            Custom Furniture • Repair • Wooden Work
          </div>
        </Link>

        <nav className="nav-menu">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          <Link
            to="/get-quote"
            className="nav-quote"
          >
            Get Quote
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;