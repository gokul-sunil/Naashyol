import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", referrals: 45, conversions: 32 },
  { month: "Feb", referrals: 60, conversions: 48 },
  { month: "Mar", referrals: 55, conversions: 42 },
  { month: "Apr", referrals: 72, conversions: 58 },
  { month: "May", referrals: 88, conversions: 70 },
  { month: "Jun", referrals: 102, conversions: 85 },
];

const ReferralChart = () => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="referrals"
          stroke="#f97316"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="conversions"
          stroke="#22c55e"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ReferralChart;