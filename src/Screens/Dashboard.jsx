import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { useState } from "react";

const Dashboard = () => {
  const { Users } = useSelector((state) => state.UsersSlicer);
  const { AllBookings } = useSelector((state) => state.BookingSlicer);
  const { AllHotels } = useSelector((state) => state.HotelSlicer);

  const Cards = [
    {
      title: "Users",
      total: Users?.length,
      icon: "fa-user",
    },

    {
      title: "Booking",
      total: AllBookings?.length,
      icon: "fa-cart-shopping",
    },
    {
      title: "Guest Houses",
      total: AllHotels?.length,
      icon: "fa-cart-shopping",
    },
  ];
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "series-1",
        data: [60, 70, 91],
      },
    ],
  });
  return (
    <section className="p-4 flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {Cards.map((item, index) => (
          <div
            key={index}
            className="hover:bg-gray-200 bg-white hover:scale-110 duration-300 transition ease-linear cursor-pointer flex items-center justify-between shadow-lg p-4 rounded-md "
          >
            <div className=" ">
              <h1 className=" pb-4 text-2xl font-bold text-gray-800">
                {item.title}
              </h1>
              <p className="">
                total {item.title}:
                <span className="text-green-800"> {item.total} </span>
              </p>
            </div>
            <div className="text-3xl bg-purple-100 text-purple-600 p-3 rounded-md">
              <i className={`fa-solid  ${item.icon}`}></i>
            </div>
          </div>
        ))}
      </div>
      <div className="row">
        <div className="mixed-chart bg-white w-full ">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="line"
            width="100%"
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
