import { type UserProfile } from "../types";
import Avatar from "./Avatar";

type Props = {
  user: UserProfile;
};

const UserCard = ({ user }: Props) => {
  const userName = user.name || user.username;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        <div className="flex items-center mb-4">
          {user.avatar ? (
            <img src={user.avatar} alt={userName} className="w-16 h-16 rounded-full object-cover mr-4" />
          ) : (
            <Avatar name={userName} />
          )}

          <div>
            <h2 className="text-xl font-bold text-gray-800">{userName}</h2>
            <div className="flex items-center">
              <span className="bg-yellow-100 text-yellow-800 font-semibold px-2 py-0.5 rounded text-xs mr-2">
                {user.title}
              </span>
              {user.fide && <span className="text-sm text-gray-600">FIDE: {user.fide}</span>}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <a href={user.url} target="_blank" className="text-blue-600 hover:text-blue-800 text-sm">
            Chess.com Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
