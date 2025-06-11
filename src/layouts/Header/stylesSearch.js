// styles.js
const styles = {
    searchContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    searchButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    searchInput: {
        padding: '8px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginLeft: '8px',
    },
    courseSuggestions: {
        position: 'absolute',
        zIndex: 1,
        fontSize: '18px',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        maxHeight: '300px',
        overflowY: 'auto',
        top: '60px',
        width: '600px',
    },
    courseItem: {
        padding: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    courseImage: {
        width: '40px',
        height: '40px',
        marginRight: '10px',
    },
};

export default styles;