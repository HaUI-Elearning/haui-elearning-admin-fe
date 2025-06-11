import './Footer.scss'
import Logo from '../../assets/images/logo2.png'
import '../../i18n';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { IconWorld } from '@tabler/icons-react';
const Footer = () => {
  const { t } = useTranslation('footer')
  const { i18n } = useTranslation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setDropdownVisible(false); // Ẩn dropdown sau khi chọn ngôn ngữ
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Udemy Business</h3>
          <ul>
            <li>{t('footer1')}</li>
            <li>{t('footer2')}</li>
            <li>{t('footer3')}</li>
            <li>{t('footer4')}</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>{t('footer5')}</h3>
          <ul>
            <li>{t('footer6')}</li>
            <li>{t('footer7')}</li>
            <li>{t('footer8')}</li>
            <li>{t('footer9')}</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>{t('footer10')}</h3>
          <ul>
            <li>{t('footer11')}</li>
            <li>{t('footer12')}</li>
            <li>{t('footer13')}</li>
            <li>{t('footer14')}</li>
          </ul>
        </div>
        <div className="footer-right">
          <button className="language-btn" onClick={toggleDropdown}>
          <IconWorld stroke={2} style={{width: '24px', height: '24px',stroke: '#000',  strokefill: 'none', strokeWidth: '1.8px',marginRight:'2px',marginBottom:'-6px' }} /> {i18n.language === 'vi' ? 'Tiếng Việt' : 'English'}
          </button>

          {dropdownVisible && (
            <div className="language-dropdown">
              <button onClick={() => changeLanguage('vi')}> Tiếng Việt</button>
              <button onClick={() => changeLanguage('en')}> English</button>
            </div>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-logo">
          <img src={Logo} alt="Udemy Logo" />
        </div>
        <div className="footer-copyright">
          © 2024 Udemy, Inc.
        </div>
      </div>
    </footer>

  )
}
export default Footer