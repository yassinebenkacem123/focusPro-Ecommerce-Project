import type React from "react"

export type CameraInfo = {
  name: string
  imageUrl: string
  price: number
  totalRatings: number
}

export type StartDecoProps = {
  bgColor?: string,
  startColor?: string,
  startSize?: number,
  position?: string,
  padding?: string
}
export type FooterContentProps = {
  name: string,
  links: {
    name?: string,
    link?: string,
    email?: string,
    phone?: string
  }[]
}

export type Product = {
  productId: number,
  productName: string,
  productImage: string,
  description: string,
  quantity: number,
  price: number,
  // Backend currently uses `discounte`.
  discount?: number,
  specialPrice: number
} 

export type AdminLink = {
  mainName: string,
  links?:{
    name: string, 
    path:string,
    icon?: React.ElementType

  }[],
}

export type Category = {
  categoryId:number,
  categoryName:string
  categoryImage?:string
}

export type DashboardGlobalStatics = {
  totalSales: number;
  totoalOrders: number;
  totalVisitors: number;
  topCategories: { name: string; sales: number }[];
  revenusAnalytics: { month: string; revenus: number }[];
  monthlyTarget: number;
  currentMonthRevenus: number;
  targetProgress: number;
  activeUsers: {
    totalActiveUsers: number;
    eachCountryPercentage: { country: string; percentage: number }[];
  };
  usersInteractions: { interaction: string; count: number }[];
  recentOrders: {
    orderId: number;
    customer: string;
    product: {
      name: string;
      image: string;
    };
    amount: number;
    status: string;
    date: string;
    country: string;
  }[];
  recentActivities: { activity: string; date: string }[];
}