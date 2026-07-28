export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token') || sessionStorage.getItem('admin_token');
  }
  return null;
}

export function setAuthToken(token: string, remember: boolean = true) {
  if (typeof window !== 'undefined') {
    if (remember) {
      localStorage.setItem('admin_token', token);
      sessionStorage.removeItem('admin_token');
    } else {
      sessionStorage.setItem('admin_token', token);
      localStorage.removeItem('admin_token');
    }
  }
}

export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_token');
  }
}
