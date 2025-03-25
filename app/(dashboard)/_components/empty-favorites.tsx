import Image from "next/image";

export const EmptyFavorites = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty-favorites.svg" alt="Empty" width={140} height={140} />
      <h2 className="text-2xl font-semibold mt-6">No Favorites Boards</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Add some boards to your favorites
      </p>
    </div>
  );
};
