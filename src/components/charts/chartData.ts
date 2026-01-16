// src/components/charts/chartData.ts

export const usageChartData = {
  labels: ["ច័ន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍", "អាទិត្យ"],
  datasets: [
    {
      label: "ចំនួន Request",
      data: [120, 210, 180, 260, 300, 190, 140],
      borderColor: "#8BAD13",
      backgroundColor: "rgba(139, 173, 19, 0.2)",
      tension: 0.4,
    },
  ],
}

export const usersChartData = {
  labels: ["មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា"],
  datasets: [
    {
      label: "អ្នកប្រើប្រាស់",
      data: [40, 55, 70, 85, 120],
      backgroundColor: "#8BAD13",
      borderRadius: 6,
    },
  ],
}
