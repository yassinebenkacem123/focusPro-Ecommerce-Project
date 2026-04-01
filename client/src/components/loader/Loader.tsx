import type { JSX } from "react";

type LoaderProps = {
  message?: string;
  className?: string;
};

const Loader = ({ message = "Loading...", className = "" }: LoaderProps): JSX.Element => {
  return (
    <div
      className={`flex items-center gap-2 ${className}`}
    >
      <span>{message}</span>
    </div>
  );
};

export default Loader;