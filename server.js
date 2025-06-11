import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Lấy tất cả danh mục và sản phẩm của nó
server.get('/allcourse', (req, res) => {
    const courseCategories = router.db.get('courseCategories').value();
    const categories = router.db.get('categories').value();
    const courses = router.db.get('courses').value();

    const result = categories.map(category => {
        const courseIds = courseCategories
            .filter(item => item.categoryId === category.id)
            .map(item => item.courseId);

        const categoryCourses = courses.filter(course => courseIds.includes(course.id));

        return {
            idCategory: category.id,
            category: category.name,
            courses: categoryCourses
        };
    });

    res.json(result);
});

// Lấy danh mục theo id với các bộ lọc
server.get('/category/:idCategory', (req, res) => {
    const { idCategory } = req.params;
    const { sort, price = [], duration = [], rating } = req.query;
    const courseCategories = router.db.get('courseCategories').value();
    const categories = router.db.get('categories').value();
    const courses = router.db.get('courses').value();
    const category = categories.find(cat => cat.id === parseInt(idCategory));

    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    const courseIds = courseCategories
        .filter(item => item.categoryId === category.id)
        .map(item => item.courseId);

    let categoryCourses = courses.filter(course => courseIds.includes(course.id));

    // Bộ lọc theo giá
    if (price.length) {
        categoryCourses = categoryCourses.filter(course => {
            const isFree = price.includes('free') && course.price === '0';
            const isPaid = price.includes('paid') && course.price !== '0';
            return isFree || isPaid;
        });
    }

    if (duration.length) {
        categoryCourses = categoryCourses.filter(course => {
            const is0to3 = duration.includes('0-3') && course.hour >= 0 && course.hour < 3;
            const is3to6 = duration.includes('3-6') && course.hour >= 3 && course.hour < 6;
            const is6to9 = duration.includes('6-9') && course.hour >= 6 && course.hour < 9;
            const is9to12 = duration.includes('9-12') && course.hour >= 9 && course.hour < 12;
            const is12plus = duration.includes('12+') && course.hour >= 12;

            return is0to3 || is3to6 || is6to9 || is9to12 || is12plus; 
        });
    }

    // Bộ lọc theo đánh giá sao
    if (rating) {
        const ratingNumber = Number(rating);
        categoryCourses = categoryCourses.filter(course => course.star >= ratingNumber);
    }

    // Sắp xếp
    if (sort === 'newest-course') {
        categoryCourses.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === 'highest-rate') {
        categoryCourses.sort((a, b) => b.star - a.star);
    }

    res.json({
        idCategory: category.id,
        category: category.name,
        description: category.description,
        courses: categoryCourses
    });
});

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});
