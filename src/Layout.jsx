import { Outlet, Link } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";

const Layout = () => {
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);

  const [background, setBackground] = useState("transparent");

  const listenScrollEvent = (e) => {
    if ((window.scrollY > 10) & (window.scrollY < 40)) {
      setBackground("scroll");
    }
    if (window.scrollY > 40) {
      setBackground("middle-scroll");
    } else {
      setBackground("transparent");
    }
  };
  return (
    <>
      <nav>
        <div className="menu-list">
          <ul className={`navbar-${background}`}>
            <li>
              <Link to="/">
                <img id="logo-image" src="../src/img/gamer.png" />
              </Link>
            </li>
            <li className="home-link" key="home-button">
              <Link to="/">Home</Link>
            </li>
            <li className="create-link" key="create-button">
              <Link to="/create">Add Krewmate</Link>
            </li>
            <li className="gallery-link" key="gallery-button">
              <Link to="/gallery">Krew Gallery</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
