// src/components/dashboard/StatsGrid.tsx

import StatCard from "./StatCard"
import type { DashboardStats } from "../../types/dashboard"

interface StatsGridProps {
  stats: DashboardStats
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="អ្នកប្រើប្រាស់" value={stats.total_users.toString()} subtitle="សរុប" />
      <StatCard title="ម៉ូឌែល AI" value={stats.total_models.toString()} subtitle="កំពុងប្រើ" />
      <StatCard title="Request ថ្ងៃនេះ" value={stats.today_requests.toString()} subtitle="Today" />
      <StatCard title="ប្រវត្តិសង្ខេប" value={stats.total_summarize.toString()} subtitle="សរុប" />
    </div>
  )
}
