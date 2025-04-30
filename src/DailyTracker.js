
import { useState } from "react";

export default function DailyTracker() {
  const [startHour, setStartHour] = useState("");
  const [goals, setGoals] = useState(["", "", ""]);
  const [javaTopic, setJavaTopic] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Daily Assistant – Start Your Day
        </h1>

        {!submitted ? (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                1. What time did you start today?
              </label>
              <input
                type="time"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                2. Top 3 goals for today
              </label>
              {goals.map((goal, i) => (
                <input
                  key={i}
                  placeholder={`Goal ${i + 1}`}
                  className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={goal}
                  onChange={(e) => {
                    const updated = [...goals];
                    updated[i] = e.target.value;
                    setGoals(updated);
                  }}
                />
              ))}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                3. Java/CS Topic to focus on
              </label>
              <input
                placeholder="e.g., Sorting algorithms"
                value={javaTopic}
                onChange={(e) => setJavaTopic(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                4. Why are you focusing on this?
              </label>
              <textarea
                placeholder="Explain your reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit Day Start
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-green-600">Great Start!</h2>
            <p><strong>Started at:</strong> {startHour}</p>
            <p><strong>Today's Goals:</strong> {goals.filter(g => g).join(", ")}</p>
            <p><strong>Focus Topic:</strong> {javaTopic}</p>
            <p><strong>Reason:</strong> {reason}</p>
          </div>
        )}
      </div>
    </div>
  );
}
