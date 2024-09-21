"use client";
import AdminNavbar from "@/components/ui/admin-navbar";
import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "lucide-react"; // Import Lucide Search icon
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Import ShadCN UI card components
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Import ShadCN UI pagination components
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    reports: 5,
    location: "New York",
    content: ["Report 1", "Report 2", "Report 3", "Report 4", "Report 5"],
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    reports: 3,
    location: "Los Angeles",
    content: ["Report 1", "Report 2", "Report 3"],
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    reports: 8,
    location: "Chicago",
    content: [
      "Report 1",
      "Report 2",
      "Report 3",
      "Report 4",
      "Report 5",
      "Report 6",
      "Report 7",
      "Report 8",
    ],
  },
  {
    firstName: "Bob",
    lastName: "Brown",
    reports: 2,
    location: "Houston",
    content: ["Report 1", "Report 2"],
  },
  {
    firstName: "Charlie",
    lastName: "Davis",
    reports: 4,
    location: "Phoenix",
    content: ["Report 1", "Report 2", "Report 3", "Report 4"],
  },
  {
    firstName: "Eve",
    lastName: "Miller",
    reports: 6,
    location: "Philadelphia",
    content: [
      "Report 1",
      "Report 2",
      "Report 3",
      "Report 4",
      "Report 5",
      "Report 6",
    ],
  },
  {
    firstName: "Frank",
    lastName: "Wilson",
    reports: 1,
    location: "San Antonio",
    content: ["Report 1"],
  },
  {
    firstName: "Grace",
    lastName: "Taylor",
    reports: 7,
    location: "San Diego",
    content: [
      "Report 1",
      "Report 2",
      "Report 3",
      "Report 4",
      "Report 5",
      "Report 6",
      "Report 7",
    ],
  },
];

const ITEMS_PER_PAGE = 4;

export default function AdminDashbord() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Initialize useNavigate

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //   const handleUserClick = (user) => {
  //     navigate(`/reports/${user.firstName}-${user.lastName}`, {
  //       state: { user },
  //     });
  //   };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 3;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink
            href="#"
            isActive={page === currentPage}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "bg-green-600 text-white" : ""}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <>
      <AdminNavbar />
      <main className="flex flex-col items-center mb-10">
        <div className="flex justify-between items-center mt-5">
          <h1 className="text-2xl font-bold">HealthPadi Users</h1>
        </div>
        <div className="w-1/2 mt-3">
          <TextField
            fullWidth
            placeholder="Search for a user"
            className="outline-none focus-ring-0 focus:border-transparent"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="flex flex-col gap-4 mt-5 w-full items-center">
          {currentUsers.map((user, index) => (
            <Card
              key={index}
              className="p-4 border rounded shadow w-1/2 h-32 cursor-pointer"
              //   onClick={() => handleUserClick(user)}
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Reports: {user.reports}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Pagination className="mt-5">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="bg-green-600 text-white"
                />
              </PaginationItem>
            )}
            {renderPaginationItems()}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="bg-green-600 text-white"
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </main>
    </>
  );
}
