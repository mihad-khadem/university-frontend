import { Button, Input, Form, Typography, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useLoginMutation } from "../redux/feature/auth/authApi";
import { useAppDispatch } from "../redux/redux.hooks";
import { setUser } from "../redux/feature/auth/authSlice";

const { Title } = Typography;

const Login = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const [login, { error }] = useLoginMutation();

  const onSubmit = async (data: { userId: string; password: string }) => {
    try {
      // console.log("✅Submitted Data:", data); // Check the form values
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      // Send login request and unwrap the response
      const res = await login(userInfo).unwrap();
      console.log("Login Response:", res);

      // Dispatch user data and token to Redux store
      dispatch(setUser({ user: {}, token: res.data.accessToken }));

      // Show success message
      message.success("Login successful! Welcome back.");
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login failed. Please check your credentials.");
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
      {/* Top Header */}
      <Title level={2} style={{ marginBottom: "40px" }}>
        University Management System
      </Title>

      {/* Login Form Container */}
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

        <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
          {/* User ID Field */}
          <Form.Item
            label="User ID"
            validateStatus={errors.userId ? "error" : ""}
            help={errors.userId?.message}
          >
            <Controller
              name="userId"
              control={control}
              rules={{ required: "User ID is required" }}
              render={({ field }) => (
                <Input placeholder="Enter your User ID" {...field} />
              )}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label="Password"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <Input.Password placeholder="Enter your password" {...field} />
              )}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>

        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>{error.message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
