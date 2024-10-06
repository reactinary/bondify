import { FlexCol } from "@/components/ui/containers";
import { Skeleton } from "@/components/ui/skeleton";

// UI Main page (/ui/page.tsx)
export function SkeletonArticle() {
  return (
    <FlexCol>
      <div className="relative h-[200px]">
        <Skeleton className="absolute inset-0 h-full w-full" />
      </div>
      <div className="mt-4">
        <Skeleton className="mb-2 h-4 w-3/4" />
        <Skeleton className="mb-2 h-4 w-1/2" />
        <Skeleton className="mb-2 h-4 w-5/6" />
      </div>
    </FlexCol>
  );
}
