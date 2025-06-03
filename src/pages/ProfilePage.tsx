import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar, Badge, ErrorMessage, Loading } from "../components";
import { fetchProfile } from "../services/api";
import type { UserProfile } from "../types";
import { formatDate, titleCase } from "../util";

const GoBack = () => (
  <div className="mb-4">
    <Link to="/" className="text-blue-600 hover:text-blue-800">
      &larr; Back to Grandmasters List
    </Link>
  </div>
);

const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;

      try {
        setIsLoading(true);
        const data = await fetchProfile(username);
        setProfile(data);
        setError(null);
      } catch (err) {
        setError("Failed to load player profile. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  const Content = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (error || !profile) {
      return <ErrorMessage error={error || "Profile not found"} />;
    }

    const displayName = profile.name || profile.username;
    const joinedDate = formatDate(profile.joined * 1000);

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-32 h-32">
            {profile.avatar ? (
              <img src={profile.avatar} alt={displayName} className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="w-32 h-32">
                <Avatar name={displayName} />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{displayName}</h1>
            <div className="flex items-center gap-2 my-2">
              <Badge bgColor="bg-yellow-100" textColor="text-yellow-800" text={profile.title} />
              {profile.status && (
                <Badge bgColor="bg-green-100" textColor="text-green-800" text={titleCase(profile.status)} />
              )}
              <Badge
                bgColor={profile.verified ? "bg-blue-100" : "bg-red-100"}
                textColor={profile.verified ? "text-blue-800" : "text-red-800"}
                text={profile.verified ? "Verified" : "Unverified"}
              />
            </div>

            <div className="border-l-4 border-amber-500 pl-3">
              <p className="text-sm text-gray-500">Joined</p>
              <p className="text-lg font-semibold">{joinedDate}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {profile.fide && (
                <div className="border-l-4 border-blue-500 pl-3">
                  <p className="text-sm text-gray-500">FIDE Rating</p>
                  <p className="text-lg font-semibold">{profile.fide}</p>
                </div>
              )}

              <div className="border-l-4 border-purple-500 pl-3">
                <p className="text-sm text-gray-500">Followers</p>
                <p className="text-lg font-semibold">{profile.followers || 0}</p>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={profile.url}
                target="_blank"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Chess.com Profile
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="container flex-grow mx-auto px-4 py-6">
      <GoBack />
      <Content />
    </main>
  );
};

export default ProfilePage;
