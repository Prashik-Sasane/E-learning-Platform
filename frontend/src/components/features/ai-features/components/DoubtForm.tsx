import React, { useState } from "react";
import axios from "axios";

interface Props {
  onAdd: () => void;
}

const DoubtForm: React.FC<Props> = ({ onAdd }) => {
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/doubt", { subject, question });
      setSubject(""); 
      setQuestion("");
      onAdd();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Ask AI</button>
    </form>
  );
};

export default DoubtForm;
