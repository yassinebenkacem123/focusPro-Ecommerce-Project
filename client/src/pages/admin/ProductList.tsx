import React from 'react'
import ProductStatistics from '../../components/adminComponents/productList/ProductStatistics'
import ProductFilterBar from '../../components/adminComponents/productList/ProductFilterBar'
import ProductTable from '../../components/adminComponents/productList/ProductTable'
import AdminDashboardTitle from './AdminDashboardTitle';
export interface ProductAdminState {
  productId: number;
  productName: string;
  price: number;
  productImage: string;
  category: string;
  quentity: number;
  status: string;
  rating: number;
  createdDate: string;
  discount: number;
  seller: {
    sellerId: number;
    sellerName: string;
  };
}
const ProductList = () => {
  const products: ProductAdminState[] = [
    {
      productId:1,
      productName:'iPhone 12',
      price: 999,
      productImage:"https://placehold.co/400x400",
      category: 'Electronics',
      quentity: 50,
      status: 'In Stock',
      rating: 4.5,
      createdDate: '2021-01-01',
      discount: 10,
      seller:{
        sellerId:1,
        sellerName:'yassine ben kacem',
      },
    },
    {
      productId:2,
      productName:'Samsung Galaxy S21',
      price: 899,
      productImage:"https://placehold.co/400x400",
      category: 'Electronics',
      quentity: 30,
      status:'out of stock',
      rating: 4.2,
      createdDate: '2021-02-01',
      discount: 15,
      seller:{
        sellerId:2,
        sellerName:'zakaria ben kacem',
      },
    },
    {
      productId:3,
      productName:'Sony WH-1000XM4',
      price: 349,
      productImage:"https://placehold.co/400x400",
      category: 'Electronics',
      quentity: 20,
      status: 'In Stock',
      rating: 4.7,
      createdDate: '2021-03-01',
      discount: 20,
      seller:{
        sellerId:3,
        sellerName:'ahmed ben kacem',
      },
    },
    {
      productId:4,
      productName:'Dell XPS 13',
      price: 1199,
      productImage:"https://placehold.co/400x400",
      category: 'Electronics',
      quentity: 10,
      status: 'In Stock',
      rating: 4.6,
      createdDate: '2021-04-01',
      discount: 5,
      seller:{
        sellerId:4,
        sellerName:'mohamed ben kacem',
      },
    },
    {
      productId:5,
      productName:'Apple Watch Series 6',
      price: 399,
      productImage:"https://placehold.co/400x400",
      category: 'Electronics',
      quentity: 25,
      status: 'In Stock',
      rating: 4.8,
      createdDate: '2021-05-01',
      discount: 12,
      seller:{
        sellerId:5,
        sellerName:'sami ben kacem',
      },
    },
    {
      productId:6,
      productName:'Google Pixel 5',
      price: 699,
      productImage:"https://placehold.co/400x400",
      category: 'Electronics',
      quentity: 15,
      status:'out of stock',
      rating: 4.3,
      createdDate: '2021-06-01',
      discount: 18,
      seller:{
        sellerId:6,
        sellerName:'Amine',
      },
    }
  ]
  return (
    <div className='px-10 w-full py-5 flex flex-col gap-5'>
      <ProductStatistics products={products} />
      <ProductFilterBar  />
      <ProductTable products={products} />
    </div>
  )
}

export default ProductList