"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/atoms/select"

interface RoleFilterProps {
  onRoleChange: (role: string | null) => void
  selectedRole: string | null
}

export default function RoleFilter({ onRoleChange, selectedRole }: RoleFilterProps) {
  const roles = [
    { value: "admin", label: "Admin" },
    { value: "editor", label: "Editor" },
    { value: "viewer", label: "Viewer" },
  ]

  const handleValueChange = (value: string) => {
    if (value === "all") {
      onRoleChange(null)
    } else {
      onRoleChange(value)
    }
  }

  return (
    <Select value={selectedRole || "all"} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full md:w-[180px]">
        <SelectValue placeholder="Filter by role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Roles</SelectItem>
        {roles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            {role.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}