export default function PageContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="container mx-auto">{children}</div>;
}
