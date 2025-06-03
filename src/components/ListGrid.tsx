import { type UserProfile } from "../types";
import Loading from "./Loading";
import UserCard from "./UserCard";

type Props = {
  users: UserProfile[];
  isLoading: boolean;
  isLoadingMore?: boolean;
};

const ListGrid = ({ users, isLoading, isLoadingMore }: Props) => {
  if (isLoading && !users.length) {
    return <Loading />;
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 text-lg">Nothing found...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map(user => (
          <UserCard key={user.username} user={user} />
        ))}
      </div>

      {isLoadingMore && (
        <div className="mt-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </>
  );
};

export default ListGrid;
