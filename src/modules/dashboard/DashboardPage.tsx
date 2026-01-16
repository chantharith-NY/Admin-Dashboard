import StatsGrid from "../../components/dashboard/StatsGrid"
import UsageChart from "../../components/charts/UsageChart"
import UsersChart from "../../components/charts/UsersChart"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="py-4 border-b-2 border-gray-400 space-y-3 lg:space-y-5">
        <p className="text-center text-3xl font-bold font-moul">
          ផ្ទាំងគ្រប់គ្រង
        </p>
        <p className="text-gray-500 text-base font-battambang">
          សង្ខេបទិន្នន័យប្រព័ន្ធ
        </p>
      </div>

      {/* Summary cards */}
      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-40">
        <UsageChart />
        <UsersChart />
      </div>
    </div>
  )
}
