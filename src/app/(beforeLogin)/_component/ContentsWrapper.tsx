import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  page: "word" | "knowledge" | "pr" | "interview";
};

export default function ContentsWrapper({ children, page }: Props) {
  const paddingTopClass =
    page === "word" || page === "knowledge"
      ? "pt-[68px] md:pt-[84px]"
      : "pt-[78px] md:pt-[96px]";

  return (
    <div className={`${paddingTopClass} px-2 space-y-4 md:px-4`}>
      {children}
    </div>
  );
}
