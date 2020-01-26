export const TOKEN_KEY = "@mymovies-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const login = (token, profileId) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("profileId", profileId);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};