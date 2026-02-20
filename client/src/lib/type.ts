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
  discounte?: number,
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