import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, getDate } from "date-fns";
import { useEffect, useState } from "react";

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

/**
 * Hook to preserve search parameters without causing hydration issues
 * @param href - The base href to navigate to
 * @param preserveParams - Whether to preserve current search params (default: true)
 * @returns The href with preserved search parameters
 */
export function usePreserveSearchParams(
  href: string,
  preserveParams: boolean = true
): string {
  const [preservedHref, setPreservedHref] = useState(href);

  useEffect(() => {
    if (!preserveParams) {
      setPreservedHref(href);
      return;
    }

    try {
      const currentSearchParams = window.location.search;
      if (!currentSearchParams) {
        setPreservedHref(href);
        return;
      }

      // If href already has search params, we need to merge them
      const [basePath, existingParams] = href.split("?");
      const currentParams = new URLSearchParams(currentSearchParams);
      const existingParamsObj = existingParams
        ? new URLSearchParams(existingParams)
        : new URLSearchParams();

      // Merge params (existing params take precedence)
      for (const [key, value] of currentParams.entries()) {
        if (!existingParamsObj.has(key)) {
          existingParamsObj.set(key, value);
        }
      }

      const finalParams = existingParamsObj.toString();
      setPreservedHref(finalParams ? `${basePath}?${finalParams}` : basePath);
    } catch (error) {
      // Fallback to base href if there's any error
      setPreservedHref(href);
    }
  }, [href, preserveParams]);

  return preservedHref;
}

/**
 * Preserves current URL search parameters when navigating to a new href
 * @param href - The base href to navigate to
 * @param preserveParams - Whether to preserve current search params (default: true)
 * @returns The href with preserved search parameters
 *
 * @deprecated Use usePreserveSearchParams hook instead to avoid hydration issues
 */
export function preserveSearchParams(
  href: string,
  preserveParams: boolean = true
): string {
  if (!preserveParams) return href;

  // Always return base href to prevent hydration mismatches
  // Components should use usePreserveSearchParams hook instead
  return href;
}
