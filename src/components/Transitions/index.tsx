import { Col, PaginationProps, Row, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { orderItemT } from "../../types";
import { useSearchParams } from "react-router-dom";
import Style from "../../styles/_Payment.module.scss";

const { Title, Text } = Typography;

export default function Transitions() {
  const {
    orders,
    totalOrder,
    loading,
  }: { orders: orderItemT[]; totalOrder: number; loading: boolean } =
    useAppSelector((store) => store.orderListSlice);
  const dispatch = useAppDispatch();

  // STATE
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  ];

  // HANDLE PAGINATION
  const handlePagination = (pagination: PaginationProps) => {
    setPagination(pagination);
  };

  // CALLED GET ORDER API
  useEffect(() => {
    const type = searchParams.get("type");
    // if (type)
    //   dispatch(
    //     fetchOrderListAction({
    //       param: type,
    //       page: pagination.current as number,
    //       size: pagination.pageSize as number,
    //     })
    //   );
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
    <div className={Style.payment_container}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>TRANSITIONS </Title>
        </Col>
        <Col span={24}>
          <Table
            className={Style.payment}
            columns={columns}
            dataSource={orders}
            rowKey="_id"
            scroll={{ x: 1500, y: 500 }}
            loading={loading}
            pagination={pagination}
            onChange={(pagination) =>
              handlePagination(pagination as PaginationProps)
            }
          />
        </Col>
      </Row>
    </div>
  );
}
