import { cn } from "@/lib/cn";
import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type SecondaryButtonBase = {
  children: ReactNode;
  className?: string;
};

type SecondaryButtonAsLink = SecondaryButtonBase & {
  href: string;
};

type SecondaryButtonAsButton = SecondaryButtonBase &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type SecondaryButtonProps =
  | SecondaryButtonAsLink
  | SecondaryButtonAsButton;

export const SecondaryButton = forwardRef<
  HTMLButtonElement,
  SecondaryButtonProps
>(function SecondaryButton(props, ref) {
  const { children, className } = props;
  const classes = cn("btn-secondary", className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as SecondaryButtonAsButton;
  return (
    <button ref={ref} type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
});
