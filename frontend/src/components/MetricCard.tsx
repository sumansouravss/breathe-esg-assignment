
type Props = {
  title: string;
  value: string;
  color: string;
};

function MetricCard({
  title,
  value,
  color,
}: Props) {

  return (

    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition">

      <p className="text-gray-500">
        {title}
      </p>

      <h1 className={`text-4xl font-bold mt-2 ${color}`}>
        {value}
      </h1>

    </div>

  );
}

export default MetricCard;
