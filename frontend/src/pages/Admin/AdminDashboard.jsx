import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const StatCard = ({ icon, label, value, isLoading, isError }) => (
  <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
    <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
      {icon}
    </div>
    <p className="mt-5">{label}</p>
    <h1 className="text-xl font-bold">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <span className="text-red-400 text-sm">Failed to load</span>
      ) : (
        value
      )}
    </h1>
  </div>
);

const AdminDashboard = () => {
  const {
    data: sales,
    isLoading: salesLoading,
    isError: salesError,
  } = useGetTotalSalesQuery();
  const {
    data: customers,
    isLoading: customersLoading,
    isError: customersError,
  } = useGetUsersQuery();
  const {
    data: orders,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "bar",
      },
      theme: {             
      mode: "dark",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail && salesDetail.length > 0) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  const hasChartData = state.series[0]?.data?.length > 0;

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem] text-white">
        <div className="w-[80%] flex justify-around flex-wrap">
          <StatCard
            icon="$"
            label="Sales"
            value={`$ ${sales?.totalSales?.toFixed(2) ?? "0.00"}`}
            isLoading={salesLoading}
            isError={salesError}
          />
          <StatCard
            icon="👤"
            label="Customers"
            value={customers?.length ?? 0}
            isLoading={customersLoading}
            isError={customersError}
          />
          <StatCard
            icon="📦"
            label="All Orders"
            value={orders?.totalOrders ?? 0}
            isLoading={ordersLoading}
            isError={ordersError}
          />
        </div>

        <div className="ml-[10rem] mt-[4rem]">
          {hasChartData ? (
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="70%"
            />
          ) : (
            <p className="text-gray-400">No sales data to display yet.</p>
          )}
        </div>

        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;