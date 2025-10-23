import { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { supabase } from '../lib/supabase';

export const Dashboard = () => {
  // const { user } = useAuth();
  const [sleepStart, setSleepStart] = useState('');
  const [sleepStartPeriod, setSleepStartPeriod] = useState('PM');
  const [sleepEnd, setSleepEnd] = useState('');
  const [sleepEndPeriod, setSleepEndPeriod] = useState('AM');
  const [meals, setMeals] = useState([]);
  const [screenTime, setScreenTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadTodayData();
  }, [user]);

  const loadTodayData = async () => {
    // try {
    //   const today = new Date().toISOString().split('T')[0];
    //   const { data, error } = await supabase
    //     .from('daily_health_data')
    //     .select('*')
    //     .eq('user_id', user.id)
    //     .eq('date', today)
    //     .maybeSingle();

    //   if (error) throw error;

    //   if (data) {
    //     setSleepStart(data.sleep_start || '');
    //     setSleepStartPeriod(data.sleep_start_period || 'PM');
    //     setSleepEnd(data.sleep_end || '');
    //     setSleepEndPeriod(data.sleep_end_period || 'AM');
    //     setMeals(data.meals || []);
    //     setScreenTime(data.screen_time_hours || '');
    //   }
    // } catch (error) {
    //   console.error('Error loading data:', error);
    // }
  };

  const saveSleepData = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];

      const sleepHours = calculateSleepHours(
        sleepStart,
        sleepStartPeriod,
        sleepEnd,
        sleepEndPeriod
      );

      const { error } = await supabase
        .from('daily_health_data')
        .upsert({
          user_id: user.id,
          date: today,
          sleep_start: sleepStart,
          sleep_start_period: sleepStartPeriod,
          sleep_end: sleepEnd,
          sleep_end_period: sleepEndPeriod,
          sleep_hours: sleepHours,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,date'
        });

      if (error) throw error;
      setMessage('Sleep data saved!');
      setTimeout(() => setMessage(''), 3000);
      generateReminder();
    } catch (error) {
      console.error('Error saving sleep data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveMealsData = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];

      const { error } = await supabase
        .from('daily_health_data')
        .upsert({
          user_id: user.id,
          date: today,
          meals: meals,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,date'
        });

      if (error) throw error;
      setMessage('Meals data saved!');
      setTimeout(() => setMessage(''), 3000);
      generateReminder();
    } catch (error) {
      console.error('Error saving meals data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveScreenTimeData = async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];

      const { error } = await supabase
        .from('daily_health_data')
        .upsert({
          user_id: user.id,
          date: today,
          screen_time_hours: parseFloat(screenTime) || 0,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,date'
        });

      if (error) throw error;
      setMessage('Screen time saved!');
      setTimeout(() => setMessage(''), 3000);
      generateReminder();
    } catch (error) {
      console.error('Error saving screen time:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSleepHours = (start, startPeriod, end, endPeriod) => {
    if (!start || !end) return 0;

    let [startHour, startMin] = start.split(':').map(Number);
    let [endHour, endMin] = end.split(':').map(Number);

    if (startPeriod === 'PM' && startHour !== 12) startHour += 12;
    if (startPeriod === 'AM' && startHour === 12) startHour = 0;
    if (endPeriod === 'PM' && endHour !== 12) endHour += 12;
    if (endPeriod === 'AM' && endHour === 12) endHour = 0;

    let totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    if (totalMinutes < 0) totalMinutes += 24 * 60;

    return (totalMinutes / 60).toFixed(1);
  };

  const generateReminder = async () => {
    // try {
    //   const today = new Date().toISOString().split('T')[0];

    //   const { data: healthData } = await supabase
    //     .from('daily_health_data')
    //     .select('*')
    //     .eq('user_id', user.id)
    //     .eq('date', today)
    //     .maybeSingle();

    //   if (!healthData) return;

    //   const sleepHours = healthData.sleep_hours || 0;
    //   const mealsCount = healthData.meals?.length || 0;
    //   const screenHours = healthData.screen_time_hours || 0;

    //   const sleepStatus = sleepHours >= 8 ? 'good' : 'bad';
    //   const sleepMessage = sleepHours >= 8
    //     ? 'Jam tidur kamu sudah bagus, pertahankan!'
    //     : 'Jam tidur kamu kurang, usahakan tidur lebih awal';

    //   const mealsStatus = mealsCount >= 3 ? 'good' : 'bad';
    //   const mealsMessage = mealsCount >= 3
    //     ? 'Pola makan kamu bagus, pertahankan yaa!'
    //     : 'Pola makan kamu hari ini kurang bagus, usahakan makan tepat waktu';

    //   const screenStatus = screenHours <= 6 ? 'good' : 'bad';
    //   const screenMessage = screenHours <= 6
    //     ? 'Screen time kamu sudah bagus, pertahankan dan jangan lupa istirahatkan mata kamu'
    //     : 'Screen time kamu terlalu banyak, istirahatkan mata kamu';

    //   await supabase
    //     .from('reminders')
    //     .upsert({
    //       user_id: user.id,
    //       date: today,
    //       sleep_status: sleepStatus,
    //       sleep_message: sleepMessage,
    //       meals_status: mealsStatus,
    //       meals_message: mealsMessage,
    //       screen_time_status: screenStatus,
    //       screen_time_message: screenMessage,
    //     }, {
    //       onConflict: 'user_id,date'
    //     });
    // } catch (error) {
    //   console.error('Error generating reminder:', error);
    // }
  };

  const toggleMeal = (meal) => {
    if (meals.includes(meal)) {
      setMeals(meals.filter((m) => m !== meal));
    } else {
      setMeals([...meals, meal]);
    }
  };

  const handleSubmit = async () => {
    await saveSleepData();
    await saveMealsData();
    await saveScreenTimeData();
  };

  return (
  <div className="max-w-3xl">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

    {message && (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        {message}
      </div>
    )}

    <div className="space-y-8">

      {/* SLEEP SECTION */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">What Time Did You Sleep?</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Sleep Start</label>
            <div className="flex gap-2">
              <select
                value={sleepStart}
                onChange={(e) => setSleepStart(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={`${i + 1}:00`}>
                    {i + 1}:00
                  </option>
                ))}
              </select>

              <select
                value={sleepStartPeriod}
                onChange={(e) => setSleepStartPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Sleep End</label>
            <div className="flex gap-2">
              <select
                value={sleepEnd}
                onChange={(e) => setSleepEnd(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={`${i + 1}:00`}>
                    {i + 1}:00
                  </option>
                ))}
              </select>

              <select
                value={sleepEndPeriod}
                onChange={(e) => setSleepEndPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={saveSleepData}
          disabled={loading}
          className="mt-4 bg-[#007DFC] text-white px-6 py-2 rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50"
        >
          Save
        </button>
      </div>

      {/* MEALS SECTION */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Which Meals Did You Have?</h2>

        <div className="flex flex-wrap gap-3">
          {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
            <button
              key={meal}
              onClick={() => toggleMeal(meal)}
              className={`px-6 py-2 rounded-lg transition-colors ${
                meals.includes(meal)
                  ? 'bg-[#007DFC] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {meal}
            </button>
          ))}
        </div>

        <button
          onClick={saveMealsData}
          disabled={loading}
          className="mt-4 bg-[#007DFC] text-white px-6 py-2 rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50"
        >
          Save
        </button>
      </div>

      {/* SCREEN TIME SECTION */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          How Many Hours Did You Spend on Screen?
        </h2>

        <div className="flex items-center gap-3">
          <input
            type="number"
            value={screenTime}
            onChange={(e) => setScreenTime(e.target.value)}
            min="0"
            step="0.5"
            className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
          />
          <span className="text-gray-700">Hours</span>
        </div>

        <button
          onClick={saveScreenTimeData}
          disabled={loading}
          className="mt-4 bg-[#007DFC] text-white px-6 py-2 rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50"
        >
          Save
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-[#007DFC] text-white py-3 rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50 font-semibold"
      >
        Submit All
      </button>
    </div>
  </div>
);
}