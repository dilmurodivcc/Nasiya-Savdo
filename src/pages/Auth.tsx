import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LOGO.svg";
import user from "../assets/icons/username.svg";
import password from "../assets/icons/password.svg";
import eyeOpen from "../assets/icons/eye-open.svg";
import eyeClose from "../assets/icons/eye-close.svg";
const Auth = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="auth">
      <img src={logo} alt="logo" className="overlay-logo" />
      <img src={logo} alt="logo" className="overlay-logo-2" />
      <div className="container">
        <div className="auth-content">
          <img className="logo" src={logo} alt="logo" />
          <h2>Dasturga kirish</h2>
          <p>
            Iltimos, tizimga kirish uchun login va parolingizni <br /> kiriting.
          </p>
          <form>
            <div className="input-container">
              <img src={user} alt="user" className="user-icon" />
              <input type="text" placeholder="Login" />
            </div>
            <div className="input-container">
              <img src={password} alt="password" className="password-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Parol"
              />
              <img
                className="eye-icon"
                src={showPassword ? eyeClose : eyeOpen}
                alt="eye-open"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <a className="forgot-password" href="">Parolni unutdingizmi?</a>
            <button type="submit">Kirish</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
