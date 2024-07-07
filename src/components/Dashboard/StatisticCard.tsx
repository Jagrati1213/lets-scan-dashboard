import { Card, Statistic } from "antd";
import React from "react";
import Style from "../../styles/_Statistic.module.scss";
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
          className={Style.staticCard}
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
