import { Button, Col, Form, Row, Select } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFilter } from "react-icons/bs";
const { Option } = Select;

const Filter = () => {
  const [isShowFilterItems, setIsShowFilterItems] = useState(false);
  const { t } = useTranslation();
  return (
    <>
      <div className="block md:hidden">
        <Row justify="space-between">
          <Col md={3} xs={6}>
            <Form.Item label="">
              <Select defaultValue="All">
                <Option value="*">{t("all")}</Option>
                <Option value="makeup">{t("favorite")}</Option>
                <Option value="barber">Recommended</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col md={3} xs={6}>
            <button
              onClick={() => setIsShowFilterItems(!isShowFilterItems)}
              className="flex items-center rounded-lg text-[#8C8C8C] text-sm border-[0.5px] w-[100%] h-8 px-2.5 border-[#d9d9d9]"
            >
              <BsFilter className="text-lg mr-3" /> Filters
            </button>
          </Col>
        </Row>
      </div>

      <div
        className={`${isShowFilterItems ? "block" : "hidden"} md:block`}
      >
        <Form layout="vertical">
          <Row gutter={26}>
            <Col md={5} xs={24}>
              <Form.Item label="Profession">
                <Select defaultValue="All">
                  <Option value="*">All</Option>
                  <Option value="makeup">Make up artist</Option>
                  <Option value="barber">Barber</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={5} xs={24}>
              <Form.Item label="Category">
                <Select defaultValue="All">
                  <Option value="*">All</Option>
                  <Option>Make up artist</Option>
                  <Option>Barber</Option>
                </Select>
              </Form.Item>
            </Col>{" "}
            <Col md={5} xs={24}>
              <Form.Item label="Organization">
                <Select defaultValue="All">
                  <Option value="*">All</Option>
                  <Option>Salon 1</Option>
                  <Option>Salon 2 </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={5} xs={24}>
              <Form.Item label="Gender">
                <Select defaultValue="Both">
                  <Option value="both">Hər ikisi</Option>
                  <Option value="FEMALE">Qadın</Option>
                  <Option value="MALE">Kişi</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col md={4}>
              <div className="hidden md:flex">
                <Form.Item label=" ">
                  <Button className="clear-btn">Clear</Button>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Filter;
