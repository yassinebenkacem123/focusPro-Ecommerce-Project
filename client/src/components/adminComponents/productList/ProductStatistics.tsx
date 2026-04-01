import { FiPackage, FiDollarSign } from "react-icons/fi";
import { MdOutlineInventory2 } from "react-icons/md";
import { GoAlert } from "react-icons/go";
import type { ProductAdminState } from "../../../pages/admin/ProductList";

const ProductStatistics = ({ products }: { products: ProductAdminState[] }) => {
  const totalProducts: number = products.length;
  const totalPrice: number = products.reduce((sum, product) => sum + Number(product.price), 0);
  const totalProductsInStock: number = products.filter(
    (product) => product.status.toLowerCase() === "in stock"
  ).length;
  const totalProductsOutOfStock: number = products.filter(
    (product) => product.status.toLowerCase() === "out of stock"
  ).length;

  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: <FiPackage size={25} />,
      iconStyle: "bg-stone-100 dark:bg-gray-700/60 text-stone-700 dark:text-gray-300",
    },
    {
      title: "Total Inventory Value",
      value: `$${totalPrice.toFixed(2)}`,
      icon: <FiDollarSign size={25} />,
      iconStyle: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "In Stock",
      value: totalProductsInStock,
      icon: <MdOutlineInventory2 size={25} />,
      iconStyle: "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Out of Stock",
      value: totalProductsOutOfStock,
      icon: <GoAlert size={25} />,
      iconStyle: "bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="w-full justify-between flex gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl flex-1 px-4 py-7 border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 transition hover:shadow-sm"
        >
          <div className="flex gap-10 items-center justify-between">
            <div>
              <p className="text-lg font-medium text-stone-500 dark:text-gray-400">{stat.title}</p>
              <h3 className="mt-3 text-2xl font-bold text-stone-800 dark:text-gray-100">{stat.value}</h3>
            </div>
            <div className={`flex h-13 w-13 items-center justify-center rounded-xl ${stat.iconStyle}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductStatistics;