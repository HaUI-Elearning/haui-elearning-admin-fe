// utils.js
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(value);
};

export const chartColors = {
  green: '#4CAF50',
  red: '#F44336',
  yellow: '#FFC107',
  blue: '#2196F3',
  teal: '#009688'
};