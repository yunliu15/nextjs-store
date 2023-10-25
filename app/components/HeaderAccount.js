"use client";

import { useCustomerContext } from "@/hooks/useCustomer";
import Link from "next/link";

import { Button, Input } from "./ui";

const HeaderAccount = () => {
  const { customer, logout } = useCustomerContext();

  return (
    <>
      {customer ? (
        <>
          <div>Welcome, {customer?.firstName}!</div>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </>
  );
};

export default HeaderAccount;
