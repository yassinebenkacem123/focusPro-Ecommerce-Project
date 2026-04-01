import BestSellingCategory from './BestSellingCategory'
import CategoryAndProducts from './CategoryAndProducts'
import type { categoryStatsProp } from '../../../features/categoriesStats/categoriesStatsSlice'

type CategoriesStaticsProps = {
  categories: categoryStatsProp[]
}

const CategoriesStatics = ({ categories }: CategoriesStaticsProps) => {
  return (
    <div className='flex flex-col  w-[60%] gap-6'>
        <CategoryAndProducts categories={categories} />
        <BestSellingCategory categories={categories} />
    </div>
  )
}

export default CategoriesStatics
