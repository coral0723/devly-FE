import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ContentsWrapper({ children }: Props) {
  return (
    <div className="pt-[68px] px-2 space-y-4 md:pt-[84px] md:px-4">
      {children}
    </div>
  );
}
