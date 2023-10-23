"use client";

import { useCustomerContext } from "@/hooks/useCustomer";
import Link from "next/link";
const HeaderAccount = () => {
  const { customer } = useCustomerContext();

  return (
    <>
      {customer ? (
        <div>Welcome, {customer?.firstName}!</div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
};

export default HeaderAccount;
