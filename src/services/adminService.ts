import { apiRequest, uploadFile } from './api';
import { ApiResponse, IAudio, IBanner, ICategory, ISettings } from '@/types';
import { API_BASE_URL } from '@/constants/config';
import { getAuthToken } from '@/utils/auth';

export const adminService = {
  async getDashboardStats(): Promise<ApiResponse<any>> {
    return apiRequest('/admin/dashboard');
  },

  async getCategories(): Promise<ApiResponse<ICategory[]>> {
    return apiRequest('/admin/categories');
  },

  async createCategory(payload: { name: string; description?: string }): Promise<ApiResponse<ICategory>> {
    return apiRequest('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateCategory(id: string, payload: { name: string; description?: string }): Promise<ApiResponse<ICategory>> {
    return apiRequest(`/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteCategory(id: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/categories/${id}`, {
      method: 'DELETE',
    });
  },

  async getAudios(): Promise<ApiResponse<IAudio[]>> {
    return apiRequest('/admin/audios');
  },

  async createAudio(payload: Partial<IAudio>): Promise<ApiResponse<IAudio>> {
    return apiRequest('/admin/audios', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateAudio(id: string, payload: Partial<IAudio>): Promise<ApiResponse<IAudio>> {
    return apiRequest(`/admin/audios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteAudio(id: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/audios/${id}`, {
      method: 'DELETE',
    });
  },

  async getBanners(): Promise<ApiResponse<IBanner[]>> {
    return apiRequest('/admin/banners');
  },

  async createBanner(payload: Partial<IBanner>): Promise<ApiResponse<IBanner>> {
    return apiRequest('/admin/banners', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async updateBanner(id: string, payload: Partial<IBanner>): Promise<ApiResponse<IBanner>> {
    return apiRequest(`/admin/banners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async deleteBanner(id: string): Promise<ApiResponse<void>> {
    return apiRequest(`/admin/banners/${id}`, {
      method: 'DELETE',
    });
  },

  async getSettings(): Promise<ApiResponse<ISettings>> {
    return apiRequest('/admin/settings');
  },

  async updateSettings(payload: Partial<ISettings>): Promise<ApiResponse<ISettings>> {
    return apiRequest('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  uploadFile(
    file: File,
    type: 'image' | 'audio',
    onProgress?: (percent: number) => void
  ): Promise<ApiResponse<{ url: string }>> {
    return uploadFile(file, type, onProgress) as any;
  }
};
