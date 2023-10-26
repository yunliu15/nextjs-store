"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { Button, Input } from "./ui";
import { useCustomerContext } from "@/hooks/useCustomer";
import { createAccount, createAccessToken } from "@/utils/shopify";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const { logout, refresh } = useCustomerContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const handleSignup = async () => {
    logout();
    if (!dirty && !disabled) {
      setDirty(true);
    }
    try {
      setLoading(true);
      setError(null);

      const values = getValues();
      const formInput = {
        input: {
          firstName: values.firstname || "",
          lastName: values.lastname || "",
          email: values.email || "",
          password: values.password || "",
        },
      };
      try {
        const result = await createAccount(formInput);
        if (result && result.customer) {
          const loginResult = await createAccessToken({
            input: {
              email: values.email || "",
              password: values.password || "",
            },
          });
          const expiresAt = loginResult.customerAccessToken.expiresAt;
          const epxires = expiresAt ? new Date(expiresAt) : "30";
          Cookies.set(
            "nextjs-store.access_token",
            loginResult.customerAccessToken.accessToken || "",
            { expires: epxires }
          );
        }
        refresh();
        router.replace("/");
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setError(e.errors[0]);
      setLoading(false);
      setDisabled(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <h2>Create an Account</h2>
      <div>
        <Input
          id="firstname"
          type="text"
          placeholder="First Name"
          name="firstname"
          required
          register={register}
          className="text-black"
        />
        <Input
          id="lasttname"
          type="text"
          placeholder="Last Name"
          name="lastname"
          required
          register={register}
          className="text-black"
        />
        <Input
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          required
          register={register}
          className="text-black"
        />
        <Input
          id="password"
          type={isShown ? "text" : "password"}
          placeholder="Password"
          name="password"
          required
          register={register}
          isError={!!errors.password}
          className="text-black"
        />
        <Button
          variant="primary"
          type="submit"
          loading={loading}
          disabled={disabled}
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
