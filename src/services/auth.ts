/**
 * Mock Authentication Service
 */

import { mockRequest, ApiResponse } from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

const MOCK_USER: User = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  role: 'user',
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    // Simulate API call
    return mockRequest(
      {
        user: MOCK_USER,
        token: 'mock-jwt-token-' + Date.now(),
      },
      credentials.email !== 'demo@example.com' ? 'Invalid credentials' : undefined
    );
  },

  async signup(credentials: SignupCredentials): Promise<ApiResponse<AuthResponse>> {
    // Simulate API call
    return mockRequest({
      user: {
        ...MOCK_USER,
        email: credentials.email,
        name: credentials.name,
      },
      token: 'mock-jwt-token-' + Date.now(),
    });
  },

  async logout(): Promise<ApiResponse<void>> {
    return mockRequest<void>(undefined);
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return mockRequest(MOCK_USER);
  },

  async resetPassword(email: string): Promise<ApiResponse<void>> {
    return mockRequest<void>(undefined);
  },
};
