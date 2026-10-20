import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonBase = {
  children: ReactNode;
  className?: string;
};

type PrimaryButtonAsLink = PrimaryButtonBase & {
  href: string;
};

type PrimaryButtonAsButton = PrimaryButtonBase &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type PrimaryButtonProps = PrimaryButtonAsLink | PrimaryButtonAsButton;

export function PrimaryButton(props: PrimaryButtonProps) {
  const { children, className } = props;
  const classes = cn("btn-primary", className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as PrimaryButtonAsButton;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
