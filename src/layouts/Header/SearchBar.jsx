import './Header.scss';
import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './stylesSearch';

const SearchBar = () => {
    const { t } = useTranslation('header');
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);

    const loadAllCourses = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/courses/categorycourse');
            const data = res.data.data;
            const allCourse = data.flatMap(category => category.courseCategories);
            setCourses(allCourse);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        loadAllCourses();
    }, []);

    useEffect(() => {
        const normalizedSearchTerm = searchTerm
            .trim()
            .replace(/\s+/g, ' ')
        if (normalizedSearchTerm) {
            const matches = courses.filter(course =>
                course.name.toLowerCase().includes(normalizedSearchTerm.toLowerCase())
            );
            setFilteredCourses(matches);
        } else {
            setFilteredCourses([]);
        }
    }, [searchTerm, courses]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const highlightText = (text) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ? (
                <span key={index} style={{ color: 'red', fontWeight: 'bold' }}>
                    {part}
                </span>
            ) : part
        );
    };

    const handleSearchClick = () => {
        const normalizedSearchTerm = searchTerm
            .trim()
            .replace(/\s+/g, ' ')
        if (normalizedSearchTerm.length > 0) {
            navigate(`/search?query=${normalizedSearchTerm}`);
        }
        setSearchTerm('');
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`);
        setSearchTerm('');
    };

    return (
        <div className="navbar-search" style={styles.searchContainer}>
            <button className="search-button" onClick={handleSearchClick} >
                <IconSearch stroke={2} />
            </button>
            <input
                type="text"
                placeholder={t('header1')}
                className="search-input"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            {filteredCourses.length > 0 && (
                <ul className="course-suggestions" style={styles.courseSuggestions}>
                    {filteredCourses.map((course, index) => (
                        <li key={index} className="course-item" style={styles.courseItem}
                            onClick={() => handleCourseClick(course.courseId)}
                        >
                            <img src={course.thumbnail} alt={course.name} style={styles.courseImage} />
                            <span>{highlightText(course.name)}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;