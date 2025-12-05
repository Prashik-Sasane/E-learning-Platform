import React from "react";
import DoubtForm from "./components/DoubtForm";
import { useNavigate } from "react-router-dom";

const DoubtFormPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/doubts"); 
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Ask Your Doubt</h1>
      <DoubtForm onAdd={handleAdd} />
    </div>
  );
};

export default DoubtFormPage;
