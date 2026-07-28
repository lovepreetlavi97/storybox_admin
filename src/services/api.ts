import { API_BASE_URL } from '@/constants/config';
import { getAuthToken, removeAuthToken } from '@/utils/auth';

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Determine if we're sending JSON or FormData (for file uploads)
  if (options.body && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (response.status === 401) {
    removeAuthToken();
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data as T;
}

export function uploadFile(
  file: File,
  type: 'image' | 'audio',
  onProgress?: (percent: number) => void
): Promise<{ success: boolean; data?: { url: string }; error?: string }> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    const token = getAuthToken();

    // Use absolute backend URL directly if we are on HTTP, otherwise use relative proxy to avoid Mixed Content
    const uploadBaseUrl = typeof window !== 'undefined' && window.location.protocol === 'https:'
      ? '/api'
      : 'http://3.82.47.4:5000/api';

    xhr.open('POST', `${uploadBaseUrl}/admin/upload/${type}`);

    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }

    if (xhr.upload && onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      });
    }

    xhr.onload = () => {
      try {
        const response = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(response);
        } else {
          resolve({ success: false, error: response.error || 'Upload failed' });
        }
      } catch (err) {
        resolve({ success: false, error: 'Failed to parse server response' });
      }
    };

    xhr.onerror = () => {
      resolve({ success: false, error: 'Network error during upload' });
    };

    const formData = new FormData();
    formData.append('file', file);
    xhr.send(formData);
  });
}
