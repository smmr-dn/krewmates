import { Outlet, Link } from "react-router-dom";
import "./App.css";

const Layout = () => {
  return (
    <>
      <nav>
        <div className="menu-list">
          <ul>
            <li className="create-link" key="create-button">
              <Link to="/create">Add Krewmate</Link>
            </li>
            <li className="gallery-link" key="gallery-button">
              <Link to="/gallery">Krew Gallery</Link>
            </li>
            <li className="home-link" key="home-button">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">
                <img id="logo-image" src="../src/img/gamer.png" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
