/**
 * Mock API Service Layer
 * Provides simulated backend responses for development
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

export async function delay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function mockRequest<T>(
  data: T,
  errorMessage?: string,
  delayMs: number = 500
): Promise<ApiResponse<T>> {
  await delay(delayMs);

  if (errorMessage) {
    return {
      success: false,
      error: errorMessage,
    };
  }

  return {
    success: true,
    data,
  };
}
