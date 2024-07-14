import React, { useEffect, useState } from "react";
import { Axios } from "../../global";
import { orderGraphResponseT } from "../../types/index";
import { Col, message, Row } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type OrderData = {
  month: number;
  totalOrders: number;
  totalAmount: number;
};

const StatisticsGraph: React.FC = () => {
  const [data, setData] = useState<OrderData[]>([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  useEffect(() => {
    fetchData();
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const fetchData = async () => {
    try {
      const todayDate = getTodayDate();
      const response = await Axios.get<orderGraphResponseT>(
        "api/v1/vendor/orders-graph",
        {
          params: {
            startDate: todayDate,
          },
        }
      );
      const { success, statusText, data } = response.data;
      if (success) {
        setData(data);
      } else {
        throw new Error(statusText);
      }
    } catch (error: any) {
      const errorMessage = error.response
        ? error.response.data.statusText
        : "An error occurred. Please try again.";
      message.error({
        content: errorMessage,
        duration: 1,
      });
      setData([]);
    }
  };

  // GRAPH STATES
  const ordersOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "ORDERS",
      },
    },
  };

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: "REVENUE",
      },
    },
  };

  const labels = months.map((d) => d);
  const totalOrders = labels.map(
    (label) =>
      data.find(({ month }) => month - 1 === months.indexOf(label))
        ?.totalOrders || 0
  );
  const noOrdersOnMonth = totalOrders.every((value) => value === 0);

  const totalAmount = labels.map(
    (label) =>
      data.find(({ month }) => month - 1 === months.indexOf(label))
        ?.totalAmount || 0
  );
  const noRevenueOnMonth = totalAmount.every((value) => value === 0);

  const barOrderData = {
    labels,
    datasets: [
      {
        label: "Total Order",
        data: totalOrders,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "#94618e",
      },
    ],
  };

  const barRevenueData = {
    labels,
    datasets: [
      {
        label: "Total Revenue",
        data: totalAmount,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "#49274a",
      },
    ],
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} md={12}>
        {noOrdersOnMonth && (
          <div
            style={{
              textAlign: "center",
              color: "red",
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            "NO ORDERS IN RELEVANT MONTHS"
          </div>
        )}
        <Bar options={ordersOptions} data={barOrderData} />
      </Col>

      <Col span={24} md={12}>
        {noRevenueOnMonth && (
          <div
            style={{
              textAlign: "center",
              color: "red",
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            "NO REVENUE IN RELEVANT MONTHS"
          </div>
        )}
        <Bar options={revenueOptions} data={barRevenueData} />
      </Col>
    </Row>
  );
};

export default StatisticsGraph;
