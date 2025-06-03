import axios from "axios";
import type { UserProfile } from "../types";

const PLAYERS_PER_PAGE = 20;

const api = axios.create({
  baseURL: import.meta.env.VITE_CHESS_API_BASE_URL
});

const fetchGrandmasters = async (page = 1): Promise<{ users: UserProfile[]; hasMore: boolean }> => {
  try {
    const response = await api.get("/titled/GM");

    if (response.data?.players) {
      const players = response.data.players;
      const startIndex = (page - 1) * PLAYERS_PER_PAGE;
      const endIndex = startIndex + PLAYERS_PER_PAGE;
      const paginatedPlayers = players.slice(startIndex, endIndex);

      const playerDetailsPromises = paginatedPlayers.map(async (username: string) => {
        return await fetchProfile(username);
      });

      const users = await Promise.all(playerDetailsPromises);
      const hasMore = endIndex < players.length;

      return { users, hasMore };
    }

    return { users: [], hasMore: false };
  } catch (error) {
    console.error("Error fetching grandmasters:", error);
    throw error;
  }
};

const fetchProfile = async (username: string): Promise<UserProfile> => {
  const playerResponse = await api.get(`/player/${username}`);

  return playerResponse.data;
};

export { fetchGrandmasters, fetchProfile };
