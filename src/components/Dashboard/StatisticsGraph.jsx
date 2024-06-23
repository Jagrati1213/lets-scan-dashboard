import { Column } from "@ant-design/plots";

function StatisticsGraph() {
  const data = [
    { type: "1-3", value: 0.16 },
    { type: "4-10", value: 0.125 },
    { type: "11-30", value: 0.24 },
    { type: "31-60", value: 0.19 },
    { type: "1-3", value: 0.22 },
    { type: "3-10", value: 0.05 },
    { type: "10-30", value: 0.01 },
    { type: "30", value: 0.015 },
  ];
  const config = {
    data,
    xField: "type",
    yField: "value",
    style: {
      fill: ({ type }) => {
        if (type === "10-30分" || type === "30+分") {
          return "#22CBCC";
        }
        return "#2989FF";
      },
    },
    label: {
      text: (originData) => {
        const val = parseFloat(originData.value);
        if (val < 0.05) {
          return (val * 100).toFixed(1) + "%";
        }
        return "";
      },
      offset: 10,
    },
    legend: false,
  };
  return <Column {...config} />;
}

export default StatisticsGraph;
