import Header from '@/features/components/header';
import AdminSidebar from '@/widgets/admin/admin-sidebar';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex container">
      <div>
        <AdminSidebar />
      </div>
      <div className=" w-full">
        <Header />
        <div className="py-2 px-4 md:py-4 md:px-6">{children}</div>
      </div>
    </div>
  );
};
export default AdminLayout;
