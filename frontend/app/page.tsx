import { redirect } from "next/navigation";

export default function DashboardPage() {
  redirect("/dashboard");

  return <main className="min-h-screen bg-background p-8">Loading...</main>;
}
