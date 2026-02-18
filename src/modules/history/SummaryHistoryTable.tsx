import { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable";
import { historyColumns } from "./historyColumns";
import type { HistoryItem } from "../../types/history";
import { historyService } from "../../services/history.service";

export default function SummaryHistoryPage() {
  const [data, setData] = useState<HistoryItem[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory(page);
  }, [page]);

  const fetchHistory = async (page: number) => {
    setLoading(true);
    try {
      const res = await historyService.getHistory("summarize", page);
      setData(res.data);
      setMeta(res.data.meta);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <p className="text-xl sm:text-2xl lg:text-3xl font-moul">
        ប្រវត្តិសង្ខេបអត្ថបទ
      </p>

      <DataTable
        columns={historyColumns}
        data={data}
        emptyText={loading ? "កំពុងទាញយក..." : "គ្មានទិន្នន័យ"}
      />
      {meta && (
        <div className="flex justify-between items-center mt-4 font-battambang">
          <button
            disabled={!meta.prev_page_url}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            មុន
          </button>

          <span>
            ទំព័រ {meta.current_page} / {meta.last_page}
          </span>

          <button
            disabled={!meta.next_page_url}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            បន្ទាប់
          </button>
        </div>
      )}
    </div>
  );
}
