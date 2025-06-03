import { type UserProfile } from "../types";
import UserCard from "./UserCard";
import Loading from "./Loading";

type Props = {
  users: UserProfile[];
  isLoading: boolean;
};

const ListGrid = ({ users, isLoading }: Props) => {
  if (isLoading) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {users.map(user => (
        <UserCard key={user.username} user={user} />
      ))}
    </div>
  );
};

export default ListGrid;
