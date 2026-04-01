import { Outlet } from "react-router-dom"
import AdminDashboardSidebar from "./AdminDashboardSidebar"
import AdminDashboardHeader from "./AdminDashboardHeader"
import AdminDashboardTitle from "./AdminDashboardTitle"
import { useLocation } from "react-router-dom"
import { useState } from "react"

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const getTitle = () => {
    const path = location.pathname.split("/").includes("seller") ? "SELLER" 
    : location.pathname.split("/").includes("admin") ? "DASHBOARD"
    : location.pathname.split("/").slice(-1)[0];
    return path?.toLocaleUpperCase() || "DASHBOARD";
  }

  return (
    <main className="p-4 h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-200">
      <main className="flex h-full bg-white dark:bg-gray-900 rounded-2xl shadow-[1px_1px_5px_rgba(0,0,0,0.3)] dark:shadow-[1px_1px_8px_rgba(0,0,0,0.6)] border border-gray-200/60 dark:border-gray-700/40 overflow-hidden transition-colors duration-200">
        <AdminDashboardSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />
        <div className="flex overflow-y-auto w-full min-w-0 flex-col">
          <div className="w-full flex pt-5 px-10 justify-between">
            <AdminDashboardTitle title={getTitle()} />
            <AdminDashboardHeader />
          </div>
          <Outlet />
        </div>
      </main>
    </main>
  )
}

export default AdminLayout