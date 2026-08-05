import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { FaRupeeSign, FaUsers, FaBoxOpen } from "react-icons/fa";

import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const StatCard = ({ icon, label, value, isLoading, isError, accent }) => (
  <div className="flex-1 min-w-[220px] bg-white rounded-2xl border border-[#E7E2D8] shadow-[0_2px_16px_0_rgba(46,94,78,0.07)] p-6">
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center text-lg mb-4"
      style={{ backgroundColor: accent, color: "#FFFFFF" }}
    >
      {icon}
    </div>
    <p className="text-sm text-[#707070] mb-1">{label}</p>
    <h2 className="font-display text-2xl font-semibold text-[#2B2B2B]">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <span className="text-[#C0392B] text-sm font-sans font-normal">
          Failed to load
        </span>
      ) : (
        value
      )}
    </h2>
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
        toolbar: { show: false },
        fontFamily: "Inter, sans-serif",
      },
      theme: {
        mode: "light",
      },
      tooltip: {
        theme: "light",
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "45%",
        },
      },
      colors: ["#2E5E4E"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
        colors: ["transparent"],
      },
      title: {
        text: "Sales Trend",
        align: "left",
        style: {
          fontFamily: "Fraunces, serif",
          fontSize: "20px",
          fontWeight: 600,
          color: "#2B2B2B",
        },
      },
      grid: {
        borderColor: "#E7E2D8",
        strokeDashArray: 4,
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
        labels: {
          style: { colors: "#707070" },
        },
        axisBorder: { color: "#E7E2D8" },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
        labels: {
          style: { colors: "#707070" },
        },
      },
      legend: {
        show: false,
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

      <section className="xl:ml-[6rem] md:ml-[2rem] px-6 pt-8 pb-16">
        <span className="inline-block text-xs font-semibold tracking-[0.2em] text-[#5F8D6B] uppercase mb-2">
          Admin
        </span>
        <h1 className="font-display text-3xl font-semibold text-[#2B2B2B] mb-8">
          Dashboard
        </h1>

        <div className="flex flex-wrap gap-5">
          <StatCard
            icon={<FaRupeeSign />}
            label="Total Sales"
            value={`₹ ${sales?.totalSales?.toFixed(2) ?? "0.00"}`}
            isLoading={salesLoading}
            isError={salesError}
            accent="#2E5E4E"
          />
          <StatCard
            icon={<FaUsers />}
            label="Customers"
            value={customers?.length ?? 0}
            isLoading={customersLoading}
            isError={customersError}
            accent="#5F8D6B"
          />
          <StatCard
            icon={<FaBoxOpen />}
            label="All Orders"
            value={orders?.totalOrders ?? 0}
            isLoading={ordersLoading}
            isError={ordersError}
            accent="#A67C52"
          />
        </div>

        <div className="mt-10 bg-white rounded-2xl border border-[#E7E2D8] shadow-[0_2px_16px_0_rgba(46,94,78,0.07)] p-6">
          {hasChartData ? (
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={340}
            />
          ) : (
            <p className="text-[#707070] py-10 text-center">
              No sales data to display yet.
            </p>
          )}
        </div>

        <div className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-[#2B2B2B] mb-4">
            Recent Orders
          </h2>
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;