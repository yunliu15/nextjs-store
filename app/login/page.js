"use client";

import { redirect } from "next/navigation";

import LoginForm from "../components/LoginForm";
import { useCustomerContext } from "@/hooks/useCustomer";

const LoginPage = () => {
  const { customer } = useCustomerContext();
  if (customer) {
    //return redirect("/");
  }
  return <LoginForm />;
};

export default LoginPage;
