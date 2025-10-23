import { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { supabase } from '../lib/supabase';

export const VisualData = () => {
  // const { user } = useAuth();
  const [avgSleepHours, setAvgSleepHours] = useState(0);
  const [avgMealsPerDay, setAvgMealsPerDay] = useState(0);
  const [avgScreenTime, setAvgScreenTime] = useState(0);
  const [lifestyleStatus, setLifestyleStatus] = useState({ status: 'Average', color: 'bg-yellow-500' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, [user]);

  const loadStatistics = async () => {
    // try {
    //   const { data, error } = await supabase
    //     .from('daily_health_data')
    //     .select('*')
    //     .eq('user_id', user.id)
    //     .order('date', { ascending: false })
    //     .limit(30);

    //   if (error) throw error;

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

  const calculateLifestyleStatus = (sleep, meals, screen) => {
    let score = 0;

    if (sleep >= 7 && sleep <= 9) score += 1;
    if (meals >= 3) score += 1;
    if (screen <= 6) score += 1;

    if (score === 3) {
      setLifestyleStatus({ status: 'Good', color: 'bg-green-500' });
    } else if (score === 2) {
      setLifestyleStatus({ status: 'Average', color: 'bg-yellow-500' });
    } else {
      setLifestyleStatus({ status: 'Bad', color: 'bg-red-500' });
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Visual Data</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg text-gray-600 mb-2">Average Sleep Hours</h2>
          <div className="text-4xl font-bold text-[#007DFC]">{avgSleepHours}</div>
          <div className="text-gray-500 mt-1">hours per night</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg text-gray-600 mb-2">Average Meals Per Day</h2>
          <div className="text-4xl font-bold text-[#007DFC]">{avgMealsPerDay}</div>
          <div className="text-gray-500 mt-1">meals daily</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg text-gray-600 mb-2">Average Screen Time</h2>
          <div className="text-4xl font-bold text-[#007DFC]">{avgScreenTime}</div>
          <div className="text-gray-500 mt-1">hours per day</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg text-gray-600 mb-2">Lifestyle Status</h2>
          <div className={`inline-block px-6 py-3 rounded-lg ${lifestyleStatus.color} text-white text-2xl font-bold mt-2`}>
            {lifestyleStatus.status}
          </div>
        </div>
      </div>
    </div>
  );
};
