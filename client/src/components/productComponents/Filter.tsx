import type { JSX } from "react";
import CategoryCard from "./CategoryCard";
import { categories } from "../../lib/staticData";
const Filter = (): JSX.Element => {
 
  return (
    <div className="flex gap-10  items-center w-full  justify-between">
      <div className='flex flex-col w-full gap-3'>
        <div className="flex justify-between gap-4">
          {categories.map((category) => (
            <CategoryCard 
              key={category.categoryId}
              categoryName={category.categoryName}
              categoryImage={category.categoryImage}
            />
          ))}
        </div>
      </div>

    
    
    </div>
  )
}

export default Filter