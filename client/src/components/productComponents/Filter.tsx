import React from 'react'
import {Button, FormControl, Tooltip} from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FaArrowUp } from 'react-icons/fa6';
import { useSearchParams,useLocation, useNavigate } from 'react-router-dom';

// to do : sort by need to be updated for making the user able to sort by price and rate, name ect...

const Filter = () => {
  const categories:{
    categoryId:number,
    categoryName:string
  }[] =  [
    {
      categoryId:1,
      categoryName:"Electronics"
    },
    {
      categoryId:2,
      categoryName:"Clothing"
    },
    {
      categoryId:3,
      categoryName:"Books"
    },
    {
      categoryId:4,
      categoryName:"Home & Kitchen"
    },
  ];

  const [category, setCategory] = React.useState<string>("all");
  const [sortOrder, setSortOrder] = React.useState<string>("asc");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  


  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const pathName = useLocation().pathname;
  const navigate = useNavigate();



  React.useEffect(() => {
    const currentCategory = params.get("category") || "all";
    const currentSortOrder = params.get("sortOrder") || "asc";
    const currentSearchTerm = params.get("searchTerm") || "";
    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  },[searchParams])

  const handleCategoryChange = (event:SelectChangeEvent) => {
    const selectedCategory = event.target.value;
    if(selectedCategory === "all"){
      params.delete("category");
    }else{
      params.set("category", selectedCategory);
    }
    navigate(`${pathName}?${params.toString()}`);
    setCategory(event.target.value);
  }
  
  return (
    <div className="p-3 flex gap-10 items-center w-full py-4 justify-between">
      {/* for searching ... */}
      <div className="flex h-13 w-full bg-gray-300/30 px-3 border  items-center gap-3">
        <input
          className="w-full outline-none text-xl  border-none h-full"
          placeholder='search for camera...' 
          type="text" />
      </div>
      
      {/*for category selection */}

      <div className='flex gap-4 '>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value={"all"}>All</MenuItem>
            {
              categories.map((category) => (
                <MenuItem key={category.categoryId} value={category.categoryName}>{category.categoryName}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>


      {/* for sorting  */}
      <div className='flex items-center gap-4 items-center'>
        <Tooltip 
          title="Sort by price"
       
        >
          <Button
            color='primary'
            variant='outlined'
            className='flex items-center gap-3 w-20'
          >
            Sort By
            <FaArrowUp size={30}  className='text-white'/>
          </Button>
        </Tooltip>

        <button className='bg-red-700 text-white py-1 px-3 cursor-pointer'>
          <span>
            Clear filter
            </span>
        </button>
      </div>
      
    </div>
  )
}

export default Filter