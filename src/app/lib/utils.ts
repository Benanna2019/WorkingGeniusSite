import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, getDate } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DateProps = {
  timestamp?: number | string | null;
  locale?: string;
  year?: "numeric" | "2-digit";
  monthForm?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  dayForm?: "numeric" | "2-digit";
};

export function dateHelper({ timestamp = null }: DateProps) {
  const date = timestamp ? new Date(timestamp) : new Date();

  const day = getDate(date);
  const month = format(date, "MMM");
  return {
    day,
    month,
  };
}

type Props = {
  timestamp?: number | string;
  locale?: string;
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
};

export function timestampToCleanTime({
  timestamp,
  locale = "en-us",
  year = "numeric",
  month = "long",
  day = "numeric",
}: Props) {
  const date = timestamp ? new Date(timestamp) : new Date();

  const formatted = date.toLocaleDateString(locale, {
    year,
    month,
    day,
  });

  const raw = date.toISOString();

  return {
    formatted,
    raw,
  };
}

export function validEmail(email: string) {
  // eslint-disable-next-line
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validUsername(username: string) {
  // eslint-disable-next-line
  const re = /^(?=[a-zA-Z0-9_]{4,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  return re.test(String(username));
}

export function validUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
