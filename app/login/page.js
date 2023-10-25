import { redirect } from "next/navigation";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  redirect("/");
  return <LoginForm />;
};

export default LoginPage;
