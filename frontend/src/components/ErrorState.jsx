export default function ErrorState({ message }) {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <div className="bg-red-500/10 border border-red-500 rounded-2xl p-5 text-center">
        <h3 className="text-red-400 font-bold text-lg">
          Analysis Failed
        </h3>

        <p className="text-gray-300 mt-2">
          {message}
        </p>
      </div>
    </div>
  );
}