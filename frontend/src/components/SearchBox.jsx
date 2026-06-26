import { useState } from "react";

export default function SearchBox({
  onAnalyze,
  loading,
}) {
  const [input, setInput] =
    useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;

    const apps = input
      .split(",")
      .map((app) =>
        app.trim()
      )
      .filter(Boolean);

    onAnalyze(apps);
  };

  const quickApps = [
    "Instagram, TikTok",
    "WhatsApp, Signal",
    "Facebook, Snapchat",
    "Truecaller, YouTube",
    "Uber, Zomato",
  ];

  return (
    <section className="max-w-5xl mx-auto px-4">
      <div className="glass rounded-3xl p-8 border border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,.15)]">

        <h2 className="text-2xl font-bold mb-6">
          Analyze App Permissions
        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            value={input}
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
            placeholder="Instagram, TikTok, WhatsApp..."
            className="flex-1 bg-slate-800/70 border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-cyan-400"
          />

          <button
            onClick={
              handleSubmit
            }
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
          >
            {loading
              ? "Analyzing..."
              : "Analyze →"}
          </button>

        </div>

        <div className="mt-5 flex flex-wrap gap-2 items-center">

          <span className="text-xs text-gray-500">
            Try:
          </span>

          {quickApps.map(
            (app) => (
              <button
                key={app}
                onClick={() =>
                  setInput(
                    app
                  )
                }
                className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-gray-400 hover:text-white"
              >
                {app}
              </button>
            )
          )}
        </div>

      </div>
    </section>
  );
}