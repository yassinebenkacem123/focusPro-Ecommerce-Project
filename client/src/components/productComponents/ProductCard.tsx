import React from 'react'
import type { Product } from '../../lib/type'

const ProductCard = ({
  productName,
  productImage,
  productId,
  description,
  discount,
  discounte,
  price,
  quantity,
  specialPrice,
}: Product
): React.JSX.Element => {
  const [openProductViewModal, setOpenProductViewModal] = React.useState<boolean>(false);
  const isAvailable = quantity && Number(quantity) > 0;
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const isBtnLoading = false;
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenProductViewModal(true);
  }
  return (
    <div onClick={() => {
      handleSelectProduct({
        productId,
        productName,
        productImage,
        description,
        quantity,
        price,
        discount: discount ?? discounte,
        discounte,
        specialPrice
      })
    }}
      className='border border-gray-300 rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between'>
      <img
        src={productImage} alt={productName} />

      <div className='p-2 flex flex-col gap-2'>
        <h1 className='text-xl font-medium text-black'>{productName}</h1>
        <p className='text-md text-gray-700'>
          {description}
        </p>
      </div>
      <div className='flex w-full justify-between p-2'>
        {
          specialPrice && Number(specialPrice) > 0 ? (
            <div className='flex flex-col'>
              <span className='text-lg font-semibold text-green-600'>${specialPrice.toFixed(2)}</span>
              <span className='text-sm text-gray-500 line-through'>${price.toFixed(2)}</span>
            </div>
          ) : (
            <span className='text-lg font-semibold text-black'>${price.toFixed(2)}</span>
          )
        }
        <button>
          {isAvailable ? (
            <span className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
              {isBtnLoading ? 'Adding...' : 'Add to Cart'} </span>
          ) : (
            <span className='px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed'>
              Out of Stock
            </span>
          )}
        </button>
      </div>

    </div>
  )
}

export default ProductCard
