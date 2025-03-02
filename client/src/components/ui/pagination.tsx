import type { FC } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export const Pagination: FC<PaginationProps> = ({
  onPageChange,
  onLimitChange,
  totalCount,
  totalPages,
  currentPage,
  pageSize,
}) => {
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-sm border">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium hidden sm:block">Rows per page</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            onLimitChange(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 50, 100].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-4 lg:space-x-6">
        <div className="items-center justify-center text-sm font-medium hidden md:flex">
          Page {currentPage} of {totalPages}
        </div>
        <div className="items-center justify-center text-sm font-light hidden md:flex">
          {Math.min((currentPage - 1) * pageSize + 1, totalCount)}-
          {Math.min(currentPage * pageSize, totalCount)} of {totalCount}
        </div>
        <div className="items-center justify-center text-sm font-medium flex md:hidden">
          {currentPage} /{totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={onPrevious}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={onNext}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
