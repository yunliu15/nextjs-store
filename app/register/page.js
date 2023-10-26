"use client";

import { redirect } from "next/navigation";

import RegisterForm from "../components/RegisterForm";
import { useCustomerContext } from "@/hooks/useCustomer";

const RegisterPage = () => {
  const { customer } = useCustomerContext();
  if (customer) {
    //redirect("/");
  }
  return <RegisterForm />;
};

export default RegisterPage;
