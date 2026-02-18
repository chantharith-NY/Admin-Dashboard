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

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
)

export default function UsageChart({ data }: any) {

  const chartData = {
    labels: data.map((item: any) => item.date),
    datasets: [
      {
        label: "Requests",
        data: data.map((item: any) => item.count),
        borderColor: "#8BAD13",
        backgroundColor: "rgba(139,173,19,0.2)",
        tension: 0.4,
      },
    ],
  }

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="mb-4 font-moul">
        ការប្រើប្រាស់ ៧ ថ្ងៃចុងក្រោយ
      </p>

      <div className="relative h-64">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
          }}
        />
      </div>
    </div>
  )
}