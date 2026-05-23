import { PageLayout } from "@/app/_components/PageLayout";

export default function DefaultLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PageLayout>
            {children}
        </PageLayout>
    );
}