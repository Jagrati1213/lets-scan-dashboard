import {
  Button,
  Col,
  Input,
  InputNumber,
  InputNumberProps,
  PaginationProps,
  Popconfirm,
  Row,
  Table,
  Tag,
  Typography,
} from "antd";
import { orderItemT } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect, useState } from "react";
import {
  fetchOrderListAction,
  updateOrderItemAction,
} from "../../store/slices/orderListSlice";
import { useSearchParams } from "react-router-dom";
import Style from "../../styles/_OrderTable.module.scss";
import { valueType } from "antd/es/statistic/utils";
import { verifyOrderApi } from "../../apis/order/verifyOrder";

const { Text } = Typography;

export function OrderTable() {
  const {
    orders,
    totalOrder,
    loading,
  }: { orders: orderItemT[]; totalOrder: number; loading: boolean } =
    useAppSelector((store) => store.orderListSlice);
  const dispatch = useAppDispatch();

  // STATE
  const [searchParams, setSearchParams] = useSearchParams();
  const [verifyCode, setVerifyCode] = useState<valueType | null>(0);
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
      dataIndex: "customer",
      key: "customer",
      render: (record: orderItemT["customer"]) => (
        <Row>
          <Col span={24}>
            <Text>{record?.name.toUpperCase()}</Text>
          </Col>
          <Col span={24}>
            <Text type="secondary">{record?.email}</Text>
          </Col>
        </Row>
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
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text: string) => <Text>₹ {text}</Text>,
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text: string, order: orderItemT) => (
        <>
          {text === "Pending" ? (
            <Popconfirm
              title="Enter OTP"
              description={
                <InputNumber
                  size="large"
                  defaultValue={1}
                  onChange={onVerifyCodeChange}
                />
              }
              okText="Verify"
              cancelText="Cancel"
              onConfirm={handleVerifyOrderToConfirm.bind(null, order._id)}
            >
              <Button size="middle" type="primary">
                {text == "Pending" ? "Pending" : "Complete"}
              </Button>
            </Popconfirm>
          ) : (
            <Tag color="green-inverse">Completed</Tag>
          )}
        </>
      ),
    },
  ];

  // ORDER DETAILS COLUMNS
  const orderDetailsColumns = [
    {
      title: "Order Items",
      dataIndex: "menuId",
      key: "menuId",
      render: (menuId: { name: string; _id: string }) => (
        <Text key={menuId?._id}>{menuId?.name}</Text>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: string) => <Text>₹ {text}</Text>,
    },
  ];

  // HANDLE CHANGE CODE VALUE
  const onVerifyCodeChange: InputNumberProps["onChange"] = (value) => {
    setVerifyCode(value);
  };

  // HANDLE VERIFY
  const handleVerifyOrderToConfirm = async (orderId: string) => {
    try {
      if (!verifyCode) return;
      // CALLED API WITH CODE
      const data = await verifyOrderApi(verifyCode, orderId);
      if (!data) return;
      dispatch(updateOrderItemAction(data));

      // RE_FETCH ORDER TO UPDATE IN UI
      const type = searchParams.get("type");
      if (type) {
        dispatch(
          fetchOrderListAction({
            param: type,
            page: pagination.current as number,
            size: pagination.pageSize as number,
          })
        );
      }
    } catch (error) {
      return null;
    }
  };

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
        className={Style.orderTable}
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        scroll={{ x: 1500, y: 500 }}
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              className={Style.orderDetailsTable}
              columns={orderDetailsColumns}
              dataSource={record.orderList}
              pagination={false}
            />
          ),
        }}
        pagination={pagination}
        onChange={(pagination) =>
          handlePagination(pagination as PaginationProps)
        }
      />
    </div>
  );
}
