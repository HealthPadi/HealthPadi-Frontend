"use client";

import AdminNavbar from "@/components/ui/admin-navbar";
import React, { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search, Loader } from "lucide-react"; // Import Lucide Search and Loader icons
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Import ShadCN UI card components
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"; // Import ShadCN UI pagination components
import { useRouter } from "next/navigation"; // Correct import for useRouter
import useUser from "@/hooks/useUser"; // Import the useUser hook
import { Switch } from "@/components/ui/switch"; // Import the Switch component
import UserService, { UserReport } from "../../services/userService";
import { useQuery } from "@tanstack/react-query";
import { NoUserReport } from "../../services/userService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"; // Import ShadCN UI dialog components
import useAdminToggle from "@/hooks/useAdminToggle"; // Import the useAdminToggle hook

const ITEMS_PER_PAGE = 4;

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const router = useRouter(); // Initialize useRouter hook
  const { getUsersQuery, useGetUserReportsQuery } = useUser(); // Use the useUser hook to fetch users

  const { data: users, isLoading, isError } = getUsersQuery;

  console.log("Fetched users:", users); // Log the fetched users

  // Ensure users is defined before accessing its properties
  const filteredUsers = Array.isArray(users?.data)
    ? users.data.filter((user: { firstName: string; lastName: string }) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    : [];

  console.log("Filtered users:", filteredUsers); // Log the filtered users

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  console.log("Current users:", currentUsers); // Log the current users

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page);
            }}
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
      <main className="flex flex-col items-center mb-10 px-4 md:px-0">
        <div className="flex justify-between items-center mt-5 w-full md:w-1/2">
          <h1 className="text-2xl font-bold">HealthPadi Users</h1>
        </div>
        <div className="w-full md:w-1/2 mt-3">
          <TextField
            fullWidth
            placeholder="Search for a user"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Handle input change
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
          {isLoading && (
            <div className="flex flex-col justify-center items-center w-full h-64 col-span-full">
              <Loader className="animate-spin text-green-500" size={40} />
              <p className="mt-4 text-gray-600">
                Please wait, users are loading
              </p>
            </div>
          )}
          {isError && <div>Oops, something went wrong</div>}
          {!isLoading && currentUsers.length === 0 && (
            <div className="flex justify-center items-center w-full h-64 col-span-full">
              No users available at the moment
            </div>
          )}
          {!isLoading &&
            currentUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                useGetUserReportsQuery={useGetUserReportsQuery}
              />
            ))}
        </div>

        <Pagination className="mt-5">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className="bg-green-600 text-white"
                />
              </PaginationItem>
            )}
            {renderPaginationItems()}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
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

function UserCard({
  user,
  useGetUserReportsQuery,
}: {
  user: { id: string; firstName: string; lastName: string };
  useGetUserReportsQuery: (userId: string) => any;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [selectedUserReports, setSelectedUserReports] = useState<
    { id: string; content: string; location: string }[]
  >([]); // State for selected user's reports

  const { data: userReports } = useGetUserReportsQuery(user.id);
  const { adminToggleMutation } = useAdminToggle(); // Use the adminToggleMutation

  const handleUserCardClick = () => {
    console.log("<<<<<<<<<<<<<<<>>>>>>>>>>>>>>", userReports);
    const reportsCount = userReports?.length || 0;
    console.log("Reports count:>>>>>>>>>>>>>>>>>>>>>>>>>>>", reportsCount);

    if (reportsCount > 0) {
      setSelectedUserReports(userReports);
    } else {
      setSelectedUserReports([
        {
          id: user.id,
          content: "This user doesn't have any reports.",
          location: "",
        },
      ]);
    }
    setIsDialogOpen(true);
  };

  const handleToggleChange = () => {
    adminToggleMutation.mutate({ userId: user.id });
  };

  return (
    <>
      <Card
        key={user.id}
        className="p-4 border rounded shadow w-full md:w-1/2 h-auto md:h-32 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center"
        onClick={handleUserCardClick}
      >
        <div className="flex flex-col w-full md:w-auto">
          <CardHeader className="w-full md:w-auto">
            <CardTitle className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <p className="text-gray-600 ">
              Reports:{" "}
              <span className="font-bold"> {userReports?.length || 0} </span>
            </p>
          </CardContent>
        </div>
        <Switch
          className="ml-auto mt-4 md:mt-0"
          onCheckedChange={handleToggleChange}
        />{" "}
        {/* Add the Switch component and align it to the right */}
      </Card>

      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{user.firstName}&#39;s Reports</DialogTitle>
              <DialogDescription className="max-h-96 overflow-y-auto">
                {selectedUserReports.map((report) => (
                  <div key={report.id} className="mb-4">
                    <p>
                      <strong>Content:</strong> {report.content}
                    </p>
                    {report.location && (
                      <p>
                        <strong>Location:</strong> {report.location}
                      </p>
                    )}
                  </div>
                ))}
              </DialogDescription>
              <DialogClose />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
