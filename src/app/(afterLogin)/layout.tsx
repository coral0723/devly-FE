import "react-optimistic-chat/style.css";

export default function AfterLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  )
}