"use client";

import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { useOrganization } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      <BoardListWrapper />
    </div>
  );
}

function BoardListWrapper() {
  const { organization } = useOrganization();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const favorites = searchParams.get("favorites") || undefined;

  console.log("CONVEX URL:", process.env.NEXT_PUBLIC_CONVEX_URL);
  console.log("CLERK KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  console.log("LIVEBLOCKS KEY:", process.env.LIVEBLOCKS_SECRET_KEY);

  if (!organization) return <EmptyOrg />;

  return (
    <BoardList orgId={organization.id} search={search} favorites={favorites} />
  );
}
