import { FC, ButtonHTMLAttributes } from "react";
import { Link, LinkProps } from "next/link";
import cn from "clsx";

const Button = (props) => {
  const {
    variant = "primary",
    className,
    children,
    size = "medium",
    loading = false,
    fullWidth = false,
    disabled,
    xAlign = "center",
    href,
    ...restProps
  } = props;

  const Component = href ? Link : "button";

  if (href) {
    return <Link href={href || ""}>{children}</Link>;
  }

  return (
    <button disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
