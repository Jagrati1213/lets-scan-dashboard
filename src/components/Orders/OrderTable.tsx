import {
  Button,
  Col,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { orderItemT } from "../../types";
import { useAppSelector } from "../../store/store";

const { Text } = Typography;

export function OrderTable() {
  const { orders }: { orders: orderItemT[] } = useAppSelector(
    (store) => store.orderListSlice
  );

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Customer Details",
      dataIndex: ["customer", "name"],
      key: "customerName",
      render: (name: string, record: orderItemT) => (
        <Row>
          <Col span={24}>
            <Text>{name.toUpperCase()}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{record.customer.email}</Text>
          </Col>
        </Row>
      ),
    },
    {
      title: "Order Items",
      dataIndex: "orderList",
      key: "orderList",
      render: (orderList: orderItemT["orderList"]) => (
        <>
          {orderList.map((item) => {
            return (
              <Space size="small" wrap key={item._id}>
                <Tag color={"purple"} style={{ fontWeight: "600" }}>
                  {item.name}
                </Tag>
              </Space>
            );
          })}
        </>
      ),
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (note: string | undefined) => {
        return note ? <Text>{note}</Text> : "-";
      },
    },
    {
      title: "Token",
      dataIndex: "orderToken",
      key: "orderToken",
    },
    {
      title: "Table No",
      dataIndex: "tableNumber",
      key: "tableNumber",
      render: (tableNo: string | undefined) => {
        return tableNo ? <Text>{tableNo}</Text> : "-";
      },
    },
    {
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "paymentId",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text: string) => (
        <>
          {text === "Placed" ? (
            <Popconfirm
              title="Verify the order before completion"
              description={<Input placeholder="Enter Code" />}
              okText="Verify"
              cancelText="Cancel"
            >
              <Button size="middle">
                {text == "Placed" ? "Pending" : "Confirmed"}
              </Button>
            </Popconfirm>
          ) : (
            <Tag color="green-inverse">Completed</Tag>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={orders} rowKey="_id" />
    </div>
  );
}
