import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Doubt {
  id: number;
  subject: string;
  question: string;
  answer: string;
  created_at: string;
}

const DoubtListPage: React.FC = () => {
  const [doubts, setDoubts] = useState<Doubt[]>([]);

  const fetchDoubts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doubt");
      setDoubts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching doubts:", err);
      setDoubts([]);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 font-semibold">All Doubts</h1>
      <Link to="/form" className="text-blue-500 mb-4 inline-block">
        Ask a New Doubt
      </Link>

      <div className="mt-4">
        {doubts.length > 0 ? (
          doubts.map((d) => (
            <div key={d.id} className="border p-4 mb-2 rounded shadow-sm">
              <h2 className="font-bold text-lg">{d.subject}</h2>
              <p className="italic text-gray-700">Q: {d.question}</p>
              <p className="mt-2 text-green-700">A: {d.answer}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No doubts found.</p>
        )}
      </div>
    </div>
  );
};

export default DoubtListPage;
