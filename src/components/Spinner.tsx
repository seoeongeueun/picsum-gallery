import spinner from "/assets/spinner.svg";
import clsx from "clsx";

export default function Spinner({ isCenter = true }: { isCenter?: boolean }) {
  return (
    <img
      src={spinner}
      alt="loading"
      className={clsx(
        isCenter
          ? "relative"
          : "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "spinner animate-spin w-12 h-12 z-50"
      )}
    />
  );
}
