import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const pieData = [
  { name: "Approved", value: 86 },
  { name: "Suspicious", value: 27 },
  { name: "Rejected", value: 15 },
];

const COLORS = [
  "#16a34a",
  "#f59e0b",
  "#ef4444",
];

const lineData = [
  { day: "May 21", records: 10 },
  { day: "May 22", records: 20 },
  { day: "May 23", records: 35 },
  { day: "May 24", records: 30 },
  { day: "May 25", records: 56 },
  { day: "May 26", records: 45 },
  { day: "May 27", records: 42 },
  { day: "May 28", records: 60 },
];

function ChartsSection() {

  return (

    <div className="grid grid-cols-3 gap-6 mt-6">

      {/* PIE CHART */}

      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-4">
          Record Status Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height={250}
        >

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={90}
              label
            >

              {pieData.map((_, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* LINE CHART */}

      <div className="bg-white rounded-2xl p-6 shadow-sm col-span-2">

        <h2 className="text-xl font-semibold mb-4">
          Records Over Time
        </h2>

        <ResponsiveContainer
          width="100%"
          height={250}
        >

          <LineChart data={lineData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="records"
              stroke="#16a34a"
              strokeWidth={4}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default ChartsSection;
