import ErrorMessage from "../../components/error/ErrorMessage";
import Loader from "../../components/loader/Loader";
import ProductCard from "../../components/productComponents/ProductCard";
import ResourceNotFound from "../../components/ressourceNotFound/ResourceNotFound";
import Template from "../../utils/Template";
import type { Product } from "../../lib/type";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../features/products/productSlice";
import type { RootState } from "../../store/store";
import Filter from "../../components/productComponents/Filter";
import {sortByOptions } from "../../lib/staticData";
import FilterSideBar from "../../components/productComponents/FilterSideBar";
import SortDropdown from "../../components/productComponents/SortDropDown";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  let sortBy = searchParams.get("sortBy") || "";
  let sortOrder = searchParams.get("sortOrder") || "";
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const params = new URLSearchParams(searchParams);
  const onSelectSort = (sortBy: string, order: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev); 
      next.set("sortBy", sortBy);
      next.set("sortOrder", order);
      return next;
    });
};
  const { content: products, isLoading, errorMessage } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchProducts({sortBy, sortOrder}));
  }, [dispatch, sortBy, sortOrder]);
  
  const handleCategorySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log("Selected category:", e.target.value);
  }
  return (
    <Template>
    
      <section className="min-h-screen flex-col gap-5 flex px-15 ">
 
   <div className="w-full flex gap-4 h-140">
          <div className="w-[34%] items-center justify-center flex">
            {/* <img
              className="w-110" 
              src="/camera-logo.png" alt="" /> */}

          </div>
          <div className="w-[33%] flex flex-col justify-center items-center ">
         
              <h1 className="text-8xl font-semibold  text-center"> 
              ULTIMATE <br/>
              <span className="text-stroke-product  text-[13rem] font-medium">
                SALE
              </span>
            </h1>
      
          </div>
          <div className="w-[34%]  flex items-center justify-center">
            {/* <img 
            className="w-100" 
            src="/image-special-icon.png" alt="" /> */}
          </div>
        </div>
      



        {/* filter */}
        <Filter />  
     
        
        <div className="w-full py-4 flex flex-col gap-5">
          <div className="flex items-center gap-4 justify-end"> 
           
            <SortDropdown
             onSelectSort={onSelectSort}
             sortByOptions={sortByOptions}  />
             <div>
              <h2 className="text-2xl font-medium text-stone-600">
                 {products.length > 0 ? products.length : "0"} Product (s)</h2>
            </div>
          </div>



          <div className="flex gap-3">

            <FilterSideBar handleCategorySelect={handleCategorySelect} />


            {/* products */}
            <div className="w-[80%]">
              {isLoading ? (
                <Loader />
              ) : errorMessage ? (
                <ErrorMessage message={errorMessage} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {products.length === 0 ? (
                    <ResourceNotFound message="No products found." />
                  ) : 
                  products.map((product, index) => (
                    <ProductCard key={index}
                      {...product as Product}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

    </Template>
  )
}

export default Products