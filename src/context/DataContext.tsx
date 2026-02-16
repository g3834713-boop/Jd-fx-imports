import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price_estimate: number;
  category_id: string;
  image_url: string;
  is_featured: boolean;
  created_at: string;
  status?: 'in_stock' | 'preorder';
  estimated_delivery?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Package {
  id: string;
  tracking_id: string;
  status: string;
  shipping_route: 'sea' | 'air';
  current_location: string;
  origin: string;
  destination: string;
  created_at: string;
  updated_at: string;
  estimated_delivery?: string;
}

interface DataContextType {
  products: Product[];
  categories: Category[];
  packages: Package[];
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getCategoryById: (id: string) => Category | undefined;
  addPackage: (pkg: Omit<Package, 'id' | 'created_at' | 'updated_at'>) => void;
  updatePackage: (id: string, pkg: Partial<Package>) => void;
  deletePackage: (id: string) => void;
  getPackageById: (id: string) => Package | undefined;
  getPackageByTrackingId: (trackingId: string) => Package | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long battery life. Perfect for music lovers and professionals.',
    price_estimate: 45,
    category_id: '1',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    is_featured: true,
    created_at: new Date().toISOString(),
    status: 'preorder',
    estimated_delivery: '15-20 days'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and smartphone integration.',
    price_estimate: 120,
    category_id: '1',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    is_featured: true,
    created_at: new Date().toISOString(),
    status: 'preorder',
    estimated_delivery: '10-15 days'
  },
  {
    id: '3',
    name: 'USB-C Hub Adapter',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader. Ultra-compact design.',
    price_estimate: 25,
    category_id: '2',
    image_url: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
    is_featured: false,
    created_at: new Date().toISOString(),
    status: 'in_stock',
    estimated_delivery: '5-7 days'
  },
  {
    id: '4',
    name: 'Portable Phone Charger',
    description: '20000mAh portable power bank with fast charging support for multiple devices.',
    price_estimate: 18,
    category_id: '2',
    image_url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
    is_featured: true,
    created_at: new Date().toISOString(),
    status: 'preorder',
    estimated_delivery: '12-18 days'
  },
  {
    id: '5',
    name: 'Phone Screen Protector',
    description: 'Tempered glass screen protector with 9H hardness and anti-fingerprint coating.',
    price_estimate: 5,
    category_id: '3',
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    is_featured: false,
    created_at: new Date().toISOString(),
    status: 'in_stock',
    estimated_delivery: '7-10 days'
  },
  {
    id: '6',
    name: 'Protective Phone Case',
    description: 'Durable silicone phone case with shock absorption and premium finish.',
    price_estimate: 12,
    category_id: '3',
    image_url: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop',
    is_featured: false,
    created_at: new Date().toISOString(),
    status: 'in_stock',
    estimated_delivery: '5-7 days'
  }
];

const initialCategories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Accessories', slug: 'accessories' },
  { id: '3', name: 'Phone Protection', slug: 'phone-protection' }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const savedCategories = localStorage.getItem('categories');
    const savedPackages = localStorage.getItem('packages');

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(initialCategories);
      localStorage.setItem('categories', JSON.stringify(initialCategories));
    }

    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [categories]);

  // Save packages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('packages', JSON.stringify(packages));
  }, [packages]);

  const addProduct = useCallback((product: Omit<Product, 'id' | 'created_at'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    setProducts((prev) => [newProduct, ...prev]);
  }, []);

  const updateProduct = useCallback((id: string, updatedProduct: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }, []);

  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories((prev) => [newCategory, ...prev]);
  }, []);

  const updateCategory = useCallback((id: string, updatedCategory: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      )
    );
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  }, []);

  const getProductById = useCallback(
    (id: string) => products.find((product) => product.id === id),
    [products]
  );

  const getCategoryById = useCallback(
    (id: string) => categories.find((category) => category.id === id),
    [categories]
  );

  const addPackage = useCallback((pkg: Omit<Package, 'id' | 'created_at' | 'updated_at'>) => {
    const now = new Date().toISOString();
    const newPackage: Package = {
      ...pkg,
      id: Date.now().toString(),
      created_at: now,
      updated_at: now,
    };
    setPackages((prev) => [newPackage, ...prev]);
  }, []);

  const updatePackage = useCallback((id: string, updatedPackage: Partial<Package>) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === id ? { ...pkg, ...updatedPackage, updated_at: new Date().toISOString() } : pkg
      )
    );
  }, []);

  const deletePackage = useCallback((id: string) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
  }, []);

  const getPackageById = useCallback(
    (id: string) => packages.find((pkg) => pkg.id === id),
    [packages]
  );

  const getPackageByTrackingId = useCallback(
    (trackingId: string) => packages.find((pkg) => pkg.tracking_id.toUpperCase() === trackingId.toUpperCase()),
    [packages]
  );

  const value: DataContextType = {
    products,
    categories,
    packages,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    getProductById,
    getCategoryById,
    addPackage,
    updatePackage,
    deletePackage,
    getPackageById,
    getPackageByTrackingId,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
