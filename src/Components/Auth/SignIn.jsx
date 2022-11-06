import { Col, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BsArrowLeft } from "react-icons/bs";
import SignInForm from "./SignInForm";
import { useDispatch } from "react-redux";
import { onLogin } from "./auth.util";
import { setLoading } from "../../Redux/features/loadingSpinnerSlice";
import toast from "react-hot-toast";
import signInImg from "../../Assets/Images/signin.png";

const SignIn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleLogin = async (values, login) => {
    dispatch(setLoading(true));
    onLogin(values, dispatch, login)
      .then((res) => {
        if (res === "SUCCESS") {
          navigate("/");
        }
      })
      .catch((err) => {
        if (err?.status === 401) {
          toast.error(t("PasswordOrPhoneNotCorrect"));
        } else {
          err.response?.data.message &&
            toast.error(t(err.response?.data.message));
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <div className="flex flex-row ">
      <button onClick={() => navigate(-1)} className="arrow-container">
        <BsArrowLeft className="auth-icon" />
      </button>
      <div className="hidden flex-1 md:block">
        <img alt="" src={signInImg} className="h-screen object-cover" />
      </div>
      <div className="flex md:flex-1 w-full flex-col justify-center h-screen w-full">
        {/* <div className="bg-red-500"> */}
        <Row justify="center" className="w-full px-4">
          <SignInForm handleLogin={handleLogin} />
        </Row>
        <Row md={24} justify="center">
          <div className="text-[#8C8C8C] font-normal text-base pt-10 flex justify-center items-center text-center">
            {t("dont_have_account")}
            <b className="ml-1 text-primary-color">
              <Link to="/signup">{t("signup_long")}</Link>
            </b>
          </div>
        </Row>
        {/* <Row gutter={16}>
            <Col md={12}>
              <Button className="google-btn">
                <img src={google} alt="google" className="mr-2.5" /> Sign
                with Google
              </Button>
            </Col>
            <Col md={12}>
              <Button className="facebook-btn">
                <img src={facebook} alt="facebook" className="mr-2.5" />
                Sign with Facebook
              </Button>
            </Col>
          </Row> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default SignIn;
