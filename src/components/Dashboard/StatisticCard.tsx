import { Card, Statistic } from "antd";
import React from "react";

interface CardPropsT {
  icon: React.ReactNode;
  title: string;
  color: string;
  value: number | string | undefined;
  precision: number;
}
export function StatisticCard({
  icon,
  title,
  color,
  value,
  precision,
}: CardPropsT) {
  return (
    <div>
      <Card bordered={false}>
        <Statistic
          title={title}
          value={value}
          precision={precision}
          valueStyle={{ color: color }}
          prefix={icon}
        />
      </Card>
    </div>
  );
}
