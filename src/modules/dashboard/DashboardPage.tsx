import StatsGrid from "../../components/dashboard/StatsGrid"
import UsageChart from "../../components/charts/UsageChart"
import UsersChart from "../../components/charts/UsersChart"

export default function DashboardPage() {
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
      <StatsGrid />

      {/* ================= CHARTS ================= */}
      <div className="
        grid grid-cols-1 lg:grid-cols-2
        gap-4 sm:gap-5 lg:gap-6
      ">
        <UsageChart />
        <UsersChart />
      </div>
    </div>
  )
}
