import { Skeleton } from '@/components/ui/skeleton';

const AdminSettingsSkeleton = () => {
  return (
    <div className="pb-10 animate-in fade-in duration-500">
      {/* Header Section */}
      <section className="bg-white dark:bg-[#111a2e] rounded-[12px] overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="relative">
          {/* Cover Photo Skeleton */}
          <Skeleton className="w-full h-50 rounded-t-[12px] bg-gray-200 dark:bg-gray-800" />

          <div className="absolute left-[46%] -bottom-12">
            {/* Avatar Skeleton */}
            <Skeleton className="w-25 h-25 rounded-full border-4 border-white dark:border-[#111a2e] bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        <div className="mt-17 pb-6 flex flex-col items-center gap-3">
          <Skeleton className="h-8 w-48 bg-gray-200 dark:bg-gray-800" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </section>

      {/* Account Info Section */}
      <section className="bg-white dark:bg-[#111a2e] mt-6 p-4 rounded-[12px] border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-5 w-48 bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-10.5 w-40 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-10 w-full rounded-[12px] bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-10 w-full rounded-[12px] bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        <div className="flex items-end gap-4">
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-10 w-[58%] rounded-[12px] bg-gray-200 dark:bg-gray-800" />
          </div>
          <Skeleton className="h-10.5 w-40 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
      </section>

      {/* Theme/Logout Section */}
      <section className="bg-white dark:bg-[#111a2e] mt-6 p-4 rounded-[12px] border border-gray-100 dark:border-gray-800">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-11.5 w-100 rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>
          <Skeleton className="h-10.5 w-40 rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>
      </section>
    </div>
  );
};

export default AdminSettingsSkeleton;