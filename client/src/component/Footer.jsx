import React from 'react';

const Footer = () => {
  return (
    <div className="container blue-item">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-body-primary">© {new Date().getFullYear()} Company, Inc</span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="https://www.linkedin.com/in/renatocrovella/">
              <img src="https://img.icons8.com/fluency/48/linkedin.png" alt="linkedin handle logo" height="35" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="https://github.com/RenatoCrovella">
              <img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" alt="github handle logo" height="35" />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="https://discord.com/channels/1078951494977585253/1078952087741812811">
              <img src="https://img.icons8.com/arcade/64/000000/discord-logo.png" alt="discord handle logo" height="35" />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
