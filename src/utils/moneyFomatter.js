export function formatMoney(amount) {
    if (isNaN(amount)) {
        return '';
    }
    const formattedAmount = Number(amount).toLocaleString('vi-VN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    return `đ ${formattedAmount}`; 
}