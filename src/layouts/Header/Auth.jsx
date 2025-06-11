import "./Header.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import MenuUser from "../../components/User/MenuUser";
import { useNavigate } from "react-router-dom";

const AuthButtons = () => {
  const { t } = useTranslation("header");
  const isLogin = useSelector((state) => !!state.user.accessToken);
  const navigate = useNavigate();
  return (
    <div>
      {isLogin ? (
        <MenuUser />
      ) : (
        <div className="navbar-buttons">
          <button className="login-button" onClick={() => navigate("/signIn")}>
            {t("header2")}
          </button>
          <button className="signup-button" onClick={() => navigate("/signUp")}>
            {t("header3")}
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
