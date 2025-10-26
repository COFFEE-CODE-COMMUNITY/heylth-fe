import { useState, useEffect } from 'react';

export const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    // try {
    //   const { data, error } = await supabase
    //     .from('reminders')
    //     .select('*')
    //     .eq('user_id', user.id)
    //     .order('date', { ascending: false });

    //   if (error) throw error;
    //   setReminders(data || []);
    // } catch (error) {
    //   console.error('Error loading reminders:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-64">
  //       <div className="text-[#007DFC] text-xl">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Reminder</h1>

      {reminders.length === 0 ? (
        <div className="text-center text-gray-500 mt-12">
          No reminders yet. Complete your daily health data in the Dashboard to see reminders here!
        </div>
      ) : (
        <div className="space-y-8">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {formatDate(reminder.date)}
              </h2>

              <div className="space-y-3">
                {reminder.sleep_message && (
                  <div
                    className={`p-4 rounded-lg ${
                      reminder.sleep_status === 'good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {reminder.sleep_message}
                  </div>
                )}

                {reminder.meals_message && (
                  <div
                    className={`p-4 rounded-lg ${
                      reminder.meals_status === 'good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {reminder.meals_message}
                  </div>
                )}

                {reminder.screen_time_message && (
                  <div
                    className={`p-4 rounded-lg ${
                      reminder.screen_time_status === 'good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {reminder.screen_time_message}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
