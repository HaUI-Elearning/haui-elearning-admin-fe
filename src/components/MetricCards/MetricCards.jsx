import React from 'react';
import { formatCurrency } from '../../utils/utils';

const MetricCard = ({ icon, title, value, subtitle, trend }) => (
  <div className="metric-card">
    <div className="card-icon">{icon}</div>
    <div className="card-content">
      <h3>{title}</h3>
      <p className="value">
        {typeof value === 'number' && title.includes('Revenue')  // Updated condition
          ? formatCurrency(value) 
          : value}
      </p>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {trend && <span className={`trend ${trend.includes('+') ? 'up' : 'down'}`}>{trend}</span>}
    </div>
  </div>
);

export const MetricCards = ({ data }) => (
  <div className="metric-grid">
    <MetricCard 
      icon="💰" 
      title="Monthly Revenue"  // Translated
      value={data?.revenueMonth} 
      trend="+12%"
    />
    <MetricCard 
      icon="👥" 
      title="Total Users"  // Translated
      value={data?.totalUsers} 
      subtitle={`+${data?.newUsersCount} new`}  // Translated
    />
    <MetricCard 
      icon="🛒" 
      title="Total Orders"  // Translated
      value={data?.totalOrders}
    />
    <MetricCard 
      icon="👨‍🏫" 
      title="Instructors"  // Translated
      value={data?.TotalTeachers} 
      subtitle={`${data?.newTeachersCount} new`}  // Translated
    />
  </div>
);