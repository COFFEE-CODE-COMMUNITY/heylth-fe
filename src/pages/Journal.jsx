import { useState, useEffect } from "react";
import { addJournal, getAllJournal } from "../services/journalTrackerService";
import { useNavigate } from "react-router-dom";

const moodOptions = [
  { value: "very_happy", label: "Very Happy", emoji: "😄" },
  { value: "happy", label: "Happy", emoji: "😊" },
  { value: "neutral", label: "Neutral", emoji: "😐" },
  { value: "sad", label: "Sad", emoji: "😢" },
  { value: "angry", label: "Angry", emoji: "😠" },
];

export const Journal = () => {
  const [modalData, setModalData] = useState({
    mood: "happy",
    title: "",
    description: "",
  });
  const [journals, setJournals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJournals();
  }, []);

  const loadJournals = async () => {
    try {
      const res = await getAllJournal();
      if (!res) return setJournals(null);
      setJournals(res);
    } catch (error) {
      const errMessage = error?.response?.data?.error;
      setError(errMessage);
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (journal = null) => {
    if (journal) {
      setEditingJournal(journal);
      setModalData({
        mood: journal.mood,
        title: journal.title,
        description: journal.description,
      });
    } else {
      setEditingJournal(null);
      setModalData({
        mood: "happy",
        title: "",
        description: "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingJournal(null);
    setModalData({
      mood: "happy",
      title: "",
      description: "",
    });
  };

  const handleChange = async (field, value) => {
    setModalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!modalData.title.trim()) return;
    setLoading(true);
    try {
      await addJournal(modalData);
      await loadJournals();
      setShowModal(false);
    } catch (error) {
      const errMessage = error?.response?.data?.error;
      setError(errMessage);
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const getMoodInfo = (moodValue) => {
    return moodOptions.find((m) => m.value === moodValue) || moodOptions[1];
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Journal</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#007DFC] text-white px-6 py-2 rounded-lg hover:bg-[#0066cc] transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {journals?.map((journal) => {
          const moodInfo = getMoodInfo(journal.mood);
          return (
            <div key={journal.id} className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-2">{moodInfo.emoji}</div>
              <div className="text-lg font-semibold text-[#007DFC] mb-2">
                {moodInfo.label}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {journal.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {journal.description}
              </p>
              <button
                onClick={() => handleOpenModal(journal)}
                className="text-[#007DFC] hover:underline"
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>

      {!journals && (
        <div className="text-center text-gray-500 mt-12">
          No journal entries yet. Click the Add button to create one!
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingJournal ? "Edit Journal" : "Create Note"}
            </h2>

            <div className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-gray-700 mb-2">Mood</label>
                <div className="grid grid-cols-5 gap-2">
                  {moodOptions.map((option) => (
                    <button
                      key={option.value}
                      value={option.value}
                      onClick={(e) => handleChange("mood", e.target.value)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        modalData.mood === option.value
                          ? "border-[#007DFC] bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="text-2xl">{option.emoji}</div>
                      <div className="text-xs mt-1">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={modalData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
                  placeholder="Enter a title..."
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={modalData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
                  placeholder="Describe your mood..."
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !modalData.title}
                className="flex-1 bg-[#007DFC] text-white py-2 rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editingJournal
                  ? "Save Changes"
                  : "Create Note"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
