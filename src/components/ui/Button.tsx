// src/components/ui/Button.tsx
import React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"ghost" };
export const Button: React.FC<Props> = ({ variant="primary", children, ...rest }) => {
  const base = "px-4 py-2 rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2";
  const primary = "bg-qatar text-white hover:opacity-90";
  const ghost = "bg-white text-qatar border border-qatar";
  return <button className={`${base} ${variant==="primary"? primary:ghost}`} {...rest}>{children}</button>;
};
