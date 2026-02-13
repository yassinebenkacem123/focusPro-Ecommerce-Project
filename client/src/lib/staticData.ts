import type { AdminLink, CameraInfo } from "./type";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { MdPayment } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { LuStore } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineReviews } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";


export const CAMERA_DATA: CameraInfo[] = [
    {
        name: "Canon EOS R5",
        imageUrl: "/detailsPictures/canon.png",
        price: 3899,
        totalRatings: 1245
    },
    {
        name: "Nikon Z7 II",
        imageUrl: "/cameras/nikon-z7-ii.jpg",
        price: 2999,
        totalRatings: 980
    },
    {
        name: "Sony A7R IV",
        imageUrl: "/cameras/sony-a7r-iv.jpg",
        price: 3499,
        totalRatings: 1100
    }
];




export const dashboardAdminLinks:AdminLink[]=[
    {
        mainName:"Main Menu",
        links:[
            {
                name:"Dashboard",
                path:"/admin",
                icon:TbLayoutDashboard
            },
            {
                name:"Customers",
                path:"/admin/customers",
                icon:FaRegUser
            },
            {
                name:"Orders",
                path:"/admin/orders",
                icon:HiOutlineShoppingCart
            },
            {
                name:"Payment & Revenus",
                path:"/admin/payment-revenus",
                icon:MdPayment
            },
            {
                name:"Categories",
                path:"/admin/categories",
                icon:MdOutlineCategory
            },
        ]
    },
    {
        mainName:"Sellers",
    },
    {
        mainName:"Products",
        links:[
            {
                name:"Product List",
                path:"/admin/products",
                icon:LuStore
            },
            {
                name:"Add Product",
                path:"/admin/add-product",
                icon:IoIosAddCircleOutline
            },
            {
                name:"Product Reviews",
                path:"/admin/product-reviews",
                icon:MdOutlineReviews
            },
            {
                name:"Brands",
                path:"/admin/brands",
                icon:CiStar

            }
        ]
    },
    {
        mainName:"Admin",
        links:[
            {
                name:"Admin profile",
                icon:FaRegUser,
                path:"/admin/profile"
            },
            {
                name:"Admin settings",
                path:"/admin/settings",
                icon:CiSettings
            },

        ]
    }

]