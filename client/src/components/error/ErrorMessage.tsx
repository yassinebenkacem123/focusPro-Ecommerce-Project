import type { JSX } from "react";

type ErrorMessageProps = {
  message: string;
  className?: string;
};

const ErrorMessage = ({ message, className = "" }: ErrorMessageProps): JSX.Element => {
  if (message.includes("404")) {
    return (
      <div className={`rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center text-base font-medium text-red-300 ${className}`}>
        Resource not found.
      </div>
    );
  }

  return (
    <div className={`rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300 ${className}`}>
      Error: {message}
    </div>
  );
};

export default ErrorMessage;