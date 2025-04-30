import { useState } from "react";

export default function DailyTracker() {
  const [phase, setPhase] = useState("morning");

  // Morning
  const [startHour, setStartHour] = useState("");
  const [goals, setGoals] = useState([""]);
  const [javaTopic, setJavaTopic] = useState("");
  const [mathTopic, setMathTopic] = useState("");
  const [reason, setReason] = useState("");

  // Midday
  const [progress, setProgress] = useState([""]);
  const [challenge, setChallenge] = useState("");

  // Evening
  const [completed, setCompleted] = useState("");
  const [improve, setImprove] = useState("");

  const addGoal = () => {
    setGoals([...goals, ""]);
    setProgress([...progress, ""]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <div className="flex justify-center space-x-4 mb-6">
          {["morning", "midday", "evening"].map((p) => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              className={`px-4 py-2 rounded-md ${
                phase === p ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {p === "morning" ? "בוקר" : p === "midday" ? "צהריים" : "ערב"}
            </button>
          ))}
        </div>

        {phase === "morning" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">פתיחת יום</h2>

            <div>
              <label className="block font-semibold mb-2">1. שעת התחלה</label>
              <input
                type="time"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">2. מטרות להיום</label>
              {goals.map((goal, i) => (
                <input
                  key={i}
                  placeholder={`מטרה ${i + 1}`}
                  value={goal}
                  onChange={(e) => {
                    const updated = [...goals];
                    updated[i] = e.target.value;
                    setGoals(updated);
                  }}
                  className="w-full p-2 border rounded-md mb-2"
                />
              ))}
              <button
                onClick={addGoal}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                הוסף מטרה נוספת
              </button>
            </div>

            <div>
              <label className="block font-semibold mb-2">3. נושא לימוד ב-Java</label>
              <input
                value={javaTopic}
                onChange={(e) => setJavaTopic(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">4. נושא לימוד במתמטיקה</label>
              <input
                value={mathTopic}
                onChange={(e) => setMathTopic(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">5. למה בחרת בזה?</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border rounded-md h-24"
              />
            </div>
          </div>
        )}

        {phase === "midday" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">אמצע יום</h2>
            {goals.map((_, i) => (
              <div key={i}>
                <label className="block font-semibold mb-1">
                  כמה הספקת במטרה {i + 1}?
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  placeholder="1-5"
                  value={progress[i]}
                  onChange={(e) => {
                    const updated = [...progress];
                    updated[i] = e.target.value;
                    setProgress(updated);
                  }}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            ))}
            <div>
              <label className="block font-semibold mb-2">מה האתגר המרכזי כרגע?</label>
              <textarea
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                className="w-full p-2 border rounded-md h-24"
              />
            </div>
          </div>
        )}

        {phase === "evening" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">סיכום ערב</h2>
            <div>
              <label className="block font-semibold mb-2">מה השלמת היום?</label>
              <textarea
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
                className="w-full p-2 border rounded-md h-20"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">מה תשפר מחר?</label>
              <textarea
                value={improve}
                onChange={(e) => setImprove(e.target.value)}
                className="w-full p-2 border rounded-md h-20"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
