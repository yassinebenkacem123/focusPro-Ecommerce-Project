import ErrorMessage from "../../components/error/ErrorMessage";
import Loader from "../../components/loader/Loader";
import ProductCard from "../../components/productComponents/ProductCard";
import ResourceNotFound from "../../components/ressourceNotFound/ResourceNotFound";
import Template from "../../utils/Template";
import type { Product } from "../../lib/type";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../features/products/productSlice";
import type { RootState } from "../../store/store";
import Filter from "../../components/productComponents/Filter";

const Products = () => {
  const { content: products, isLoading, errorMessage } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("isLoading:", isLoading);
  console.log("errorMessage:", errorMessage);
  console.log("Products content:", products); 

  
  return (
    <Template>
      <section className="h-screen px-15 ">
        <Filter />
        
        
        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <ErrorMessage
            message={errorMessage}
          />
        ) : (
          <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.length > 0 ? (
              products.map((product:Product, key:number) =>
                <ProductCard
                  key={key}
                  {...product}
                />
              ))
              :
              <ResourceNotFound message="No product found." />
            }
          </div>)
        }
      </section>

    </Template>
  )
}

export default Products