import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Switch,
  Typography,
} from "antd";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useState } from "react";
import { updateShopAvailability } from "../../apis/user/updateShopAvailability";
import { setUserDetailsAction } from "../../store/slices/vendorSlice";
import { FaCartArrowDown } from "react-icons/fa";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { HiUsers } from "react-icons/hi";
import { PiBowlFoodFill } from "react-icons/pi";
import { StatisticCard } from "./StatisticCard";
import StatisticsGraph from "./StatisticsGraph";
import Style from "../../styles/_Dashboard.module.scss";
import { letsScanWebsitePath } from "../../global";

const { Text, Title } = Typography;

export default function Dashboard() {
  const { vendor } = useAppSelector((store) => store.authSlice);
  const dispatch = useAppDispatch();
  const [shopIsOpen, setShopIsOpen] = useState<boolean>(
    vendor?.isOpen || false
  );
  const [loading, setLoading] = useState(false);

  // CHANGE SHOP OPENING
  const handleShopAvailability = async (checked: boolean) => {
    setLoading(true);
    try {
      const data = await updateShopAvailability(checked);
      if (!data) {
        setShopIsOpen(true);
        return;
      }
      dispatch(setUserDetailsAction(data));
      setShopIsOpen(checked);
    } catch (error: any) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.dashboard}>
      <Row justify={"space-between"} align={"middle"}>
        <Col>
          <Title level={4}>Welcome to Let's Scan </Title>
        </Col>
        <Col>
          <Row gutter={[20, 20]}>
            <Col>
              <Button
                type="primary"
                icon={<FaExternalLinkAlt />}
                href={`${letsScanWebsitePath}/menu/${vendor?._id}`}
                target="_blank"
              >
                View menu
              </Button>
            </Col>
            <Col>
              <Space direction="vertical" align="center">
                <Text>{shopIsOpen ? "CLOSE SHOP" : "OPEN SHOP"}</Text>
                <Switch
                  value={shopIsOpen}
                  onChange={handleShopAvailability}
                  loading={loading}
                />
              </Space>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />

      <Row justify={"start"} align={"middle"} gutter={[16, 20]}>
        <Col span={24}>
          <Row gutter={[16, 20]} justify={"center"}>
            <Col span={24} sm={12} md={6}>
              <StatisticCard
                title={"TOTAL ORDERS"}
                value={vendor?.totalOrders ? vendor?.totalOrders : 0}
                precision={0}
                color="#94618e"
                icon={<FaCartArrowDown />}
              />
            </Col>
            <Col span={24} sm={12} md={6}>
              <StatisticCard
                title={"TOTAL REVENUE"}
                value={vendor?.totalRevenue ? vendor?.totalRevenue : 0}
                precision={0}
                color="#94618e"
                icon={<HiMiniArrowTrendingUp />}
              />
            </Col>
            <Col span={24} sm={12} md={6}>
              <StatisticCard
                title={"UNIQUE CUSTOMER"}
                value={vendor?.totalCustomers ? vendor?.totalCustomers : 0}
                precision={0}
                color="#94618e"
                icon={<HiUsers />}
              />
            </Col>
            <Col span={24} sm={12} md={6}>
              <StatisticCard
                title={"BEST SELLING ITEM"}
                value={
                  vendor?.bestSell
                    ? vendor?.bestSell.toLowerCase()
                    : "no best sell item"
                }
                precision={0}
                color="#94618e"
                icon={<PiBowlFoodFill />}
              />
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Card title="STATUS" className={Style.staticContainer}>
            <StatisticsGraph />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
