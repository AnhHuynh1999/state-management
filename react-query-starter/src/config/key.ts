export const QUERY_KEY = {
  getAllUsers: () => ["fetchUser"],
  getUserPaginate: (page: number) => {
    return ["fetchUser", page];
  },
};
