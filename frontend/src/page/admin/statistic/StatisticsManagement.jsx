import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TbCurrencyDong } from "react-icons/tb";
import { FaShoppingCart, FaUsers, FaBoxOpen } from "react-icons/fa";
import { BiTrendingUp, BiTrendingDown } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";
import axios from 'axios';
import { SummaryApi } from '../../../common';

const StatisticsManagement = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    overview: [],
    revenueData: [],
    topProducts: [],
    categoryData: [],
    orderStatusData: []
  });

  // Icon mapping
  const iconMap = {
    'Tổng doanh thu': <MdAttachMoney className="text-3xl" />,
    'Đơn hàng': <FaShoppingCart className="text-3xl" />,
    'Khách hàng mới': <FaUsers className="text-3xl" />,
    'Sản phẩm bán ra': <FaBoxOpen className="text-3xl" />
  };

  const colorMap = {
    'Tổng doanh thu': 'bg-blue-500',
    'Đơn hàng': 'bg-green-500',
    'Khách hàng mới': 'bg-purple-500',
    'Sản phẩm bán ra': 'bg-orange-500'
  };

  // Fetch statistics data
  useEffect(() => {
    fetchStatistics();
  }, [timeRange, selectedYear]);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${SummaryApi.statistics.all.url}`,
        {
          params: {
            timeRange,
            year: selectedYear
          },
          withCredentials: true
        }
      );

      setStatsData(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Thống kê doanh thu</h1>
          <p className="text-gray-500 text-sm mt-1">Tổng quan hiệu suất kinh doanh</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">7 ngày qua</option>
            <option value="month">30 ngày qua</option>
            <option value="year">Năm nay</option>
          </select>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
          </select>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.overview.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-gray-500 text-sm mb-2">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-1">
                  {stat.title === 'Tổng doanh thu' && <TbCurrencyDong className="text-xl" />}
                  {formatCurrency(stat.value)}
                </h3>
                <div className={`flex items-center gap-1 mt-2 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <BiTrendingUp /> : <BiTrendingDown />}
                  <span className="text-sm font-medium">{stat.change}</span>
                  <span className="text-gray-400 text-xs">so với kỳ trước</span>
                </div>
              </div>
              <div className={`${colorMap[stat.title]} text-white p-3 rounded-lg`}>
                {iconMap[stat.title]}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Biểu đồ doanh thu */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Biểu đồ doanh thu</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={statsData.revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip 
                formatter={(value) => [`${formatCurrency(value)} đ`, 'Doanh thu']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Trạng thái đơn hàng */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Trạng thái đơn hàng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statsData.orderStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statsData.orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {statsData.orderStatusData.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Doanh thu theo danh mục và sản phẩm bán chạy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Doanh thu theo danh mục */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Doanh thu theo danh mục</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statsData.categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => `${value / 1000000}M`} />
              <Tooltip 
                formatter={(value) => [`${formatCurrency(value)} đ`, 'Doanh thu']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                {statsData.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sản phẩm bán chạy */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Top 5 sản phẩm bán chạy</h2>
          <div className="space-y-4">
            {statsData.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
                    <p className="text-xs text-gray-500">Đã bán: {product.sold} sản phẩm</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600 flex items-center">
                    <TbCurrencyDong className="text-lg" />
                    {formatCurrency(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Biểu đồ đơn hàng và khách hàng */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Đơn hàng & Khách hàng mới</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={statsData.revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} name="Đơn hàng" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={2} name="Khách hàng mới" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatisticsManagement;