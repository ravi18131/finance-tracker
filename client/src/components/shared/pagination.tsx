import React from "react";
import { DOTS, usePagination } from "../../lib/usePagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

const CustomPagination: React.FC<PaginationProps> = ({
  onPageChange,
  onLimitChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const onChangeLimit = (limit: number) => {
    onLimitChange(limit);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div
      className={cn(
        "flex justify-center sm:justify-between items-center flex-col sm:flex-row space-y-2 md:space-y-0",
        className
      )}
    >
      <div className="flex justify-start items-center">
        <p className="mr-2">Item per page:</p>

        <Select
          onValueChange={(value) => {
            onChangeLimit(+value);
          }}
          value={`${pageSize}`}
        >
          <SelectTrigger className="w-[100px] bg-white">
            <SelectValue placeholder="Item per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[5, 10, 15, 20, 25].map((item: number, index: number) => {
                return (
                  <SelectItem key={index} value={`${item}`}>
                    {item}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {!(currentPage === 0 || paginationRange.length < 2) && (
        <div className="space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={currentPage === 1}
          >
            «
          </Button>
          {paginationRange?.map((pageNumber) => {
            if (pageNumber.toString() === DOTS) {
              return (
                <Button variant="ghost" size="sm" disabled key={pageNumber}>
                  ...
                </Button>
              );
            }
            return (
              <Button
                variant={pageNumber === currentPage ? "default" : "outline"}
                size="sm"
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
            );
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={currentPage === lastPage}
          >
            »
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
