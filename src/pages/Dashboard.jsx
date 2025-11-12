import { useState, useEffect } from 'react';
import { addSleepTracker, getAllSleepTracker } from '../services/sleepTrackerService';
import { addEatTracker, getAllEatTracker } from '../services/eatTrackerService';
import { addScreenTime, getAllScreenTime } from '../services/screenTimeTrackerService';
import { GiNightSleep } from "react-icons/gi";
import { GiKnifeFork } from "react-icons/gi";
import { FaClock } from "react-icons/fa";

export const Dashboard = () => {
  const [sleep, setSleep] = useState({
    sleep_start: 23,
    sleep_end: 0,
  });
  const [meal, setMeal] = useState('');
  const [screenTime, setScreenTime] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

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
        date: date,
      };
      
      await addSleepTracker(data);
      setMessage('Sleep data saved!');
      setMessageType('success');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);

      setSleep({
        sleep_start: 23,
        sleep_end: 0,
      });
      // generateReminder();
    } catch (error) {
      const errMessage = error?.response?.data?.error || 'Error saving sleep data!';
      setMessage(errMessage);
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      setSleep({
        sleep_start: 23,
        sleep_end: 0,
      });
    }
  };

  const saveMealsData = async () => {
    try {
      const data = {
        meal_type: meal,
        date: date,
      };
      
      await addEatTracker(data);
      setMessage('Meal data saved!');
      setMessageType('success');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);

      setMeal('');
      // generateReminder();
    } catch (error) {
      const errMessage = error?.response?.data?.error || 'Error saving meal data!';
      setMessage(errMessage);
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      setMeal('');
    }
  };

  const saveScreenTimeData = async () => {
    try {
      const data = {
        duration: parseInt(screenTime),
        date: date,
      };
      
      await addScreenTime(data);
      setMessage('Screen time data saved!');
      setMessageType('success');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);

      setScreenTime('');
      // generateReminder();
    } catch (error) {
      const errMessage = error?.response?.data?.error || 'Error saving meal data!';
      setMessage(errMessage);
      setMessageType('error');
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
      setScreenTime('');
    }
  };

  const [date, setDate] = useState('');
  <input
    type      = "date"
    value     = {date}
    onChange  = {(e) => setDate(e.target.value)}
    className = "px-4 py-2 border-gray-300 rounder-lg focus:outline-none focus:border-[#007DFC]"
  />


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

  return (
  <div className="max-w-3xl">
    <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

    {message && (
      <div
        className={`px-4 py-3 rounded mb-6 border ${
          messageType === 'success'
            ? 'bg-green-100 border-green-400 text-green-700'
            : 'bg-red-100 border-red-400 text-red-700'
        }`}
      >
        {message}
      </div>

    )}

    <div className="space-y-8">

      {/* SLEEP SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-md p-8 bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="p-2 bg-[#E6F0FF] rounded-full text-[#007DFC] shadow-sm">
            <GiNightSleep className="text-lg"/>
          </span>  
            What Time Did You Sleep?
          </h2>

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
                  const hour = 23 - i;
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
          className="bg-gradient-to-r font-bold mr-2 mt-13 mb-10 from-[#007DFC] to-[#00C4FF] text-white px-5 py-3 rounded-lg shadow hover:opacity-90 transition"
        >
          Save
        </button>
      </div>

      {/* MEALS SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-md p-8 bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="p-2 bg-[#E6F0FF] rounded-full text-[#007DFC] shadow-sm">
            <GiKnifeFork className="text-lg"/> 
          </span>  
            Which Meals Did You Have?
        </h2>


        <div className="flex flex-wrap gap-3">
          {['Breakfast', 'Lunch', 'Dinner'].map((m) => (
            <button
              key={m}
              onClick={() => setMeal(m)}
              className={`px-6 py-2 rounded-lg transition-colors ${
                meal === m
                  ? 'bg-[#007DFC] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <button
          onClick={saveMealsData}
          className="bg-gradient-to-r font-bold mr-2 mt-13 mb-10 from-[#007DFC] to-[#00C4FF] text-white px-5 py-3 rounded-lg shadow hover:opacity-90 transition"
        >
          Save
        </button>
      </div>

      {/* SCREEN TIME SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-md p-8 bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="p-2 bg-[#E6F0FF] rounded-full text-[#007DFC] shadow-sm">
            <FaClock className="text-lg"/>
          </span>  
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
          className="bg-gradient-to-r font-bold mr-2 mt-13 mb-10 from-[#007DFC] to-[#00C4FF] text-white px-5 py-3 rounded-lg shadow hover:opacity-90 transition"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);
}