import Title from "antd/es/typography/Title";
import React from "react";
import { useAppSelector } from "../../store/store";

export default function Dashboard() {
  const { user } = useAppSelector((store) => store.auth);

  return (
    <div>
      <Title level={4}>Welcome, {user?.username} </Title>
    </div>
  );
}
