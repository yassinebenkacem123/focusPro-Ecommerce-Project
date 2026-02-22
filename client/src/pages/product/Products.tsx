import ErrorMessage from "../../components/error/ErrorMessage";
import Loader from "../../components/loader/Loader";
import ProductCard from "../../components/productComponents/ProductCard";
import ResourceNotFound from "../../components/ressourceNotFound/ResourceNotFound";
import Template from "../../utils/Template";
import type { Product } from "../../lib/type";
import { useSelector} from "react-redux";
import type { RootState } from "../../store/store";
import {sortByOptions } from "../../lib/staticData";
import FilterSideBar from "../../components/productComponents/FilterSideBar";
import SortDropdown from "../../components/productComponents/SortDropDown";
import { useSearchParams } from "react-router-dom";
import { useProductFilter } from "../../components/productComponents/useProductFilter";
import Filter from "../../components/productComponents/Filter";
import PaginationComponent from "../../components/productComponents/PaginationComponent";

const Products = () => {

  const [searchParams,setSearchParams] = useSearchParams();
  const onSelectSort = (sortBy: string, order: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev); 
      next.set("sortBy", sortBy);
      next.set("sortOrder", order);
      return next;
    });
  };
  useProductFilter();
  const { content: products, isLoading, errorMessage } = useSelector((state: RootState) => state.products);
  const handleCategorySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams((prev: URLSearchParams)=>{
      const next = new URLSearchParams(prev);
      if(value.toLowerCase() === "all categories"){
        next.delete("category");
      }else{
        next.set("category", value.toLowerCase());
      }
      return next;
    })
  }
  return (
    <Template>
      <section className="min-h-screen flex-col gap-5 flex px-15 ">
      {/*<div className="w-full flex gap-4 h-140">
              <div className="w-[34%] items-center justify-center flex">
                <img
                  className="w-110" 
                  src="/camera-logo.png" alt="" />

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
                <img 
                className="w-100" 
                src="/image-special-icon.png" alt="" />
              </div>
            </div> */}
          
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
              <FilterSideBar 
                handleCategorySelect={handleCategorySelect}  />

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
                    products.map((product : Product, index) => (
                      <ProductCard key={index}
                        {...product}
                      />
                    ))}
                  </div>
                )}
                <div className="w-full flex items-center justify-center py-3">
                  <PaginationComponent />
                </div>
              </div>
            </div>
          </div>
         
        </section>

    </Template>
  )
}

export default Products