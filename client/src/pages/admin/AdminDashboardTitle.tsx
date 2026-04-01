const AdminDashboardTitle = ({ title }: { title: string }) => {
  return (
    <h1 className='text-2xl font-semibold text-stone-800 dark:text-gray-100'>
      {title}
    </h1>
  )
}

export default AdminDashboardTitle
