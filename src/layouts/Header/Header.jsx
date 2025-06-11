import './Header.scss';
import Logo from './Logo';
import '../../i18n';
import CategoryItem from './Category';
import SearchBar from './SearchBar';
import FavoriteIcon from './Favorite';
import CartIcon from './Cart';
import AuthButtons from './Auth';
import TeacherAccess from './TeacherAccess';

const Header = () => {
    return (
        <nav className="navbar">
            <Logo />
            <CategoryItem />
            <SearchBar />
            <TeacherAccess/>
            <FavoriteIcon />
            <CartIcon />
            <AuthButtons />
        </nav>
    );
};

export default Header;