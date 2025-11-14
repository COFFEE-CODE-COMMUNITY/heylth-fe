import { useState, useEffect } from 'react';
import { getAverageSleep } from '../services/sleepTrackerService';
import { countEatTracker } from '../services/eatTrackerService';
import { getAverageScreenTime } from '../services/screenTimeTrackerService';
import { getLifestyleStatus } from '../services/lifestyleStatusService';

export const VisualData = () => {
  const [avgSleepHours, setAvgSleepHours] = useState(0);
  const [avgMealsPerDay, setAvgMealsPerDay] = useState(0);
  const [avgScreenTime, setAvgScreenTime] = useState(0);
  const [lifestyleStatus, setLifestyleStatus] = useState({ status: 'Average', color: 'bg-yellow-500' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    averageSleepHours();
    countMeal();
    averageScreenTime();
    lifestyleStatusSummary();
    // loadStatistics();
  }, []);

  const averageSleepHours = async () => {
    try {
      const avgSleep = await getAverageSleep();
      if (avgSleep && avgSleep.average_sleep !== undefined) {
        setAvgSleepHours(avgSleep.average_sleep);
      } else {
        setAvgSleepHours(0); // default jika data kosong
      }
    } catch (error) {
      console.error("An error occured:", error.response.data.error);
      setAvgSleepHours(0); // fallback biar UI tetap jalan
    }
  };
  
  const countMeal = async () => {
    try {
      const meal = await countEatTracker();
      if (meal && meal.count_meal !== undefined) {
        setAvgMealsPerDay(meal.count_meal);
      } else {
        setAvgMealsPerDay(0);
      }
    } catch (error) {
      console.error("An error occured:", error.response.data.error);
      setAvgMealsPerDay(0);
    }
  };
  
  const averageScreenTime = async () => {
    try {
      const avgScreenTime = await getAverageScreenTime();
      if (avgScreenTime && avgScreenTime.average_screen_time !== undefined) {
        setAvgScreenTime(avgScreenTime.average_screen_time);
      } else {
        setAvgScreenTime(0);
      }
    } catch (error) {
      console.error("An error occured:", error.response.data.error);
      setAvgScreenTime(0);
    }
  };
  

  const lifestyleStatusSummary = async () => {
    try {
      const lifestyle = await getLifestyleStatus();
      setLifestyleStatus({ status: lifestyle.status, color: lifestyle.color });
    } catch (error) {
      setLifestyleStatus({ status: 'Data Does Not Exist', color: 'bg-gray-500' });
    }
  }

  const loadStatistics = async () => {
    // try {

    //   if (data && data.length > 0) {
    //     const totalSleep = data.reduce((sum, d) => sum + (parseFloat(d.sleep_hours) || 0), 0);
    //     const avgSleep = (totalSleep / data.length).toFixed(1);
    //     setAvgSleepHours(avgSleep);

    //     const totalMeals = data.reduce((sum, d) => sum + (d.meals?.length || 0), 0);
    //     const avgMeals = (totalMeals / data.length).toFixed(1);
    //     setAvgMealsPerDay(avgMeals);

    //     const totalScreen = data.reduce((sum, d) => sum + (parseFloat(d.screen_time_hours) || 0), 0);
    //     const avgScreen = (totalScreen / data.length).toFixed(1);
    //     setAvgScreenTime(avgScreen);

    //     calculateLifestyleStatus(avgSleep, avgMeals, avgScreen);
    //   }
    // } catch (error) {
    //   console.error('Error loading statistics:', error);
    // } finally {
    //   setLoading(false);
    // }
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Visual Data</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Average Sleep */}
        <div className="bg-white p-4 rounded-lg shadow-mb bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
          <h2 className="text-lg text-gray-600 mb-2">💤 Average Sleep Hours</h2>
          <div className="text-3xl font-bold text-[#007DFC]">{avgSleepHours}</div>
          <div className="text-gray-500 mt-1">hours per night</div>
        </div>

        {/* Header Average Meals (pindah ke bawah sleep) */}
        <div>
          <h1 className="text-xl mb-5 font-bold text-blue-400">🍴 Average Meals Per Day</h1>
          
          {/* Breakfast, Lunch, Dinner dalam 1 baris */}
          <div className="grid grid-cols-3 gap-4">

            {/* Breakfast */}
            <div className="bg-white p-4 rounded-lg shadow-mb bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
              <h2 className="text-lg text-gray-600 mb-2">☀️Breakfast</h2>
              <div className="text-3xl font-bold text-[#007DFC]">{avgMealsPerDay}</div>
              <div className="text-gray-500 mt-1">meals daily</div>
            </div>

            {/* Lunch */}
            <div className="bg-white p-4 rounded-lg shadow-mb bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
              <h2 className="text-lg text-gray-600 mb-2">🥪Lunch</h2>
              <div className="text-3xl font-bold text-[#007DFC]">{avgMealsPerDay}</div>
              <div className="text-gray-500 mt-1">meals daily</div>
            </div>

            {/* Dinner */}
            <div className="bg-white p-4 rounded-lg shadow-mb bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
              <h2 className="text-lg text-gray-600 mb-2">🌙Dinner</h2>
              <div className="text-3xl font-bold text-[#007DFC]">{avgMealsPerDay}</div>
              <div className="text-gray-500 mt-1">meals daily</div>
            </div>

          </div>
        </div>

        {/* Screen Time */}
        <div className="bg-white p-4 rounded-lg shadow-mb bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
          <h2 className="text-lg text-gray-600 mb-2">⌛ Average Screen Time</h2>
          <div className="text-4xl font-bold text-[#007DFC]">{avgScreenTime}</div>
          <div className="text-gray-500 mt-1">hours per day</div>
        </div>

        {/* Lifestyle Status */}
        <div className="bg-white p-4 rounded-lg shadow-mb bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
          <h2 className="text-lg text-gray-600 mb-2">Lifestyle Status</h2>
          <div className={`inline-block px-4 py-2 rounded-lg ${lifestyleStatus.color} text-white text-xl font-bold mt-2`}>
            {lifestyleStatus.status}
          </div>
        </div>

      </div>
          </div>
        );
      };
