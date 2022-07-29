/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useGetProductQuery } from "../services/apiurl";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Button, Card, Avatar, Badge, Rate } from "antd";
import { DeleteFilled, UserOutlined } from "@ant-design/icons";

function SingleProduct({ item }) {
  const { Meta } = Card;
  const { Text, Title } = Typography;

  return (
    <>
      <Link to={`/product/${item.id}`}>
        <Card
          hoverable
          style={{
            width: 400,
          }}
          cover={<img className="img-fluid" src={item.image} alt="ffff" />}
        >
          <Avatar
            size={50}
            className="position-absolute top-5 start-100 translate-middle badge rounded-pill bg-danger -ml-6"
            icon={"sale"}
          />
          <p className="text-start">{item.title}</p>
          <Rate disabled defaultValue={5} className="text-start" />

          <div id="block_container" className="position-relative">
            <p className="position-absolute top-0 start-0">
              ${item.selling_price}
            </p>
            <p className="position-absolute top-100 start-100 -ml-3">
            <del>
              ${item.market_price}
              </del>

            </p>
           
          </div>
          {/* <Meta title={item.title} description="www.instagram.com" /> */}
        </Card>
      </Link>
    </>
  );
}

export default SingleProduct;
