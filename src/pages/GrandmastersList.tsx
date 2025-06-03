import { useEffect, useMemo, useState } from "react";
import ListGrid from "../components/ListGrid";
import { fetchGrandmasters } from "../services/api";
import type { UserProfile } from "../types";

const GrandmastersList = () => {
  const [grandmasters, setGrandmasters] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadGrandmasters = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGrandmasters();
        setGrandmasters(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch grandmasters. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadGrandmasters();
  }, []);

  const filteredGrandmasters = useMemo(
    () =>
      grandmasters.filter(gm =>
        (gm.name?.toLowerCase() || gm.username.toLowerCase()).includes(searchTerm.toLowerCase())
      ),
    [grandmasters, searchTerm]
  );

  return (
    <main className="container flex-grow mx-auto px-4 py-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Chess Grandmasters</h2>
          <div className="w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search grandmasters..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <ListGrid users={filteredGrandmasters} isLoading={isLoading} />
    </main>
  );
};

export default GrandmastersList;
