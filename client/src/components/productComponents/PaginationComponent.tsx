import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation, useSearchParams,useNavigate } from 'react-router-dom';

const PaginationComponent = ({
  totalPages
}:{totalPages: number}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pathname = useLocation();
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const paramValue = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const onChangeHandler = (event: React.ChangeEvent<unknown>, page: number) => {
    params.set("page", String(page));
    navigate(`${pathname.pathname}?${params.toString()}`);
  }
  return (
    <Stack 
      
      spacing={2}>
      <Pagination
        onChange={onChangeHandler}
        size="large"
        page={paramValue}
        defaultPage={1}
        siblingCount={0}
        
        count={totalPages} 
        variant="outlined" 
        shape="rounded" />
    </Stack>
  )
}

export default PaginationComponent