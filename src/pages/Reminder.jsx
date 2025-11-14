import { useState, useEffect } from 'react';
import { findUserReminder } from '../services/reminderService';

export const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const res = await findUserReminder();
      console.log(res);
      setReminders(res || []);
    } catch (error) {
      console.error("An error occured:", error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#007DFC] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Reminder</h1>

      {reminders.length === 0 ? (
        <div className="text-center text-gray-500 mt-12">
          No reminders yet. Complete your daily health data in the Dashboard to see reminders here!
        </div>
      ) : (
        <div className="space-y-8">
          {reminders?.map((reminder) => (
            <div key={reminder.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {reminder.dayText}, {reminder.dayNumber} {reminder.month} {reminder.year}
              </h2>

              <div className="space-y-3">
                {reminder.sleepMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      reminder.sleepStatus.toLowerCase() === 'good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {reminder.sleepMessage}
                  </div>
                )}

                {reminder.eatMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      reminder.eatStatus.toLowerCase() === 'good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {reminder.eatMessage}
                  </div>
                )}

                {reminder.screenTimeMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      reminder.screenTimeStatus.toLowerCase() === 'good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {reminder.screenTimeMessage}
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
