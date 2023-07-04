"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  return (
    <>
      <div className="w-full flex justify-between items-end p-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {user?.firstName}
        </h4>
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Our Dashboard
        </h3>
        <UserButton />
      </div>
      <div className="border-t">
        <div className="bg-background">
          <div className="flex bg-background">
            <Sidebar />
            <div className="flex w-full mt-10 ml-10">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
