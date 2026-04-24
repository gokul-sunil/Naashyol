import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", orders: 320 },
  { month: "Feb", orders: 380 },
  { month: "Mar", orders: 350 },
  { month: "Apr", orders: 420 },
  { month: "May", orders: 390 },
  { month: "Jun", orders: 480 },
  { month: "Jul", orders: 520 },
  { month: "Aug", orders: 490 },
  { month: "Sep", orders: 560 },
  { month: "Oct", orders: 610 },
  { month: "Nov", orders: 680 },
  { month: "Dec", orders: 720 },
];

const OrdersChart = () => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="orders" fill="#3b82f6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OrdersChart;