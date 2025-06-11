export function sortCourses(courses) {
    const sortedCourses = [...courses].sort((a, b) => {
        const dateA = new Date(a.createdAt); // Chuyển đổi chuỗi ngày thành đối tượng Date
        const dateB = new Date(b.createdAt); // Chuyển đổi chuỗi ngày thành đối tượng Date

        // So sánh các đối tượng Date theo thứ tự từ gần nhất đến xa nhất
        return dateB - dateA;
    });

    return sortedCourses;
}
