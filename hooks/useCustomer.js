"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import Cookies from "js-cookie";

import { getCustomer } from "@/utils/shopify";
import { createDefaultContext } from "@/utils/context";

const useCustomerData = () => {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      let newtoken = Cookies.get("nextjs-store.access_token") || "";
      if (newtoken) {
        setIsLoading(true);
        const customer = await getCustomer(newtoken);

        if (customer) {
          setCustomer(customer);
        } else {
          setCustomer(null);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetToken = useCallback(() => {
    Cookies.remove("nextjs-store.access_token");
    Cookies.remove("nextjs-store.refresh_token");
  }, []);

  useEffect(() => {
    console.log("gettoken!!!!!");
    const getCustomerToken = () => {
      const customerToken = Cookies.get("nextjs-store.access_token") || "";
      if (customerToken) {
        setToken(customerToken);
      }
    };
    getCustomerToken();
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setIsLoading(true);
        const customer = await getCustomer(token);
        if (customer) {
          setCustomer(customer);
        } else {
          setCustomer(null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      fetchCustomer();
    }
  }, [token]);

  return {
    customer,
    refresh,
    token,
    isLoading,
    resetToken,
  };
};

const { Provider: CustomerProvider, useContextHook: useCustomerContext } =
  createDefaultContext("Customer", useCustomerData);

export { CustomerProvider, useCustomerContext };
