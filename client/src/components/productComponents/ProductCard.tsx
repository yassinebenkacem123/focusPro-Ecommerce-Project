import React from 'react'
import type { Product } from '../../lib/type'
import { HiMiniShoppingCart } from "react-icons/hi2";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../../features/cart/cartSlice';
import { toast } from 'react-toastify';

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
  const dispatch = useDispatch();
  const [openProductViewModal, setOpenProductViewModal] = React.useState<boolean>(false);
  const isAvailable = quantity && Number(quantity) > 0;
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const isBtnLoading = false;
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenProductViewModal(true);
  }

  const addToCartHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const qtyToAdd = 1;
    const availableQty = Number(quantity ?? 0);
    if (availableQty < qtyToAdd) {
      toast.error(`Sorry, only ${availableQty} unit(s) of ${productName} available in stock!`);
      return;
    }

    dispatch(addProductToCart({
      product: {
        productId,
        productName,
        productImage,
        description,
        discount,
        discounte,
        price,
        quantity,
        specialPrice,
      },
      qty: qtyToAdd,
    }));

    toast.success(`${productName} added into the cart successfully!`);
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
      className='border border-gray-300 p-2 rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between'>
      <div className='w-full  relative shadow-md rounded-lg overflow-hidden'>
        <div className='absolute '>
          <span className='px-2 py-1 bg-orange-500 text-white text-xs rounded-br-lg'>
            {discount ? `-${discount}%` : discounte ? `-${discounte}%` : "No discount"}
          </span>
        </div>
        <img
          src={"https://placehold.co/600x400"} alt={productName} />
      </div>
      {/* company name :  */}
      <div className='mt-4'>
        <h1 className='text-sm font-medium bg-stone-800 text-white p-1 w-[24%] text-center rounded-full'>FocusPro</h1>
      </div>
      <div className='p-2 flex flex-col gap-2'>
        <h1 className='text-lg font-semibold text-black'>{productName}</h1>
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

      </div>
      <div className='flex w-full gap-4 justify-between  items-center py-1'>
        <button className='bg-stone-800 w-[70%] text-white text-xl p-2 rounded-lg hover:bg-stone-800/90'>
          By now
        </button>
        <button
          onClick={addToCartHandler}
          title={isAvailable ? "Add to cart" : "Out of stock"}
          className={`w-[30%] flex  items-center justify-center bg-orange-500 text-white p-2 rounded-lg ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-500/80'}`} disabled={!isAvailable || isBtnLoading}>
          {isAvailable ? (
            <HiMiniShoppingCart size={30} />
          ) : (
            <MdRemoveShoppingCart size={30} />
          )}
        </button>
      </div>

    </div>
  )
}

export default ProductCard
