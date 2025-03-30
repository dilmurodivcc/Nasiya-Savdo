import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LOGO.svg";
import user from "../assets/icons/username.svg";
import password from "../assets/icons/password.svg";
import eyeOpen from "../assets/icons/eye-open.svg";
import eyeClose from "../assets/icons/eye-close.svg";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const navigate = useNavigate();
  const { loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsError(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsError(false);

    try {
      await loginMutation.mutateAsync({
        login: formData.username,
        hashed_password: formData.password,
      });
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Xatolik yuz berdi. Iltimos qayta urinib ko'ring."
      );
      setIsError(true);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className={`input-container ${isError ? "error" : ""}`}>
              <img src={user} alt="user" className="user-icon" />
              <input
                type="text"
                placeholder="Login"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className={`input-container ${isError ? "error" : ""}`}>
              <img src={password} alt="password" className="password-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Parol"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <img
                className="eye-icon"
                src={showPassword ? eyeClose : eyeOpen}
                alt="eye-open"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="error-container">
              {error && <p className="error-message">{error}</p>}
              <a className="forgot-password" href="#">
                Parolni unutdingizmi?
              </a>
            </div>
            <button type="submit">Kirish</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
