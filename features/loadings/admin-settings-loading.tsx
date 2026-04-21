import { Skeleton } from '@/components/ui/skeleton';

const AdminSettingsSkeleton = () => {
  return (
    <div className="pb-10 animate-in fade-in duration-500">
      <section className="bg-white rounded-[12px] overflow-hidden">
        <div className="relative">
          <Skeleton className="w-full h-50 rounded-t-[12px]" />

          <div className="absolute left-[46%] -bottom-12">
            <Skeleton className="w-25 h-25 rounded-full border-4 border-white" />
          </div>
        </div>

        <div className="mt-17 pb-6 flex flex-col items-center gap-3">
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      </section>

      <section className="bg-white mt-6 p-4 rounded-[12px] border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-10.5 w-40 rounded-md" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-[12px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-[12px]" />
          </div>
        </div>

        <div className="flex items-end gap-4">
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-[58%] rounded-[12px]" />
          </div>
          <Skeleton className="h-10.5 w-40 rounded-md" />
        </div>
      </section>

      <section className="bg-white mt-6 p-4 rounded-[12px] border border-gray-100">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-11.5 w-100 rounded-md" />
          </div>
          <Skeleton className="h-10.5 w-40 rounded-md" />
        </div>
      </section>
    </div>
  );
};

export default AdminSettingsSkeleton;
