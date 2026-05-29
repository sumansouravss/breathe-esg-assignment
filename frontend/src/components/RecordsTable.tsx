import StatusBadge from "./StatusBadge";

const records = [
  {
    id: 128,
    category: "Fuel Oil",
    scope: "Scope 1",
    value: 1200,
    unit: "L",
    status: "PENDING",
    suspicious: false,
  },

  {
    id: 127,
    category: "Diesel",
    scope: "Scope 1",
    value: -100,
    unit: "L",
    status: "PENDING",
    suspicious: true,
  },

  {
    id: 126,
    category: "Petrol",
    scope: "Scope 1",
    value: 300,
    unit: "L",
    status: "APPROVED",
    suspicious: false,
  },
];

function RecordsTable() {

  return (

    <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-semibold">
          Recent Emission Records
        </h2>

        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl">

          Export CSV

        </button>

      </div>

      <table className="w-full">

        <thead>

          <tr className="text-left text-gray-500 border-b">

            <th className="pb-4">
              ID
            </th>

            <th className="pb-4">
              Category
            </th>

            <th className="pb-4">
              Scope
            </th>

            <th className="pb-4">
              Value
            </th>

            <th className="pb-4">
              Unit
            </th>

            <th className="pb-4">
              Status
            </th>

            <th className="pb-4">
              Suspicious
            </th>

            <th className="pb-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {records.map((record) => (

            <tr
              key={record.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="py-4">
                #{record.id}
              </td>

              <td>
                {record.category}
              </td>

              <td>
                {record.scope}
              </td>

              <td>
                {record.value}
              </td>

              <td>
                {record.unit}
              </td>

              <td>

                <StatusBadge
                  status={record.status}
                />

              </td>

              <td>

                {record.suspicious ? (

                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">

                    Yes

                  </span>

                ) : (

                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">

                    No

                  </span>

                )}

              </td>

              <td className="space-x-2">

                <button className="bg-green-600 text-white px-3 py-1 rounded-lg">

                  ✓

                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded-lg">

                  ✕

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default RecordsTable;