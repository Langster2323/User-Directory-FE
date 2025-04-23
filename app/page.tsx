import UserDirectory from "../components/user-dashboard/user-directory"

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">User Directory</h1>
      <UserDirectory />
    </main>
  )
}