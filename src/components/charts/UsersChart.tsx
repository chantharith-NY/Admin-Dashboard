import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
)

interface Props {
  data?: {
    month: string
    count: number
  }[]
}

export default function UsersChart({ data }: Props) {

  const safedata = Array.isArray(data) ? data : []

  const chartData = {
    labels: safedata.map(item => item.month),
    datasets: [
      {
        label: "Users",
        data: safedata.map(item => item.count),
        backgroundColor: "#8BAD13",
        borderRadius: 6,
      },
    ],
  }

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="mb-4 font-moul">
        កំណើនអ្នកប្រើប្រាស់ (ប្រចាំខែ)
      </p>

      <div className="relative h-64">
        <Bar
          data={chartData}
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
