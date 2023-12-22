import HistoryChart from "@/components/HistoryChart";
import { getUserFromClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
  const user = await getUserFromClerkId();
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
      <div className="h-full px-6 py-8 bg-white">
        <div>
          <h1 className="text-2xl mb-4">{`Avg. Sentiment: ${avg}`}</h1>
        </div>
        <div className="h-full w-full">
          <HistoryChart data={scores} />
        </div>
      </div>
    )
  }
  
  export default History
