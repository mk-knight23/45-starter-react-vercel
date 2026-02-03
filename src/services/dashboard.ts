/**
 * Mock Dashboard Service
 */

import { mockRequest, ApiResponse } from './api';

export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  activeSubscriptions: number;
  conversionRate: number;
}

export interface ChartData {
  name: string;
  value: number;
  change?: number;
}

export const dashboardService = {
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    return mockRequest({
      totalUsers: 12453,
      totalRevenue: 84750,
      activeSubscriptions: 3847,
      conversionRate: 3.2,
    });
  },

  async getRevenueData(): Promise<ApiResponse<ChartData[]>> {
    return mockRequest([
      { name: 'Jan', value: 4000, change: 12 },
      { name: 'Feb', value: 3000, change: -8 },
      { name: 'Mar', value: 5000, change: 24 },
      { name: 'Apr', value: 4500, change: 16 },
      { name: 'May', value: 6000, change: 33 },
      { name: 'Jun', value: 7500, change: 41 },
    ]);
  },

  async getUserGrowthData(): Promise<ApiResponse<ChartData[]>> {
    return mockRequest([
      { name: 'Jan', value: 800, change: 5 },
      { name: 'Feb', value: 1200, change: 15 },
      { name: 'Mar', value: 1800, change: 28 },
      { name: 'Apr', value: 2100, change: 22 },
      { name: 'May', value: 2800, change: 35 },
      { name: 'Jun', value: 3500, change: 42 },
    ]);
  },
};
