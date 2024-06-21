import { Col, Row, Tabs, TabsProps, Typography } from "antd";
import Style from "../../styles/_Order.module.scss";
import { OrderTable } from "./OrderTable";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { fetchOrderListAction } from "../../store/slices/orderListSlice";

const { Title } = Typography;

export default function Orders() {
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const items: TabsProps["items"] = [
    {
      key: "pending",
      label: "Pending Orders",
      children: (
        <>
          <OrderTable />
        </>
      ),
    },
    {
      key: "complete",
      label: "Complete Orders",
      children: (
        <>
          <OrderTable />
        </>
      ),
    },
  ];

  const onOrderTabChange = useCallback(
    (key: string) => {
      setSearchParams({ type: key });
    },
    [searchParams]
  );

  // CALLED API
  useEffect(() => {
    const type = searchParams.get("type");
    if (type) dispatch(fetchOrderListAction(type));
  }, [searchParams.get("type")]);

  return (
    <div className={Style.order_container}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>ORDERS </Title>
        </Col>
        <Col span={24}>
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onOrderTabChange}
            className={Style.tab}
          />
        </Col>
      </Row>
    </div>
  );
}
