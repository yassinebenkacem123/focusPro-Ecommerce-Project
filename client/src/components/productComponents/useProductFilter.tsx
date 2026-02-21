import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom"
import { fetchProducts } from "../../features/products/productSlice";

export const useProductFilter = ()=>{
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch<any>();
    useEffect(()=>{
        const params  = new URLSearchParams();

        const currentPage = searchParams.get("page") ? 
            Number(searchParams.get("page")) : 1;
        
        params.set("pageNumber", String(currentPage - 1));

        const sortOrder = searchParams.get("sortOrder") || "asc";
        const sortBy = searchParams.get("sortBy") || "price";
        const categoryParams = searchParams.get("category") || null;
        const keywords = searchParams.get("keyword") || null;

        if(categoryParams){
            params.set("category", categoryParams);
        }
        if(keywords){
            params.set("keyword", keywords);
        }

        params.set("sortBy", sortBy);
        params.set("sortOrder", sortOrder);

        const queryString = params.toString();
        dispatch(fetchProducts(queryString) as any);
    },[dispatch, searchParams])

}