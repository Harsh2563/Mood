'use client'
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip, YAxis, CartesianGrid } from 'recharts'

const CustomTooltip = ({ payload, label, active }) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (active && payload && payload.length) {
    const analysis = payload[0].payload
    return (
      <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg shadow-xl backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: analysis.color }}
          />
          <p className="text-sm text-slate-400">{dateLabel}</p>
        </div>
        <div className="text-emerald-400 font-medium text-lg">{analysis.mood}</div>
        <div className="mt-2">
          <p className="text-slate-300">Score: {analysis.sentimentalScore}</p>
          <p className="text-slate-300">Subject: {analysis.subject}</p>
        </div>
      </div>
    )
  }

  return null
}

const HistoryChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid
          strokeDasharray="4 4"
          strokeOpacity={0.1}
          vertical={false}
        />
        <XAxis
          dataKey="updatedAt"
          stroke="#64748b"
          tick={{ fill: '#94a3b8' }}
          tickFormatter={(str) => {
            const date = new Date(str)
            return date.getDate() === 1
              ? date.toLocaleDateString('default', { month: 'short' })
              : ''
          }}
        />
        <YAxis
          domain={[-100, 100]}
          stroke="#64748b"
          tick={{ fill: '#94a3b8' }}
          tickFormatter={(number) => `${number}%`}
        />
        <Line
          type="monotone"
          dataKey="sentimentalScore"
          stroke="#818cf8"
          strokeWidth={2}
          dot={false}
          activeDot={{
            r: 6,
            fill: "#6366f1",
            stroke: "#fff",
            strokeWidth: 2,
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{
            stroke: '#475569',
            strokeDasharray: '4 4',
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart