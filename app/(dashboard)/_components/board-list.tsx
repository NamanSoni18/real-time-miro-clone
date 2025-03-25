"use client";

import { useOrganization } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { EmptyOrg } from "./empty-org";

export const BoardList = () => {
  const { organization } = useOrganization();
  const searchParams = useSearchParams();
  const data = []; // TODO: Change to API Call

  if (!organization) {
    return <EmptyOrg />;
  }

  if (!data?.length && searchParams.get("search")) {
    return <EmptySearch />;
  }

  if (!data.length && searchParams.get("favorites")) {
    return <EmptyFavorites />;
  }

  if (!data.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      {JSON.stringify({
        search: searchParams.get("search"),
        favorites: searchParams.get("favorites")
      })}
    </div>
  );
};
