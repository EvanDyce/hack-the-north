import { useCompletion } from "ai/react";

export default function Completion() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "../api/chat/completion",
  });

  return (
    <div className="mx-auto w-full max-w-md flex flex-col stretch bg-white border-2 border-white rounded p-3">
      <h2>Summarize My Files</h2>
      <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-8">
        <label className="grow">
          <input
            className="w-full max-w-md bottom-0 border border-gray-300 rounded shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
            placeholder="Give me the average sales in.."
          />
        </label>
        <button
          type="button"
          className="bg-white border border-gray-300 p-3 rounded"
          onClick={stop}
        >
          Stop
        </button>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-white border border-gray-300 p-3 rounded"
        >
          Send
        </button>
      </form>
      <output>{completion}</output>
    </div>
  );
}
