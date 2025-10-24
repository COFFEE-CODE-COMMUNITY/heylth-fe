import { useState, useEffect } from 'react';
import { addSleepTracker, getAllSleepTracker } from '../services/sleepTrackerService';
import { getAllEatTracker } from '../services/eatTrackerService';
import { getAllScreenTime } from '../services/screenTimeTrackerService';

export const Dashboard = () => {
  const [sleep, setSleep] = useState({
    sleep_start: 23,
    sleep_end: 0,
  });
  const [meals, setMeals] = useState([]);
  const [screenTime, setScreenTime] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sleepData, eatDAData, screeData] = await Promise.all([
          getAllSleepTracker(),
          getAllEatTracker(),
          getAllScreenTime(),
        ]);

        setSleepStart(sleepData);
        
      } catch (error) {
        
      }
    };
    fetchData();
  }, []);

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

  const handleChange = (field, value) => {
    setSleep(prev => ({...prev, [field]: value}));
  };

  const saveSleepData = async () => {
    try {
      const data = {
        sleep_start: parseInt(sleep.sleep_start),
        sleep_end: parseInt(sleep.sleep_end),
      };
      
      await addSleepTracker(data);
      setMessage('Sleep data saved!');
      setTimeout(() => setMessage(''), 3000);
      // generateReminder();
    } catch (error) {
      console.error('Error saving sleep data:', error);
    } finally {
    }
  };

  const saveMealsData = async () => {
    try {
      const data = {
        
      }
      setMessage('Meals data saved!');
      setTimeout(() => setMessage(''), 3000);
      // generateReminder();
    } catch (error) {
      console.error('Error saving meals data:', error);
    }
  };

  const saveScreenTimeData = async () => {
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
    }
  };

  // const calculateSleepHours = (start, startPeriod, end, endPeriod) => {
  //   if (!start || !end) return 0;

  //   let [startHour, startMin] = start.split(':').map(Number);
  //   let [endHour, endMin] = end.split(':').map(Number);

  //   if (startPeriod === 'PM' && startHour !== 12) startHour += 12;
  //   if (startPeriod === 'AM' && startHour === 12) startHour = 0;
  //   if (endPeriod === 'PM' && endHour !== 12) endHour += 12;
  //   if (endPeriod === 'AM' && endHour === 12) endHour = 0;

  //   let totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
  //   if (totalMinutes < 0) totalMinutes += 24 * 60;

  //   return (totalMinutes / 60).toFixed(1);
  // };

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
                value={sleep.sleep_start}
                onChange={(e) => handleChange('sleep_start', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              >
                {[...Array(24)].map((_, i) => {
                  // console.log(i);
                  const hour = 23 - i;
                  // console.log(hour)
                  const formattedHour = hour.toString().padStart(2, '0');
                  return (
                    <option key={hour} value={`${formattedHour}`}>
                      {formattedHour}:00
                    </option>
                  )
                })}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Sleep End</label>
            <div className="flex gap-2">
              <select
                value={sleep.sleep_end}
                onChange={(e) => handleChange('sleep_end', e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007DFC]"
              >
                {[...Array(24)].map((_, i) => {
                  const hour = i.toString().padStart(2, '0');
                  return (
                    <option key={i} value={`${hour}`}>
                      {hour}:00
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={saveSleepData}
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
          className="mt-4 bg-[#007DFC] text-white px-6 py-2 rounded-lg hover:bg-[#0066cc] transition-colors disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);
}