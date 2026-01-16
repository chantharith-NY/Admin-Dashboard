// src/components/dashboard/StatsGrid.tsx

import StatCard from "./StatCard"

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="អ្នកប្រើប្រាស់" value="128" subtitle="សរុប" />
      <StatCard title="ម៉ូឌែល AI" value="12" subtitle="កំពុងប្រើ" />
      <StatCard title="ការប្រើប្រាស់ថ្ងៃនេះ" value="342" subtitle="Request" />
      <StatCard title="ប្រវត្តិកំណត់ត្រា" value="1,284" subtitle="សរុប" />
    </div>
  )
}
