import StatsGrid from "../../components/dashboard/StatsGrid"
import UsageChart from "../../components/charts/UsageChart"
import UsersChart from "../../components/charts/UsersChart"
import ModelRanking from "../../components/dashboard/ModelRanking"

import { useEffect, useState } from "react"
import { dashboardService } from "../../services/dashboard.service"
import type { DashboardStats } from "../../types/dashboard"

export default function DashboardPage() {

  const [data, setData] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dashboardService
      .getStats()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  if (loading || !data) {
    return <p className="text-center py-10">កំពុងទាញយក...</p>
  }

  return (
    <div className="space-y-4 sm:space-y-5 lg:space-y-6">

      {/* ================= PAGE HEADER ================= */}
      <div className="
        py-3 sm:py-4 lg:py-6
        border-b border-gray-300
        space-y-1 sm:space-y-2 lg:space-y-3
        text-center
      ">
        <p className="
          font-moul font-bold
          text-xl sm:text-2xl lg:text-3xl
        ">
          ផ្ទាំងគ្រប់គ្រង
        </p>

        <p className="
          font-battambang text-gray-500
          text-sm sm:text-base lg:text-lg
        ">
          សង្ខេបទិន្នន័យប្រព័ន្ធ
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <StatsGrid stats={data}/>

      {/* ================= CHARTS ================= */}
      <div className="
        grid grid-cols-1 lg:grid-cols-2
        gap-4 sm:gap-5 lg:gap-6
      ">
        <UsageChart data={data.requests_per_day} />
        <UsersChart data={data.users_per_month} />
      </div>

      <ModelRanking models={data.usage_per_model} />
    </div>
  )
}
