"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

interface PaginationProps {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
}
const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const [pageValue, setPageValue] = useState(Number(page));
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName as string | "page",
      value: pageValue.toString(),
    });
    router.push(newUrl, { scroll: false });
  }, [pageValue, router, urlParamName]);

  const onSelectPage = (value: string) => {
    if (value === "next") {
      setPageValue(pageValue + 1);
    } else {
      setPageValue(pageValue - 1);
    }
  };
  return (
    <div className="flex gap-2">
      <Button
        className="w-28"
        size={"lg"}
        variant={"outline"}
        disabled={pageValue <= 1}
        onClick={() => onSelectPage("prev")}
      >
        Previous
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        disabled={pageValue >= totalPages}
        onClick={() => onSelectPage("next")}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
