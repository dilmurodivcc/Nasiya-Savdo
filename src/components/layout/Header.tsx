import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/avatar.svg";

const Header = () => {
  return (
    <header className="header-profile">
      <Link className="profile" to="/profile">
        <img src={avatar} alt="" />
        <h3>Dilmurodvcc</h3>
      </Link>
      <Link className="calendar" to="/calendar">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.84615 0C5.02977 0 5.20586 0.0729393 5.33569 0.202772C5.46552 0.332605 5.53846 0.508696 5.53846 0.692308V1.38462H12.4615V0.692308C12.4615 0.508696 12.5345 0.332605 12.6643 0.202772C12.7941 0.0729393 12.9702 0 13.1538 0C13.3375 0 13.5135 0.0729393 13.6434 0.202772C13.7732 0.332605 13.8462 0.508696 13.8462 0.692308V1.38462H15.9231C16.4739 1.38462 17.0022 1.60343 17.3917 1.99293C17.7812 2.38243 18 2.9107 18 3.46154V15.9231C18 16.4739 17.7812 17.0022 17.3917 17.3917C17.0022 17.7812 16.4739 18 15.9231 18H2.07692C1.52609 18 0.997815 17.7812 0.608317 17.3917C0.218818 17.0022 0 16.4739 0 15.9231V3.46154C0 2.9107 0.218818 2.38243 0.608317 1.99293C0.997815 1.60343 1.52609 1.38462 2.07692 1.38462H4.15385V0.692308C4.15385 0.508696 4.22679 0.332605 4.35662 0.202772C4.48645 0.0729393 4.66254 0 4.84615 0ZM12.4615 2.76923V3.46154C12.4615 3.64515 12.5345 3.82124 12.6643 3.95107C12.7941 4.08091 12.9702 4.15385 13.1538 4.15385C13.3375 4.15385 13.5135 4.08091 13.6434 3.95107C13.7732 3.82124 13.8462 3.64515 13.8462 3.46154V2.76923H15.9231C16.1067 2.76923 16.2828 2.84217 16.4126 2.972C16.5424 3.10184 16.6154 3.27793 16.6154 3.46154V5.53846H1.38462V3.46154C1.38462 3.27793 1.45755 3.10184 1.58739 2.972C1.71722 2.84217 1.89331 2.76923 2.07692 2.76923H4.15385V3.46154C4.15385 3.64515 4.22679 3.82124 4.35662 3.95107C4.48645 4.08091 4.66254 4.15385 4.84615 4.15385C5.02977 4.15385 5.20586 4.08091 5.33569 3.95107C5.46552 3.82124 5.53846 3.64515 5.53846 3.46154V2.76923H12.4615ZM1.38462 6.92308V15.9231C1.38462 16.1067 1.45755 16.2828 1.58739 16.4126C1.71722 16.5424 1.89331 16.6154 2.07692 16.6154H15.9231C16.1067 16.6154 16.2828 16.5424 16.4126 16.4126C16.5424 16.2828 16.6154 16.1067 16.6154 15.9231V6.92308H1.38462ZM8.30769 9C8.30769 8.81639 8.38063 8.6403 8.51046 8.51046C8.6403 8.38063 8.81639 8.30769 9 8.30769C9.18361 8.30769 9.3597 8.38063 9.48954 8.51046C9.61937 8.6403 9.69231 8.81639 9.69231 9C9.69231 9.18361 9.61937 9.3597 9.48954 9.48954C9.3597 9.61937 9.18361 9.69231 9 9.69231C8.81639 9.69231 8.6403 9.61937 8.51046 9.48954C8.38063 9.3597 8.30769 9.18361 8.30769 9ZM11.7692 8.30769C11.5856 8.30769 11.4095 8.38063 11.2797 8.51046C11.1499 8.6403 11.0769 8.81639 11.0769 9C11.0769 9.18361 11.1499 9.3597 11.2797 9.48954C11.4095 9.61937 11.5856 9.69231 11.7692 9.69231C11.9528 9.69231 12.1289 9.61937 12.2588 9.48954C12.3886 9.3597 12.4615 9.18361 12.4615 9C12.4615 8.81639 12.3886 8.6403 12.2588 8.51046C12.1289 8.38063 11.9528 8.30769 11.7692 8.30769ZM13.8462 9C13.8462 8.81639 13.9191 8.6403 14.0489 8.51046C14.1788 8.38063 14.3549 8.30769 14.5385 8.30769C14.7221 8.30769 14.8982 8.38063 15.028 8.51046C15.1578 8.6403 15.2308 8.81639 15.2308 9C15.2308 9.18361 15.1578 9.3597 15.028 9.48954C14.8982 9.61937 14.7221 9.69231 14.5385 9.69231C14.3549 9.69231 14.1788 9.61937 14.0489 9.48954C13.9191 9.3597 13.8462 9.18361 13.8462 9ZM14.5385 11.0769C14.3549 11.0769 14.1788 11.1499 14.0489 11.2797C13.9191 11.4095 13.8462 11.5856 13.8462 11.7692C13.8462 11.9528 13.9191 12.1289 14.0489 12.2588C14.1788 12.3886 14.3549 12.4615 14.5385 12.4615C14.7221 12.4615 14.8982 12.3886 15.028 12.2588C15.1578 12.1289 15.2308 11.9528 15.2308 11.7692C15.2308 11.5856 15.1578 11.4095 15.028 11.2797C14.8982 11.1499 14.7221 11.0769 14.5385 11.0769ZM11.0769 11.7692C11.0769 11.5856 11.1499 11.4095 11.2797 11.2797C11.4095 11.1499 11.5856 11.0769 11.7692 11.0769C11.9528 11.0769 12.1289 11.1499 12.2588 11.2797C12.3886 11.4095 12.4615 11.5856 12.4615 11.7692C12.4615 11.9528 12.3886 12.1289 12.2588 12.2588C12.1289 12.3886 11.9528 12.4615 11.7692 12.4615C11.5856 12.4615 11.4095 12.3886 11.2797 12.2588C11.1499 12.1289 11.0769 11.9528 11.0769 11.7692ZM9 11.0769C8.81639 11.0769 8.6403 11.1499 8.51046 11.2797C8.38063 11.4095 8.30769 11.5856 8.30769 11.7692C8.30769 11.9528 8.38063 12.1289 8.51046 12.2588C8.6403 12.3886 8.81639 12.4615 9 12.4615C9.18361 12.4615 9.3597 12.3886 9.48954 12.2588C9.61937 12.1289 9.69231 11.9528 9.69231 11.7692C9.69231 11.5856 9.61937 11.4095 9.48954 11.2797C9.3597 11.1499 9.18361 11.0769 9 11.0769ZM5.53846 11.7692C5.53846 11.5856 5.6114 11.4095 5.74123 11.2797C5.87107 11.1499 6.04716 11.0769 6.23077 11.0769C6.41438 11.0769 6.59047 11.1499 6.7203 11.2797C6.85014 11.4095 6.92308 11.5856 6.92308 11.7692C6.92308 11.9528 6.85014 12.1289 6.7203 12.2588C6.59047 12.3886 6.41438 12.4615 6.23077 12.4615C6.04716 12.4615 5.87107 12.3886 5.74123 12.2588C5.6114 12.1289 5.53846 11.9528 5.53846 11.7692ZM3.46154 11.0769C3.27793 11.0769 3.10184 11.1499 2.972 11.2797C2.84217 11.4095 2.76923 11.5856 2.76923 11.7692C2.76923 11.9528 2.84217 12.1289 2.972 12.2588C3.10184 12.3886 3.27793 12.4615 3.46154 12.4615C3.64515 12.4615 3.82124 12.3886 3.95107 12.2588C4.08091 12.1289 4.15385 11.9528 4.15385 11.7692C4.15385 11.5856 4.08091 11.4095 3.95107 11.2797C3.82124 11.1499 3.64515 11.0769 3.46154 11.0769ZM2.76923 14.5385C2.76923 14.3549 2.84217 14.1788 2.972 14.0489C3.10184 13.9191 3.27793 13.8462 3.46154 13.8462C3.64515 13.8462 3.82124 13.9191 3.95107 14.0489C4.08091 14.1788 4.15385 14.3549 4.15385 14.5385C4.15385 14.7221 4.08091 14.8982 3.95107 15.028C3.82124 15.1578 3.64515 15.2308 3.46154 15.2308C3.27793 15.2308 3.10184 15.1578 2.972 15.028C2.84217 14.8982 2.76923 14.7221 2.76923 14.5385ZM6.23077 13.8462C6.04716 13.8462 5.87107 13.9191 5.74123 14.0489C5.6114 14.1788 5.53846 14.3549 5.53846 14.5385C5.53846 14.7221 5.6114 14.8982 5.74123 15.028C5.87107 15.1578 6.04716 15.2308 6.23077 15.2308C6.41438 15.2308 6.59047 15.1578 6.7203 15.028C6.85014 14.8982 6.92308 14.7221 6.92308 14.5385C6.92308 14.3549 6.85014 14.1788 6.7203 14.0489C6.59047 13.9191 6.41438 13.8462 6.23077 13.8462ZM8.30769 14.5385C8.30769 14.3549 8.38063 14.1788 8.51046 14.0489C8.6403 13.9191 8.81639 13.8462 9 13.8462C9.18361 13.8462 9.3597 13.9191 9.48954 14.0489C9.61937 14.1788 9.69231 14.3549 9.69231 14.5385C9.69231 14.7221 9.61937 14.8982 9.48954 15.028C9.3597 15.1578 9.18361 15.2308 9 15.2308C8.81639 15.2308 8.6403 15.1578 8.51046 15.028C8.38063 14.8982 8.30769 14.7221 8.30769 14.5385ZM11.7692 13.8462C11.5856 13.8462 11.4095 13.9191 11.2797 14.0489C11.1499 14.1788 11.0769 14.3549 11.0769 14.5385C11.0769 14.7221 11.1499 14.8982 11.2797 15.028C11.4095 15.1578 11.5856 15.2308 11.7692 15.2308C11.9528 15.2308 12.1289 15.1578 12.2588 15.028C12.3886 14.8982 12.4615 14.7221 12.4615 14.5385C12.4615 14.3549 12.3886 14.1788 12.2588 14.0489C12.1289 13.9191 11.9528 13.8462 11.7692 13.8462Z"
            fill="#735CD8"
          />
        </svg>
      </Link>
    </header>
  );
};

export default Header;
