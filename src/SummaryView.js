import { useEffect, useState } from "react";
import {collection,getDocs,query,where,Timestamp,} from "firebase/firestore";
import { db } from "./firebase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SummaryView() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const q = query(
          collection(db, "midday-sessions"),
          where("createdAt", ">=", Timestamp.fromDate(today)),
          where("createdAt", "<", Timestamp.fromDate(tomorrow))
        );

        const snapshot = await getDocs(q);
        const allProgress = [];

        snapshot.forEach((doc) => {
          const { goals = [], progress = [] } = doc.data();
          if (Array.isArray(progress)) {
            progress.forEach((val, i) => {
              const numericVal = Number(val);
              if (!isNaN(numericVal)) {
                allProgress.push({
                  name: goals[i] || `מטרה ${i + 1}`,
                  value: numericVal,
                });
              }
            });
          }
        });

        allProgress.sort((a, b) => {
          const aNum = parseInt(a.name.replace(/\D/g, ""));
          const bNum = parseInt(b.name.replace(/\D/g, ""));
          return isNaN(aNum) || isNaN(bNum) ? 0 : aNum - bNum;
        });

        setData(allProgress);
      } catch (err) {
        console.error("שגיאה בטעינת הנתונים לסיכום:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">טוען נתונים...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center text-gray-400">אין נתונים להצגה להיום.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4">סיכום מטרות לפי התקדמות</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-30}
            textAnchor="end"
            height={60}
            reversed
          />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Bar dataKey="value" fill="#6366f1" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
