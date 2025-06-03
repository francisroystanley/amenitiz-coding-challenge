import { useCallback, useEffect, useMemo, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import ListGrid from "../components/ListGrid";
import { fetchGrandmasters } from "../services/api";
import type { UserProfile } from "../types";

const GrandmastersList = () => {
  const [grandmasters, setGrandmasters] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadGrandmasters = useCallback(async (pageToLoad: number, isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const data = await fetchGrandmasters(pageToLoad);

      setGrandmasters(prev => (isInitialLoad ? data.users : [...prev, ...data.users]));
      setHasMore(data.hasMore);
      setError(null);
    } catch (err) {
      setError("Failed to fetch grandmasters. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadGrandmasters(1, true);
  }, [loadGrandmasters]);

  useEffect(() => {
    if (page > 1 && hasMore) {
      loadGrandmasters(page);
    }
  }, [page, loadGrandmasters, hasMore]);

  const loadMoreHandler = () => {
    if (hasMore && !isLoadingMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const filteredGrandmasters = useMemo(
    () =>
      searchTerm
        ? grandmasters.filter(gm =>
            (gm.name?.toLowerCase() || gm.username.toLowerCase()).includes(searchTerm.toLowerCase())
          )
        : grandmasters,
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

      {error && <ErrorMessage error={error} />}

      <ListGrid users={filteredGrandmasters} isLoading={isLoading} isLoadingMore={isLoadingMore} />

      {!isLoading && !isLoadingMore && hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMoreHandler}
            className="px-6 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Load more...
          </button>
        </div>
      )}
    </main>
  );
};

export default GrandmastersList;
