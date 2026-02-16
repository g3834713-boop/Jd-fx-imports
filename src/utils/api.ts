import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch product ${id}:`, error);
      throw error;
    }
  },

  create: async (productData: any) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Failed to create product:', error);
      throw error;
    }
  },

  update: async (id: string, productData: any) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update product ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Failed to delete product ${id}:`, error);
      throw error;
    }
  },
};

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch category ${id}:`, error);
      throw error;
    }
  },

  create: async (categoryData: any) => {
    try {
      const response = await api.post('/categories', categoryData);
      return response.data;
    } catch (error) {
      console.error('Failed to create category:', error);
      throw error;
    }
  },

  update: async (id: string, categoryData: any) => {
    try {
      const response = await api.put(`/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update category ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      await api.delete(`/categories/${id}`);
    } catch (error) {
      console.error(`Failed to delete category ${id}:`, error);
      throw error;
    }
  },
};

// Orders API
export const ordersAPI = {
  create: async (orderData: any) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch order ${id}:`, error);
      throw error;
    }
  },
};

// Packages API
export const packagesAPI = {
  getAll: async () => {
    try {
      const response = await api.get('/packages');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch packages:', error);
      throw error;
    }
  },

  getByTrackingId: async (trackingId: string) => {
    try {
      const response = await api.get(`/packages/track/${trackingId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch package ${trackingId}:`, error);
      throw error;
    }
  },

  create: async (packageData: any) => {
    try {
      const response = await api.post('/packages', packageData);
      return response.data;
    } catch (error) {
      console.error('Failed to create package:', error);
      throw error;
    }
  },

  update: async (id: string, packageData: any) => {
    try {
      const response = await api.put(`/packages/${id}`, packageData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update package ${id}:`, error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      await api.delete(`/packages/${id}`);
    } catch (error) {
      console.error(`Failed to delete package ${id}:`, error);
      throw error;
    }
  },
};

export default api;
