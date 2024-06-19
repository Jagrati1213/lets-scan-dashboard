import Title from "antd/es/typography/Title";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Col, Row, Space, Switch, Typography } from "antd";
import { useState } from "react";
import { updateShopAvailability } from "../../apis/user/updateShopAvailability";
import { setUserDetailsAction } from "../../store/slices/vendorSlice";

const { Text } = Typography;

export default function Dashboard() {
  const { vendor } = useAppSelector((store) => store.authSlice);
  const dispatch = useAppDispatch();
  const [shopIsOpen, setShopIsOpen] = useState(vendor?.isOpen || false);

  // CHANGE SHOP OPENING
  const handleShopAvailability = async (checked: boolean) => {
    setShopIsOpen(checked);
    const data = await updateShopAvailability(checked);
    if (!data) return;
    dispatch(setUserDetailsAction(data));
  };

  return (
    <Row justify={"space-between"} align={"middle"}>
      <Col>
        {vendor && <Title level={4}>Welcome, {vendor?.username} </Title>}
      </Col>
      <Col>
        <Space direction="vertical" align="center">
          <Text>OPEN YOUR SHOP</Text>
          <Switch value={shopIsOpen} onChange={handleShopAvailability} />
        </Space>
      </Col>
    </Row>
  );
}
