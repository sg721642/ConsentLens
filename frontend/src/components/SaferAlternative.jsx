export default function SaferAlternative({
  appName,
}) {
  const alternatives = {
    instagram: "Signal",
    truecaller: "Google Dialer",
    facebook: "Signal",
    snapchat: "Signal",
    tiktok: "YouTube Shorts",
  };

  const alt =
    alternatives[appName?.toLowerCase()];

  if (!alt) return null;

  return (
    <div className="bg-green-900/30 border border-green-500 rounded-xl p-3 mt-4">
      <p className="text-green-400 font-medium">
        ✅ Safer Alternative: {alt}
      </p>
    </div>
  );
}