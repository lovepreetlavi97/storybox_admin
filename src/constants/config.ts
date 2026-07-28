export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://3.82.47.4:5000/api';
export const SERVER_BASE_URL = API_BASE_URL.replace(/\/api\/?$/, '');

export const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://consolestoryhub.xpernex.com';
export const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://storyhub.xpernex.com';
