// src/types/common.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}