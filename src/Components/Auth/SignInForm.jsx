import { Button, Col, Form, Input, Row, Select } from "antd";
import MaskedInput from "antd-mask-input";
// import signinImg from "../../Assets/Images/signin.png";
// import { useLoginMutation } from "../../Redux/services/AuthApi";
import { useLoginMutation } from "../../Redux/features/loginApiSlice";
// import { ACCESS_TOKEN } from "../../Config/config.constant";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../../Redux/features/loginSlice";
// import { setLoading } from "../../Redux/features/loadingSpinnerSlice";
// import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
const { Option } = Select;

const SignInForm = ({ handleLogin }) => {
  const [login] = useLoginMutation();
  const { t } = useTranslation();

  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue={"+994"}>
      <Select style={{ width: 100 }}>
        <Option value="+994">+994</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="max-w-[440px]">
      <h3 className="lg:text-5xl text-3xl font-normal leading-[72px]">
        {t("welcome_back")}
      </h3>
      <p className="text-lg font-light">
        <p className="m-0">{t("welcome_back")}!</p> 
        <p className="m-0">{t("please_enter_your_details")}</p>
      </p>
      <Form layout="vertical" onFinish={(values) => handleLogin(values, login)}>
        <Col md={24} lg={24}>
          <Form.Item
            label={t("phoneNumber")}
            name="phoneNumber"
            rules={[{ required: true, message: t("ThisFieldMustBeFilled") }]}
          >
            <MaskedInput
              autoComplete="new-phone"
              addonBefore={prefixSelector}
              placeholder="(XX) XXX XX XX"
              mask="(00) 000 00 00"
              name="phoneNumber"
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label={t("password")}
            name="password"
            type="password"
            autoComplete="current-password"
            rules={[{ required: true, message: t("ThisFieldMustBeFilled") }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
        <Row
          style={{
            justifyContent: "space-between",
          }}
        >
          <p className="mb-4">
            This site is protected by reCAPTCHA and the Google{" "}
            <a className="" href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
            apply.
          </p>
        </Row>
        <Col md={24} lg={24}>
          <Form.Item>
            <Button htmlType="submit" className="signin-btn">
              {t("login")}
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </div>
  );
};

export default SignInForm;
