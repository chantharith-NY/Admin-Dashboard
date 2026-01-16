// src/components/dashboard/StatCard.tsx

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
}

export default function StatCard({
  title,
  value,
  subtitle,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-5 border border-gray-200">
      <p className="text-md text-gray-500 font-medium font-battambang">
        {title}
      </p>
      <div className="flex my-auto justify-between">
        <p className="text-3xl font-bold">
            {value}
        </p>

        {subtitle && (
            <p className="text-xs text-gray-400 my-auto">
            {subtitle}
            </p>
        )}
      </div>


    </div>
  )
}
