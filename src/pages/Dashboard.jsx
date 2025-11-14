import { useState, useEffect } from "react";
import { getAverageSleep } from "../services/sleepTrackerService";
import { countEatTracker } from "../services/eatTrackerService";
import { getAverageScreenTime } from "../services/screenTimeTrackerService";
import { getLifestyleStatus } from "../services/lifestyleStatusService";

export const Dashboard = () => {
  const [avgSleepHours, setAvgSleepHours] = useState(0);
  const [countBreakfast, setCountBreakfast] = useState(0);
  const [countLunch, setCountLunch] = useState(0);
  const [countDinner, setCountDinner] = useState(0);
  const [avgScreenTime, setAvgScreenTime] = useState(0);
  const [lifestyleStatus, setLifestyleStatus] = useState({
    status: "Average",
    color: "bg-yellow-500",
  });

  useEffect(() => {
    averageSleepHours();
    countMeal();
    averageScreenTime();
    lifestyleStatusSummary();
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
      if(!meal) {
        setCountBreakfast(0);
        setCountLunch(0);
        setCountDinner(0);
      }
      setCountBreakfast(meal.countBreakfast);
      setCountLunch(meal.countLunch);
      setCountDinner(meal.countDinner);
    } catch (error) {
      console.error("An error occured:", error.response.data.error);
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
      setLifestyleStatus({
        status: "Data Does Not Exist",
        color: "bg-gray-500",
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className="bg-white p-4 rounded-lg shadow-mb bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
          <h2 className="text-lg text-gray-600 mb-2">💤Average Sleep Hours</h2>
          <div className="text-3xl font-bold text-[#007DFC]">
            {avgSleepHours}
          </div>
          <div className="text-gray-500 mt-1">hours per night</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-mb bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
          <h1 className="text-xl mb-5 font-bold text-blue-400 text-gray-600 mb-2">
            🍴Average Meals Per Day
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {/* Breakfast */}
            <div className="bg-white p-4 rounded-lg shadow-mb">
              <h2 className="text-lg text-gray-600 mb-2">☀️Breakfast</h2>
              <div className="text-3xl font-bold text-[#007DFC]">
                {countBreakfast}
              </div>
              <div className="text-gray-500 mt-1">meals daily</div>
            </div>

            {/* Lunch */}
            <div className="bg-white p-4 rounded-lg shadow-mb">
              <h2 className="text-lg text-gray-600 mb-2">🥪Lunch</h2>
              <div className="text-3xl font-bold text-[#007DFC]">
                {countLunch}
              </div>
              <div className="text-gray-500 mt-1">meals daily</div>
            </div>

            {/* Dinner */}
            <div className="bg-white p-4 rounded-lg shadow-mb">
              <h2 className="text-lg text-gray-600 mb-2">🌙Dinner</h2>
              <div className="text-3xl font-bold text-[#007DFC]">
                {countDinner}
              </div>
              <div className="text-gray-500 mt-1">meals daily</div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-mb bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
          <h2 className="text-lg text-gray-600 mb-2">⌛Average Screen Time</h2>
          <div className="text-4xl font-bold text-[#007DFC]">
            {avgScreenTime}
          </div>
          <div className="text-gray-500 mt-1">hours per day</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-mb bg-gradient-to-b from-[#E1F1FE] via-[#FAFCFF] to-[#FFFF]">
          <h2 className="text-lg text-gray-600 mb-2">Lifestyle Status</h2>
          <div
            className={`inline-block px-4 py-2 rounded-lg ${lifestyleStatus.color} text-white text-xl font-bold mt-2`}
          >
            {lifestyleStatus.status}
          </div>
        </div>
      </div>
    </div>
  );
};
