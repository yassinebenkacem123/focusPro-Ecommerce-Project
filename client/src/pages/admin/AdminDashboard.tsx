import AdminDashboardActiveUsers from "../../components/adminComponents/adminDashboardComponents/AdminDashboardActiveUsers";
import AdminDashboardConversionRates from "../../components/adminComponents/adminDashboardComponents/AdminDashboardConversionRates";
import AdminDashboardMonthlyTarget from "../../components/adminComponents/adminDashboardComponents/AdminDashboardMonthlyTarget";
import AdminDashboardRecentActivities from "../../components/adminComponents/adminDashboardComponents/AdminDashboardRecentActivities";
import AdminDashboardRecentOrders from "../../components/adminComponents/adminDashboardComponents/AdminDashboardRecentOrders";
import AdminDashboardRevenusAnalytics from "../../components/adminComponents/adminDashboardComponents/AdminDashboardRevenusAnalytics";
import AdminDashboardStatics from "../../components/adminComponents/adminDashboardComponents/AdminDashboardStatics";
import AdminDashboardTopCategories from "../../components/adminComponents/adminDashboardComponents/AdminDashboardTopCategories";
import AdminDashboardUsersInteractions from "../../components/adminComponents/adminDashboardComponents/AdminDashboardUsersInteractions";
import type { DashboardGlobalStatics } from "../../lib/type";

const AdminDashboard = () => {
  const globalStatics: DashboardGlobalStatics = {
    totalSales: 125000,
    totoalOrders: 3500,
    totalVisitors: 50000,
    topCategories:[
      {name:"Electronics", sales: 50000},
      {name:"Fashion", sales: 30000},
      {name:"Home & Garden", sales: 20000},
      {name:"Health & Beauty", sales: 15000},
    ],
    revenusAnalytics:[
      {month: "January", revenus: 10000},
      {month: "February", revenus: 15000},
      {month: "March", revenus: 20000},
      {month: "April", revenus: 25000},
      {month: "May", revenus: 30000},
      {month: "June", revenus: 35000},
      {month: "July", revenus: 40000},
      {month: "August", revenus: 45000},
      {month: "September", revenus: 50000},
      {month: "October", revenus: 55000}, 
      {month: "November", revenus: 60000},
      {month: "December", revenus: 65000},
    ],
    monthlyTarget: 50000,
    currentMonthRevenus: 45000,
    targetProgress: 90,
    activeUsers:{
      totalActiveUsers: 1200,
      eachCountryPercentage:[
        {country: "USA", percentage: 40},
        {country: "UK", percentage: 25},
        {country: "Germany", percentage: 15},
        {country: "France", percentage: 10},
        {country: "Other", percentage: 10},
      ]
    },
    usersInteractions:[
      {interaction: "Product Views", count: 20000},
      {interaction: "Add to Cart", count: 5000},
      {interaction: "Abandoned Carts", count: 1500},
      {interaction: "Completed Purchases", count: 3500},
      {interaction: "Purchases", count: 3500},
      {interaction: "Reviews", count: 800},
      {interaction: "Abandoned Carts", count: 1500},

    ],
    recentOrders:[
      {
        orderId:1,
        customer: "John Doe",
        product:{
          name: "Wireless Headphones",
          image: "https://example.com/product1.jpg"
        },
        amount: 99.99,
        status: "Completed",
        date: "2024-06-01",
        country: "USA",
      },
      {
        orderId:2,
        customer: "Jane Smith",
        product:{
          name: "Smartphone",
          image: "https://example.com/product2.jpg"
        },
        amount: 699.99,
        status: "Processing",
        date: "2024-06-02",
        country: "UK",
      },
      {
        orderId:3,
        customer: "Alice Johnson",
        product:{
          name: "Running Shoes",
          image: "https://example.com/product3.jpg"
        },
        amount: 79.99,
        status: "Shipped",
        date: "2024-06-03",
        country: "Germany",
      },
      {
        orderId:4,
        customer: "Bob Brown",
        product:{
          name: "Coffee Maker",
          image: "https://example.com/product4.jpg"
        },
        amount: 49.99,
        status: "Cancelled",
        date: "2024-06-04",
        country: "France",
      },
      {
        orderId:5,
        customer: "Emily Davis",
        product:{
          name: "Fitness Tracker",
          image: "https://example.com/product5.jpg"
        },
        amount: 129.99,
        status: "Completed",
        date: "2024-06-05",
        country: "USA",
      }
    ],
    recentActivities:[
      {activity: "New user registered", date: "2024-06-01"},
      {activity: "Product reviewed", date: "2024-06-04"},
      {activity: "User logged in", date: "2024-06-05"},
    ]




  }
  return (
    <div className="w-full px-10 pb-8 pt-6">
      <div className="mx-auto flex w-full max-w-425 flex-col gap-6">
        <AdminDashboardStatics
          data={{
            totalSales: globalStatics.totalSales,
            totoalOrders: globalStatics.totoalOrders,
            totalVisitors: globalStatics.totalVisitors,
            currentMonthRevenus: globalStatics.currentMonthRevenus,
          }}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="space-y-6 xl:col-span-8">
            <AdminDashboardRevenusAnalytics data={globalStatics.revenusAnalytics} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AdminDashboardTopCategories data={globalStatics.topCategories} />
              <AdminDashboardUsersInteractions data={globalStatics.usersInteractions} />
            </div>

            <AdminDashboardRecentOrders data={globalStatics.recentOrders} />
          </div>

          <div className="space-y-6 xl:col-span-4">
            <AdminDashboardMonthlyTarget
              monthlyTarget={globalStatics.monthlyTarget}
              currentMonthRevenus={globalStatics.currentMonthRevenus}
              targetProgress={globalStatics.targetProgress}
            />
            <AdminDashboardConversionRates
              totalVisitors={globalStatics.totalVisitors}
              totoalOrders={globalStatics.totoalOrders}
              usersInteractions={globalStatics.usersInteractions}
            />
            <AdminDashboardActiveUsers data={globalStatics.activeUsers} />
            <AdminDashboardRecentActivities data={globalStatics.recentActivities} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard