"use client";

import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// The PaginationComponent accepts three props: totalPages, currentPage, and onPageChange
const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const maxPagesToShow = 5; // Number of page numbers to display at a time
  const pages = [];

  let startPage, endPage;

  // Determine the range of page numbers to display
  if (totalPages <= maxPagesToShow) {
    // If total pages are less than or equal to maxPagesToShow, show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // Calculate the startPage and endPage based on currentPage
    startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    endPage = startPage + maxPagesToShow - 1;

    // Adjust if endPage exceeds totalPages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - maxPagesToShow + 1;
    }
  }

  // Generate an array of pages to be displayed
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={currentPage === 1} // Disable if on the first page
          />
        </PaginationItem>

        {/* Page numbers */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink 
              href="#" 
              onClick={() => onPageChange(page)} 
              className={page === currentPage ? 'active' : ''} // Highlight current page
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis indicating more pages if applicable */}
        {totalPages > maxPagesToShow && endPage < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={() => onPageChange(currentPage + 1)} 
            disabled={currentPage === totalPages} // Disable if on the last page
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
