import { BoardList } from "./_components/board-list";

const DashboardPage = () => {
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      <BoardList />
    </div>
  );
};

export default DashboardPage;
