import OpenMenuButton from "./menu/OpenMenuButton"
import Search from "./Search"
import Logo from "./Logo"
import { FaStore } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { useEffect, useState, type JSX } from "react";
import { IoSearch } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi2";

import Menu from "./menu/Menu";
const NavBar = (): JSX.Element => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchParams] = useSearchParams();
  const pathName = window.location.pathname;
  useEffect(()=>{
      const handler = setTimeout(()=>{
          if(searchQuery.length > 0){
            searchParams.set("keyword", searchQuery);
          }else{
            searchParams.delete("keyword");

          }
          navigate(`${pathName}?${searchParams.toString()}`);
      }, 700);
      return ()=> clearTimeout(handler);
  },[searchQuery, navigate, pathName, searchParams])
  return (
    <>
      <AnimatePresence>
        {openMenu && (
          <Menu
            isMenuOpen={openMenu}
            setOpenMenu={setOpenMenu}
          />
        )}
      </AnimatePresence>
      <nav className="flex border-b-2 ml-15 mr-15 border-stone-200 justify-between items-center py-6">
        <div className="flex items-center gap-5">
          <OpenMenuButton
            setOpenMenu={setOpenMenu}
          />
          <Search setOpenSearch={setOpenSearch} />

        </div>

        {/* Logo */}
        <Logo 
          size={"text-4xl"}
        />



        <div className="flex gap-4 items-center justify-center">
          {/* products  */}
          <button
            onClick={() => navigate("/products")}
            title="products"
            className="border cursor-pointer hover:bg-stone-100/70 border-stone-800 rounded-full p-3">
            <FaStore size={25} />
          </button>
          {/* cart */}
          <button 
          title="cart"
          className="border cursor-pointer hover:bg-stone-100/70 border-stone-800 rounded-full p-3"
          onClick={() => navigate("/cart")}>
            <HiShoppingCart size={25} />
          </button>

          {/* Login */}
          <button
            title="Login"
            className="border-2 bg-orange-500 hover:bg-orange-500/90 text-yellow-50 cursor-pointer border-stone-800 rounded-full p-3"
            onClick={() => navigate("/auth")}
          >
            <FaUser size={25} />
          </button>
        </div>

      </nav>

      {/* Search Form */}
      <AnimatePresence>
        {openSearch && <motion.form
          
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "3.2rem" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="h-13 border-r border-l  border-stone-300 border-b flex items-center px-5 bg-white/50  mr-15  ml-15">
          <IoSearch size={20} className="text-stone-800 mr-3" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full outline-none text-xl  border-none h-full"
            required
            placeholder="Search for a product..." />
        </motion.form>
        }
      </AnimatePresence>
    </>
  )
}

export default NavBar