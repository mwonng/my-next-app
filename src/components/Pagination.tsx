import { HStack, Button, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type PaginationProps = {
  currentPage: number;
  setPage: (page: number) => void;
  hasNextPage: boolean;
  pages: number;
};

export const Pagination = ({ currentPage, pages }: PaginationProps) => {
  const router = useRouter();

  const totalPages = pages;

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage === 1) {
        router.push("/characters");
      } else {
        router.push(`/characters/${newPage}`);
      }
    },
    [router]
  );

  // Generate array of page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 3; // Number of pages to show
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + showPages - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Box my={8}>
      <HStack justify="center">
        {currentPage > 1 && (
          <Button onClick={() => handlePageChange(currentPage - 1)}>
            Prev
          </Button>
        )}

        {currentPage > 3 && (
          <>
            <Button onClick={() => handlePageChange(1)}>1</Button>
            {currentPage > 4 && <Box>...</Box>}
          </>
        )}

        {getPageNumbers().map((pageNum) => (
          <Button
            key={pageNum}
            variant={pageNum === currentPage ? "subtle" : "solid"}
            onClick={() => handlePageChange(pageNum)}
            disabled={pageNum === currentPage}
          >
            {pageNum}
          </Button>
        ))}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <Box>...</Box>}
            <Button onClick={() => handlePageChange(totalPages)}>
              {totalPages}
            </Button>
          </>
        )}

        {currentPage < totalPages && (
          <Button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </Button>
        )}
      </HStack>
    </Box>
  );
};
export default Pagination;
