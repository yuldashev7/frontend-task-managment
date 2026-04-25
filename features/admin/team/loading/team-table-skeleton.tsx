import { TableCell, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export const TeamTableSkeleton = ({ rowCount = 5 }: { rowCount?: number }) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <TableRow key={index} className="border-b border-(--text-color)/40">
          <TableCell className="p-4">
            <Skeleton className="h-4 w-4" />
          </TableCell>
          <TableCell className="p-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex items-center gap-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </TableCell>
          <TableCell className="p-4">
            <Skeleton className="h-4 w-28" />
          </TableCell>
          <TableCell className="p-4">
            <Skeleton className="h-4 w-40" />
          </TableCell>
          <TableCell className="p-4">
            <Skeleton className="h-4 w-24" />
          </TableCell>
          <TableCell className="p-4">
            <Skeleton className="h-10 w-full max-w-30 rounded-md" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};