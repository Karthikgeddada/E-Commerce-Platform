import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Log out the user if the token is invalid or expired
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                // Don't redirect if we are on pages that support guest mode (like Cart)
                // or if the request itself is for a safe route
                const isSafePath = window.location.pathname === '/cart' ||
                    window.location.pathname === '/' ||
                    window.location.pathname.startsWith('/product/');

                if (!isSafePath) {
                    window.location.href = '/login';
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
        if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('authChange'));
    },
    getCurrentUser: () => {
        const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        return user ? JSON.parse(user) : null;
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
