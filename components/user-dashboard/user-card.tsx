import type { User } from "../../lib/types"
import { Card, CardContent } from "../ui/atoms/card"
import { Badge } from "@/components/ui/atoms/badge"
import { UserCircle, Mail } from "lucide-react"

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  // Define badge colors based on role
  const getBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "editor":
        return "default"
      case "viewer":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-medium">{user.name}</h3>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
          </div>
          <Badge variant={getBadgeVariant(user.role)} className="capitalize">
            {user.role}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}