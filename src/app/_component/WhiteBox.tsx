import { ReactNode, HTMLAttributes } from "react";

type Props = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export default function WhiteBox({ children, className = "", ...rest }: Props) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm max-w-5xl sm:mx-6 md:mx-auto ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
