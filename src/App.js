import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: "Alo 1234?", details: "a ă â b c d đ e ê o ô ơ u ư ....." },
    { id: 2, text: "Nghe rõ trả lời đê?", details: "mic check 1 2 3" },
  ]);

  const [newQuestion, setNewQuestion] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const [editQuestionId, setEditQuestionId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [viewDetailsId, setViewDetailsId] = useState(null);

  // Thêm câu hỏi mới
  const handleAdd = () => {
    if (newQuestion.trim() === "" || newDetails.trim() === "") return;
    setQuestions([
      ...questions,
      { id: questions.length + 1, text: newQuestion, details: newDetails },
    ]);
    setNewQuestion("");
    setNewDetails("");
  };

  // Sửa câu hỏi
  const handleEdit = (id) => {
    const questionToEdit = questions.find((q) => q.id === id);
    setEditQuestionId(id);
    setEditText(questionToEdit.text);
    setEditDetails(questionToEdit.details);
  };

  // Lưu câu hỏi sau khi sửa
  const handleSave = () => {
    setQuestions(
      questions.map((q) =>
        q.id === editQuestionId ? { ...q, text: editText, details: editDetails } : q
      )
    );
    setEditQuestionId(null);
    setEditText("");
    setEditDetails("");
  };

  // Xóa câu hỏi
  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Xem chi tiết câu hỏi
  const handleViewDetails = (id) => {
    setViewDetailsId(id === viewDetailsId ? null : id); // Toggle
  };

  return (
    <div className="container">
      <h1>Questions</h1>

      {/* Form thêm câu hỏi */}
      <div className="add-question">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Add a new question"
        />
        <input
          type="text"
          value={newDetails}
          onChange={(e) => setNewDetails(e.target.value)}
          placeholder="Add details"
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      {/* Danh sách câu hỏi */}
      <div className="question-list">
        {questions.map((question) => (
          <div className="question-item" key={question.id}>
            {editQuestionId === question.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <input
                  type="text"
                  value={editDetails}
                  onChange={(e) => setEditDetails(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditQuestionId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <div className="question-text" onClick={() => handleViewDetails(question.id)}>
                  {question.text}
                </div>
                {viewDetailsId === question.id && <div className="question-details">{question.details}</div>}
                <div className="action-buttons">
                  <button onClick={() => handleEdit(question.id)}>Edit</button>
                  <button onClick={() => handleDelete(question.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
