
type Props = {
  status: string;
};

function StatusBadge({
  status,
}: Props) {

  let styles: string;

  if (status === "APPROVED") {
    styles =
      "bg-green-100 text-green-700";
  }

  else if (status === "REJECTED") {
    styles =
      "bg-red-100 text-red-700";
  }

  else {
    styles =
      "bg-yellow-100 text-yellow-700";
  }

  return (

    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles}`}
    >
      {status}
    </span>

  );
}

export default StatusBadge;