// src/components/charts/UsageChart.tsx

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { usageChartData } from "./chartData"

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
)

export default function UsageChart() {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="font-semibold mb-4">
        ការប្រើប្រាស់ប្រព័ន្ធ (ប្រចាំសប្តាហ៍)
      </h3>

      {/* FIXED HEIGHT CONTAINER */}
      <div className="relative h-64">
        <Line
          data={usageChartData}
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

