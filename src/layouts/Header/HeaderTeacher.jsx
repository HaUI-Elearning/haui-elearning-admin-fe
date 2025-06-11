import './HeaderTeacher.scss';
import Logo from './Logo';
import '../../i18n';
import CategoryItem from './Category';
import SearchBar from './SearchBar';
import FavoriteIcon from './Favorite';
import CartIcon from './Cart';
import AuthButtons from './Auth';
import MenuTeacher from '../../components/User/MenuTeacher';
import { useNavigate } from 'react-router-dom';

const HeaderTeacher = () => {
    const navigate = useNavigate();
    const goBack = ()=>{
        navigate('/')
    }
    return (
        <nav className="navbar-teacher">
            <Logo />
            
            <SearchBar />
            <div className="back-home" onClick={goBack}>
                Học Viên
            </div>
            <MenuTeacher/>
            
        </nav>
    );
};

export default HeaderTeacher;