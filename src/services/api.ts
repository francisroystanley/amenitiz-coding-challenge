import axios from "axios";
import type { UserProfile } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_CHESS_API_BASE_URL
});

const fetchGrandmasters = async (): Promise<UserProfile[]> => {
  try {
    const response = await api.get("/titled/GM");

    if (response.data?.players) {
      const players = response.data.players.slice(0, 5);
      const playerDetailsPromises = players.map(async (username: string) => {
        return await fetchProfile(username);
      });

      return await Promise.all(playerDetailsPromises);
    }

    return [];
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
