import { Col, PaginationProps, Row, Table, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { orderItemT, transitionItemT } from "../../types";
import { useSearchParams } from "react-router-dom";
import Style from "../../styles/_Payment.module.scss";
import { fetchTransitionsAction } from "../../store/slices/transitionSlice";

const { Title, Text } = Typography;

export default function Transitions() {
  const {
    transitions,
    totalCount,
    loading,
  }: { transitions: transitionItemT[]; totalCount: number; loading: boolean } =
    useAppSelector((store) => store.transitionSlice);
  const dispatch = useAppDispatch();

  // STATE
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 5,
    total: totalCount,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
  });

  // TABLE COLUMNS
  const columns = [
    {
      title: "PaymentID",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Razorpay OrderId",
      dataIndex: "razorpay_order_id",
      key: "razorpay_order_id",
      render: (note: string | undefined) => {
        return note ? <Text>{note}</Text> : "-";
      },
    },
    {
      title: "Razorpay PaymentId",
      dataIndex: "razorpay_payment_id",
      key: "razorpay_payment_id",
    },
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: "Payment Status",
      dataIndex: "success",
      key: "success",
      render: () => <Tag color="green">Success</Tag>,
    },
  ];

  // HANDLE PAGINATION
  const handlePagination = (pagination: PaginationProps) => {
    setPagination(pagination);
  };

  // CALLED GET ORDER API
  useEffect(() => {
    const type = searchParams.get("type");
    dispatch(fetchTransitionsAction());
  }, [
    searchParams.get("type"),
    pagination.current,
    pagination.pageSize,
    dispatch,
  ]);

  // UPDATE PAGINATION TOTAL WHEN TOTAL-ORDER CHANGES
  useEffect(() => {
    setPagination((prev) => ({ ...prev, total: totalCount }));
  }, [totalCount]);

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
            dataSource={transitions}
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
