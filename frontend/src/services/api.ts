import axios from 'axios';

// detect if we are running locally to avoid talking to production by mistake
const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
    if (typeof window !== 'undefined') {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:8080/api';
        }
    }
    return 'https://e-commerce-platform-production-5fe7.up.railway.app/api';
};

const API_BASE_URL = getBaseUrl();
console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                if (!config.headers) config.headers = {} as any;
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthMe = error.config?.url?.includes('/auth/me');

        if (error.response?.status === 401) {
            console.warn('401 Unauthorized detected on:', error.config?.url);

            if (!isAuthMe) {
                // Log out the user if the token is invalid or expired
                if (typeof window !== 'undefined') {
                    const isAuthPath = window.location.pathname === '/login' ||
                        window.location.pathname === '/signup';

                    if (!isAuthPath) {
                        console.error('Triggering global logout and redirect...');
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        localStorage.removeItem('deliveryLocation');

                        window.dispatchEvent(new CustomEvent('authChange'));

                        const isSafePath = window.location.pathname === '/cart' ||
                            window.location.pathname === '/' ||
                            window.location.pathname.startsWith('/product/');

                        if (!isSafePath) {
                            window.location.href = '/login';
                        }
                    }
                }
            }
        }
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (credentials: any) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.removeItem('deliveryLocation');
            if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('authChange'));
        }
        return response.data;
    },
    signup: async (userData: any) => {
        const response = await api.post('/auth/signup', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.removeItem('deliveryLocation');
            if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('authChange'));
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('deliveryLocation');
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('authChange'));
            window.location.href = '/login';
        }
    },
    getCurrentUser: () => {
        if (typeof window === 'undefined') return null;
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    // Add verification method to check if current token is still valid
    verifyToken: async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return null;
            const response = await api.get('/auth/me');
            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                return response.data.user;
            }
            return null;
        } catch (error) {
            return null;
        }
    },
    forgotPassword: async (email: string) => {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },
    resetPassword: async (data: any) => {
        const response = await api.post('/auth/reset-password', data);
        return response.data;
    }
};

export const productService = {
    getAll: async (params: any = {}) => {
        const response = await api.get('/products', { params });
        return response.data;
    },
    getById: async (id: string | string[]) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    }
};

export const cartService = {
    get: async () => {
        const response = await api.get('/cart');
        return response.data;
    },
    add: async (product_id: number, quantity: number = 1) => {
        const response = await api.post('/cart/add', { product_id, quantity });
        return response.data;
    },
    update: async (cart_item_id: number, quantity: number) => {
        const response = await api.put('/cart/update', { cart_item_id, quantity });
        return response.data;
    },
    remove: async (id: number) => {
        const response = await api.delete(`/cart/remove/${id}`);
        return response.data;
    }
};

export const orderService = {
    create: async (orderData: any) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },
    getById: async (id: string) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },
    getUserOrders: async (status?: string) => {
        const response = await api.get('/orders/me', { params: { status } });
        return response.data;
    },
    cancelOrder: async (id: number) => {
        const response = await api.post(`/orders/cancel/${id}`);
        return response.data;
    }
};

export const wishlistService = {
    get: async () => {
        const response = await api.get('/wishlist');
        return response.data;
    },
    add: async (product_id: number) => {
        const response = await api.post('/wishlist/add', { product_id });
        return response.data;
    },
    remove: async (id: number) => {
        const response = await api.delete(`/wishlist/remove/${id}`);
        return response.data;
    }
};

export default api;
