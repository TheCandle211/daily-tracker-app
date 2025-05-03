import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import SummaryView from "./SummaryView";

export default function DailyTracker() {
  const [phase, setPhase] = useState("morning");

  const [startHour, setStartHour] = useState("");
  const [goals, setGoals] = useState([""]);
  const [javaTopic, setJavaTopic] = useState("");
  const [mathTopic, setMathTopic] = useState("");
  const [reason, setReason] = useState("");
  const [progress, setProgress] = useState([""]);
  const [challenge, setChallenge] = useState("");
  const [completed, setCompleted] = useState("");
  const [improve, setImprove] = useState("");

  const addGoal = () => {
    setGoals([...goals, ""]);
    setProgress([...progress, ""]);
  };

  const saveMorningData = async () => {
    try {
      await addDoc(collection(db, "morning-sessions"), {
        startHour,
        goals: goals.filter((g) => g.trim() !== ""),
        javaTopic,
        mathTopic,
        reason,
        createdAt: serverTimestamp(),
      });
      alert("המידע נשמר בהצלחה!");
    } catch (error) {
      console.error("שגיאה בשמירת נתוני הבוקר:", error);
      alert("שגיאה בשמירה");
    }
  };

  const saveMiddayData = async () => {
    try {
      await addDoc(collection(db, "midday-sessions"), {
        goals: goals.filter((g) => g.trim() !== ""),
        progress: progress.filter((p) => p !== ""),
        challenge,
        createdAt: serverTimestamp(),
      });
      alert("נתוני הצהריים נשמרו בהצלחה!");
    } catch (error) {
      console.error("שגיאה בשמירת נתוני הצהריים:", error);
      alert("שגיאה בשמירה");
    }
  };

  const saveEveningData = async () => {
    try {
      await addDoc(collection(db, "evening-summaries"), {
        completed,
        improve,
        createdAt: serverTimestamp(),
      });
      alert("סיכום הערב נשמר בהצלחה!");
    } catch (error) {
      console.error("שגיאה בשמירת סיכום הערב:", error);
      alert("שגיאה בשמירה");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <header className="bg-blue-800 text-white p-4 rounded-xl shadow-md mb-6">
          <nav className="flex justify-between items-center flex-wrap">
            <h1 className="text-xl font-bold">עוזר לימודים יומי</h1>
            <div className="flex space-x-2 rtl:space-x-reverse mt-2 sm:mt-0">
              {["morning", "midday", "evening", "summary"].map((key) => (
                <button
                  key={key}
                  onClick={() => setPhase(key)}
                  className={`px-4 py-2 rounded-md transition font-semibold ${
                    phase === key ? "bg-white text-blue-800" : "bg-blue-700 hover:bg-blue-600"
                  }`}
                >
                  {key === "morning"
                    ? "בוקר"
                    : key === "midday"
                    ? "צהריים"
                    : key === "evening"
                    ? "ערב"
                    : "סיכום"}
                </button>
              ))}
            </div>
          </nav>
        </header>

        {phase === "morning" && (
          <div className="space-y-6 bg-blue-50 p-6 rounded-xl shadow-inner">
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
            <div className="flex justify-end">
              <button
                onClick={saveMorningData}
                className="fixed bottom-6 right-6 bg-blue-700 text-white p-4 rounded-full shadow-lg hover:bg-blue-800"
              >
                ✅
              </button>
            </div>
          </div>
        )}

        {phase === "midday" && (
          <div className="space-y-6 bg-yellow-50 p-6 rounded-xl shadow-inner">
            <h2 className="text-xl font-semibold text-center">אמצע יום</h2>
            {goals.map((_, i) => (
              <div key={i}>
                <label className="block font-semibold mb-1">כמה הספקת במטרה {i + 1}?</label>
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
            <div className="flex justify-end">
              <button
                onClick={saveMiddayData}
                className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700"
              >
                ✅
              </button>
            </div>
          </div>
        )}

        {phase === "evening" && (
          <div className="space-y-6 bg-gray-100 p-6 rounded-xl shadow-inner">
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
            <div className="flex justify-end">
              <button
                onClick={saveEveningData}
                className="fixed bottom-6 right-6 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-900"
              >
                ✅
              </button>
            </div>
          </div>
        )}

        {phase === "summary" && (
          <div className="space-y-6 bg-purple-50 p-6 rounded-xl shadow-inner">
            <SummaryView />
          </div>
        )}
      </div>
    </div>
  );
}
