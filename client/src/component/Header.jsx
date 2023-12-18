import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const Header = ({ isLogged }) => {
  const navigate = useNavigate()

  const handleCreateButtonClick = () => {
    console.log("/create");
    navigate("/create", {replace: true});
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-primary blue-item">
      <div className="container-fluid mx-4">
        <Link to="/" className="navbar-brand">
          Tech Trip Diaries
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {isLogged && (
              <li>
                <form action="/newBlog" method="post">
                  <button
                    type="submit"
                    className="btn btn-outline-success"
                    onClick={(event) => {
                      console.log("Create a new blog ....");
                      handleCreateButtonClick();
                      event.preventDefault();
                    }}
                  >
                    Create
                  </button>
                </form>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
