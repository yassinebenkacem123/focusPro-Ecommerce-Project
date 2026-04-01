import AddNewCategory from '../../components/adminComponents/categoryComponents/AddNewCategory'
import CategoriesTable from '../../components/adminComponents/categoryComponents/CategoriesTable'
import CategoriesStatics from '../../components/adminComponents/categoryComponents/CategoriesStatics'
import type { RootState } from '../../store/store'
import {useSelector , useDispatch} from 'react-redux'
import Loader from '../../components/loader/Loader'
import ErrorMessage from '../../components/error/ErrorMessage'
import { useEffect } from 'react'
import { getCategoriesStats } from '../../features/categoriesStats/categoriesStatsSlice'
import type { AppDispatch } from '../../store/store'
const Categories = () => {
  const { categoriesStats, isFetchingCategories, fetchErrorMessage } = useSelector(
    (state: RootState) => state.categoriesStats
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(getCategoriesStats());
  }, [dispatch])

  const isInitialLoading = isFetchingCategories && categoriesStats.length === 0;

  return (
  <>
  {isInitialLoading ? (
    <Loader />
  ) : fetchErrorMessage ? (
    <ErrorMessage message={fetchErrorMessage} />
  ) : (
    <div className='flex flex-col gap-4 px-10 py-5'>
      <div className='flex items-start gap-10'>
        <CategoriesStatics categories = {categoriesStats} />
        <div className='flex w-[40%] flex-col gap-5'>
          <AddNewCategory />
          <CategoriesTable categories={categoriesStats} />
        </div>
      </div>
    </div>
  )}
  </>
  )
}

export default Categories