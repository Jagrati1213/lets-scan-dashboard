import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { Axios } from "../../global";
import { orderGraphResponseT } from "../../types/index";
import { Col, message, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  scales,
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
  date: string;
  totalOrders: number;
  totalAmount: number;
};

const StatisticsGraph: React.FC = () => {
  const [data, setData] = useState<OrderData[]>([]);

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

  const labels = data.map((d) => d.date);
  const totalOrders = data.map((d) => d.totalOrders);
  const noOrdersOnDate = totalOrders.every((value) => value === 0);

  const totalAmount = data.map((d) => d.totalAmount);
  const noRevenueOnDate = totalOrders.every((value) => value === 0);

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
        {noOrdersOnDate && (
          <div
            style={{
              textAlign: "center",
              color: "red",
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            "NO ORDERS IN RELEVANT DATES"
          </div>
        )}
        <Bar options={ordersOptions} data={barOrderData} />
      </Col>

      <Col span={24} md={12}>
        {noRevenueOnDate && (
          <div
            style={{
              textAlign: "center",
              color: "red",
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            "NO REVENUE IN RELEVANT DATES"
          </div>
        )}
        <Bar options={revenueOptions} data={barRevenueData} />
      </Col>
    </Row>
  );
};

export default StatisticsGraph;
