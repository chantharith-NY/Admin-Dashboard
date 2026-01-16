// src/components/charts/UsersChart.tsx

import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { usersChartData } from "./chartData"

ChartJS.register(
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
)

export default function UsersChart() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">
        កំណើនអ្នកប្រើប្រាស់ (ប្រចាំខែ)
      </h3>

      {/* FIXED HEIGHT CONTAINER */}
      <div className="relative h-64">
        <Bar
          data={usersChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
            },
          }}
        />
      </div>
    </div>
  )
}

