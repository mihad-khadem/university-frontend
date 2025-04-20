// pages/Login.tsx
import { Button, Typography } from "antd";
import { useLoginMutation } from "../redux/feature/auth/authApi";
import { useAppDispatch } from "../redux/redux.hooks";
import { setUser, TUser } from "../redux/feature/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
import { toast } from "sonner";
import Form from "../components/form/Form";
import FormInput from "../components/form/FormInput";

const { Title } = Typography;

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: { userId: string; password: string }) => {
    // console.log("✅ Submitted Data:", data);
    toast.loading("Logging in...", { id: "login", duration: 1000 });
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate(`/${user.role}/dashboard`);
      toast.success("Login successful!", { id: "login", duration: 1000 });
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed! Please check your credentials.", {
        id: "login",
        duration: 2000,
      });
    }
  };

  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Title level={2} style={{ marginBottom: "40px" }}>
        University Management System
      </Title>

      <div
        className="login-form"
        style={{
          width: "320px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Title level={3} style={{ marginBottom: "20px" }}>
          Login
        </Title>

        <Form onSubmit={onSubmit}>
          <FormInput
            name="userId"
            type="text"
            label="User ID"
            placeholder="Enter your User ID"
          />
          <FormInput
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
          />
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {error?.message as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
