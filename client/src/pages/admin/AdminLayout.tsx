import { Outlet } from "react-router-dom"
import AdminDashboardSidebar from "./AdminDashboardSidebar"

const AdminLayout = () => {
  return (
    <main className="p-4 h-screen bg-white/10">
      <main className="flex gap-3 h-full bg-white  rounded-2xl shadow-[1px_1px_5px_rgba(0,0,0,0.3)] border-0.5 border-gray-500/10 overflow-hidden ">
        <AdminDashboardSidebar />
        <Outlet />
      </main>
    </main>
  )
}

export default AdminLayout