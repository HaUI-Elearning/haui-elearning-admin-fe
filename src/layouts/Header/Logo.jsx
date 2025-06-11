import './Header.scss';
import LogoImage from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar-logo">
            <img src={LogoImage} alt="Logo" className="logo" onClick={() => navigate('/')} />
        </div>
    );
};

export default Logo;