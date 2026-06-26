export default function ComparisonTable({ results }) {
  if (!results.length) return null;

  return (
    <section id="compare" className="max-w-7xl mx-auto px-4 py-20">

      <h2 className="text-4xl font-bold mb-10 text-center">
        Compare Apps
      </h2>

      <div className="hidden md:block overflow-x-auto">

        <table className="w-full glass rounded-2xl overflow-hidden">

          <thead>
            <tr className="border-b border-gray-700">

              <th className="p-4 text-left">
                App
              </th>

              <th className="p-4">
                Score
              </th>

              <th className="p-4">
                Location
              </th>

              <th className="p-4">
                Contacts
              </th>

              <th className="p-4">
                Camera
              </th>

              <th className="p-4">
                Microphone
              </th>

            </tr>
          </thead>

          <tbody>

            {results.map((app) => (

              <tr
                key={app.appName}
                className="border-b border-gray-800"
              >

                <td className="p-4">
                  {app.appName}
                </td>

                <td className="p-4 text-center">
                  {app.score}
                </td>

                <td className="p-4 text-center">
                  {app.dataCollected?.includes("Location")
                    ? "✅"
                    : "❌"}
                </td>

                <td className="p-4 text-center">
                  {app.dataCollected?.includes("Contacts")
                    ? "✅"
                    : "❌"}
                </td>

                <td className="p-4 text-center">
                  {app.dataCollected?.includes("Camera")
                    ? "✅"
                    : "❌"}
                </td>

                <td className="p-4 text-center">
                  {app.dataCollected?.includes("Microphone")
                    ? "✅"
                    : "❌"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="md:hidden space-y-4">

        {results.map((app) => (
          <div
            key={app.appName}
            className="glass rounded-2xl p-5"
          >
            <h3 className="font-bold text-xl">
              {app.appName}
            </h3>

            <p>Score: {app.score}</p>

            <p>
              Permissions:
              {" "}
              {app.dataCollected?.join(", ")}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}