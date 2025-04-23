"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/types"
import SearchBar from "../ui/molecules/search-bar"
import RoleFilter from "./role-filter"
import UserCard from "./user-card"
import LoadingSpinner from "../ui/atoms/loading-spinner"

const mockUsers = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", role: "editor" },
  { id: "3", name: "Charlie Rose", email: "charlie@example.com", role: "viewer" },
  { id: "4", name: "Diana Prince", email: "diana@example.com", role: "editor" },
  { id: "5", name: "Evan Lee", email: "evan@example.com", role: "viewer" },
]

export default function UserDirectory() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate fetching data
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setUsers(mockUsers)
      setFilteredUsers(mockUsers)
      setIsLoading(false)
    }

    fetchUsers()
  }, [])

  // Filter users based on search query and selected role
  useEffect(() => {
    let result = users

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (user) => user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query),
      )
    }

    // Filter by role
    if (selectedRole) {
      result = result.filter((user) => user.role === selectedRole)
    }

    setFilteredUsers(result)
  }, [searchQuery, selectedRole, users])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleRoleFilter = (role: string | null) => {
    setSelectedRole(role)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <SearchBar onSearch={handleSearch} />
        <RoleFilter onRoleChange={handleRoleFilter} selectedRole={selectedRole} />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {users.length} users
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No users found matching your criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}