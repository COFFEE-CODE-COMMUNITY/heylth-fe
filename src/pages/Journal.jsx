import { useState, useEffect } from 'react';

const moodOptions = [
  { value: 'very_happy', label: 'Very Happy', emoji: '😄' },
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'neutral', label: 'Neutral', emoji: '😐' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'angry', label: 'Angry', emoji: '😠' },
];

export const Journal = () => {
  const [journals, setJournals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingJournal, setEditingJournal] = useState(null);
  const [mood, setMood] = useState('happy');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJournals();
  }, []);

  const loadJournals = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('journals')
  //       .select('*')
  //       .eq('user_id', user.id)
  //       .order('date', { ascending: false });

  //     if (error) throw error;
  //     setJournals(data || []);
  //   } catch (error) {
  //     console.error('Error loading journals:', error);
  //   }
  };

  const handleOpenModal = (journal = null) => {
    if (journal) {
      setEditingJournal(journal);
      setMood(journal.mood);
      setTitle(journal.title);
      setDescription(journal.description || '');
    } else {
      setEditingJournal(null);
      setMood('happy');
      setTitle('');
      setDescription('');
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingJournal(null);
    setMood('happy');
    setTitle('');
    setDescription('');
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    setLoading(true);
  //   try {
  //     if (editingJournal) {
  //       const { error } = await supabase
  //         .from('journals')
  //         .update({
  //           mood,
  //           title,
  //           description,
  //           updated_at: new Date().toISOString(),
  //         })
  //         .eq('id', editingJournal.id);

  //       if (error) throw error;
  //     } else {
  //       const { error } = await supabase
  //         .from('journals')
  //         .insert([
  //           {
  //             user_id: user.id,
  //             mood,
  //             title,
  //             description,
  //             date: new Date().toISOString().split('T')[0],
  //           },
  //         ]);

  //       if (error) throw error;
  //     }

  //     await loadJournals();
  //     handleCloseModal();
  //   } catch (error) {
  //     console.error('Error saving journal:', error);
  //   } finally {
  //     setLoading(false);
  //   }
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
        {journals.map((journal) => {
          const moodInfo = getMoodInfo(journal.mood);
          return (
            <div key={journal.id} className="bg-white p-6 rounded-lg shadow">
              <div className="text-4xl mb-2">{moodInfo.emoji}</div>
              <div className="text-lg font-semibold text-[#007DFC] mb-2">
                {moodInfo.label}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{journal.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{journal.description}</p>
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

      {journals.length === 0 && (
        <div className="text-center text-gray-500 mt-12">
          No journal entries yet. Click the Add button to create one!
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingJournal ? 'Edit Journal' : 'Create Note'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Mood</label>
                <div className="grid grid-cols-5 gap-2">
                  {moodOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setMood(option.value)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        mood === option.value
                          ? 'border-[#007DFC] bg-blue-50'
                          : 'border-gray-300 hover:border-gray-400'
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
                  placeholder="Enter a title..."
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                disabled={loading || !title.trim()}
                className="flex-1 bg-[#007DFC] text-white py-2 rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50"
              >
                {loading
                  ? 'Saving...'
                  : editingJournal
                  ? 'Save Changes'
                  : 'Create Note'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
