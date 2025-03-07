import HistoryChart from "@/components/HistoryChart";
import { getAuthUser } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
  const user = await getAuthUser();
  const scores = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  const sum = scores.reduce((all, current) => all + current.sentimentalScore, 0);
  const avg = Math.round(sum / scores.length);
  return { scores, avg };
};

const History = async () => {
  const { scores, avg } = await getData()
  return (
    <div className="h-full px-6 py-8 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Sentiment History</h1>
          <div className="text-2xl font-semibold text-emerald-400">
            Average Sentiment: {avg}
          </div>
        </div>
        <div className="h-[600px] w-full bg-slate-800/50 rounded-xl p-6 shadow-xl border border-slate-700">
          <HistoryChart data={scores} />
        </div>
      </div>
    </div>
  )
}

export default History