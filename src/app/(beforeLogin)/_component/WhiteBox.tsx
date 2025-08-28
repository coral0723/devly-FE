// src/components/ContentsWrapper.tsx
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function WhiteBox({ children }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm max-w-3xl sm:mx-6 md:mx-auto">
      {children}
    </div>
  );
}
