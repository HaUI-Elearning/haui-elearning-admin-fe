import React, { useEffect, useState } from "react";
import { Table, Select, Space, Tag, Typography, Empty, Modal, Button, Image } from "antd";
import axios from "axios";

const { Option } = Select;
const { Title } = Typography;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [visible, setVisible] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const fetchOrders = async (current = 1, pageSize = 10, status = null) => {
    const safePageSize = pageSize > 0 ? pageSize : 10;

    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/Admin/order/getAll",
        {
          params: {
            current,
            pageSize: safePageSize,
            ...(status ? { Status: status } : {}),
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const rawData = response?.data?.data;

      if (!rawData || !rawData.result || !rawData.meta) {
        console.warn("❗ Invalid API response:", rawData);
        setOrders([]);
        setPagination({ current: 1, pageSize: 10, total: 0 });
      } else {
        const { result, meta } = rawData;
        setOrders(result);
        setPagination({
          current: meta.page,
          pageSize: meta.pageSize,
          total: meta.total,
        });
      }
    } catch (error) {
      console.error("❌ Error fetching orders", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1, pagination.pageSize, status);
  }, [status]);

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
    fetchOrders(newPagination.current, newPagination.pageSize, status);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const showCoursesModal = (courses) => {
    setSelectedCourses(courses);
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSelectedCourses([]);
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text) => (
        <Tag color={text === "paid" ? "green" : "red"}>
          {text.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) =>
        new Intl.NumberFormat("vi-VN").format(value) + "₫",
    },
    {
      title: "Courses",
      dataIndex: "coursesInOrder",
      key: "coursesInOrder",
      align: "center",
      render: (courses) =>
        Array.isArray(courses) && courses.length > 0 ? (
          <Button type="link" onClick={() => showCoursesModal(courses)} style={{  }} >
            View Details
          </Button>
        ) : (
          <em>No course</em>
        ),
    },
  ];

  return (
    <div>
      <Title level={3}>Order List</Title>
      <Space style={{ marginBottom: 16 }}>
        <Select
          placeholder="Select status"
          onChange={handleStatusChange}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="paid">Paid</Option>
          <Option value="failed">Failed</Option>
        </Select>
      </Space>

      {orders.length === 0 && !loading ? (
        <Empty description="No orders found for the selected status." />
      ) : (
        <Table
          columns={columns}
          dataSource={orders}
          rowKey={(record) => record.orderId || record.id}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      )}

      {/* Course details modal */}
      <Modal
        title="Course Details"
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedCourses.map((course) => (
          <div
            key={course.courseId}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 16,
              borderBottom: "1px solid #f0f0f0",
              paddingBottom: 8,
              gap: 30,
            }}
          >
            <Image
              src={course.thumbnail}
              alt={course.thumbnail}
              width={80}
              height={60}
              style={{ objectFit: "cover", marginRight: 10 }}
              fallback="No+Image"
            />
            <div>
              <strong>{course.name}</strong>
              <p>Author: {course.author || "Unknown"}</p>
              <p>
                Price:{" "}
                {new Intl.NumberFormat("vi-VN").format(course.price || 0)}₫
              </p>
            </div>
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default OrderList;
