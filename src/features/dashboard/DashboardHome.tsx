/**
 * Dashboard Home Page
 * Shows overview stats and charts
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { dashboardService } from '../../services';

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

export function DashboardHome() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    activeSubscriptions: 0,
    conversionRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const response = await dashboardService.getStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
      setIsLoading(false);
    };

    loadStats();
  }, []);

  const statCards: StatCard[] = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+12.5%',
      isPositive: true,
      icon: Users,
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+8.2%',
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: 'Active Subscriptions',
      value: stats.activeSubscriptions.toLocaleString(),
      change: '+5.3%',
      isPositive: true,
      icon: Activity,
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      change: '-2.1%',
      isPositive: false,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-black text-gray-900">{isLoading ? '...' : stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Mock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Revenue Trend</h3>
              <p className="text-sm text-gray-500">Monthly revenue for last 6 months</p>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {[40, 30, 50, 45, 60, 75].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex-1 bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t-xl relative group"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
                  ${(height * 1000).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500 px-4">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </motion.div>

        {/* User Growth Chart Mock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">User Growth</h3>
              <p className="text-sm text-gray-500">New users per month</p>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {[20, 35, 45, 55, 70, 85].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex-1 bg-gradient-to-t from-emerald-600 to-teal-600 rounded-t-xl relative group"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded">
                  {height * 10}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500 px-4">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Mock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-gray-200 p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { user: 'John Doe', action: 'upgraded to Pro plan', time: '2 minutes ago', color: 'bg-green-100 text-green-700' },
            { user: 'Sarah Smith', action: 'completed onboarding', time: '15 minutes ago', color: 'bg-blue-100 text-blue-700' },
            { user: 'Mike Johnson', action: 'updated payment method', time: '1 hour ago', color: 'bg-purple-100 text-purple-700' },
            { user: 'Emily Brown', action: 'joined the waitlist', time: '2 hours ago', color: 'bg-orange-100 text-orange-700' },
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {activity.user.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {activity.user} <span className="text-gray-500 font-normal">{activity.action}</span>
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${activity.color}`}>
                New
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
