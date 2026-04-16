import AdminSidebar from '@/widgets/admin/admin-sidebar';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-4 container">
      <div>
        <AdminSidebar />
      </div>
      <div>
        <p>Header</p>
        {children}
      </div>
    </div>
  );
};
export default AdminLayout;
