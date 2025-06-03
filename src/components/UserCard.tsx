import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { type UserProfile } from "../types";
import { formatDate } from "../util";
import Avatar from "./Avatar";
import Badge from "./Badge";

type Props = {
  user: UserProfile;
};

type UserCardContainerProps = PropsWithChildren<{
  href: string;
  navigate: (href: string) => void;
}>;

const UserCardContainer = ({ children, href, navigate }: UserCardContainerProps) => (
  <div className="cursor-pointer" onClick={() => navigate(href)}>
    {children}
  </div>
);

const UserCard = ({ user }: Props) => {
  const userName = user.name || user.username;
  const joinedDate = formatDate(user.joined * 1000);

  return (
    <Link to={`/profile/${user.username}`} component={UserCardContainer}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-4">
          <div className="flex items-center mb-4">
            {user.avatar ? (
              <img src={user.avatar} alt={userName} className="w-16 h-16 rounded-full object-cover mr-4" />
            ) : (
              <Avatar name={userName} />
            )}

            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-800 truncate" title={userName}>
                {userName}
              </h2>
              <div className="flex items-center gap-2">
                <Badge bgColor="bg-yellow-100" textColor="text-yellow-800" text={user.title} />
                {user.fide && <span className="text-sm text-gray-600">FIDE: {user.fide}</span>}
              </div>
              <div>
                <span className="text-sm text-gray-600 mr-1">Joined:</span>
                <span className="text-sm text-gray-600">{joinedDate}</span>
              </div>
              <div className="mt-2">
                <a
                  href={user.url}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                  onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    window.open(user.url, "_blank");
                  }}
                >
                  Chess.com Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
