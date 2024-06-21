import {
  Button,
  Col,
  Input,
  PaginationProps,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { orderItemT } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import { fetchOrderListAction } from "../../store/slices/orderListSlice";
import { useSearchParams } from "react-router-dom";

const { Text } = Typography;

export function OrderTable() {
  const { orders, totalOrder }: { orders: orderItemT[]; totalOrder: number } =
    useAppSelector((store) => store.orderListSlice);
  const dispatch = useAppDispatch();

  // STATE
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 5,
    total: totalOrder,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  });

  // TABLE COLUMNS
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
                <Tag style={{ fontWeight: "600", marginBottom: "0.6rem" }}>
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
              title="Enter OTP"
              description={<Input placeholder="Enter Code" />}
              okText="Verify"
              cancelText="Cancel"
            >
              <Button size="middle" type="primary">
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

  // HANDLE PAGINATION
  const handlePagination = (pagination: PaginationProps) => {
    setPagination(pagination);
  };

  // CALLED GET ORDER API
  useEffect(() => {
    const type = searchParams.get("type");
    if (type)
      dispatch(
        fetchOrderListAction({
          param: type,
          page: pagination.current as number,
          size: pagination.pageSize as number,
        })
      );
    console.log(pagination.total);
  }, [
    searchParams.get("type"),
    pagination.current,
    pagination.pageSize,
    dispatch,
  ]);

  // UPDATE PAGINATION TOTAL WHEN TOTAL-ORDER CHANGES
  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: totalOrder }));
  }, [totalOrder]);

  return (
    <div>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        scroll={{ x: 1500, y: 500 }}
        pagination={pagination}
        onChange={(pagination) =>
          handlePagination(pagination as PaginationProps)
        }
      />
    </div>
  );
}
