import Title from "antd/es/typography/Title";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Card, Col, Row, Space, Switch, Typography } from "antd";
import { useState } from "react";
import { updateShopAvailability } from "../../apis/user/updateShopAvailability";
import { setUserDetailsAction } from "../../store/slices/vendorSlice";
import { FaBoxOpen } from "react-icons/fa";
import { StatisticCard } from "./StatisticCard";
import StatisticsGraph from "./StatisticsGraph";
import Style from "../../styles/_Dashboard.module.scss";

const { Text } = Typography;

export default function Dashboard() {
  const { vendor } = useAppSelector((store) => store.authSlice);
  const dispatch = useAppDispatch();
  const [shopIsOpen, setShopIsOpen] = useState<boolean>(
    vendor?.isOpen || false
  );

  // CHANGE SHOP OPENING
  const handleShopAvailability = async (checked: boolean) => {
    const data = await updateShopAvailability(checked);
    if (!data) {
      setShopIsOpen(true);
      return;
    }
    dispatch(setUserDetailsAction(data));
    setShopIsOpen(checked);
  };

  return (
    <div className={Style.dashboard}>
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          {vendor && <Title level={4}>Welcome, {vendor?.username} </Title>}
        </Col>
        <Col>
          <Space direction="vertical" align="center">
            <Text>{shopIsOpen ? "CLOSE SHOP" : "OPEN SHOP"}</Text>
            <Switch value={shopIsOpen} onChange={handleShopAvailability} />
          </Space>
        </Col>
      </Row>

      <Row justify={"start"} align={"middle"} gutter={[16, 20]}>
        <Col span={24}>
          <Row gutter={[16, 20]} justify={"center"}>
            <Col span={24} sm={12} md={6}>
              <StatisticCard
                title={"TOTAL ORDERS"}
                value={44}
                precision={0}
                color="#cf1322"
                icon={<FaBoxOpen />}
              />
            </Col>
            <Col span={24} sm={12} md={6}>
              <StatisticCard
                title={"TOTAL ORDERS"}
                value={44}
                precision={0}
                color="#cf1322"
                icon={<FaBoxOpen />}
              />
            </Col>
            <Col span={24} sm={12} md={6}>
              <StatisticCard
                title={"TOTAL ORDERS"}
                value={44}
                precision={0}
                color="#cf1322"
                icon={<FaBoxOpen />}
              />
            </Col>
            <Col span={24} sm={12} md={6}>
              <StatisticCard
                title={"TOTAL ORDERS"}
                value={44}
                precision={0}
                color="#cf1322"
                icon={<FaBoxOpen />}
              />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Card title="STATUS">
            <Row gutter={[16, 30]}>
              <Col>
                <StatisticsGraph />
              </Col>
              <Col>
                <StatisticsGraph />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
