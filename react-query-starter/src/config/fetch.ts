import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "./key";
import { calulatePagesCount } from "../helper";
const PAGE_SIZE = 2;

export const useFetchUser = (currentPage: number) => {
  const query = useQuery({
    // queryKey: ["fetchUser", currentPage],
    queryKey: QUERY_KEY.getUserPaginate(currentPage),
    queryFn: (): Promise<any> =>
      fetch(
        `http://localhost:8000/users?_page=${currentPage}&_limit=${PAGE_SIZE}`
      ).then(async (res) => {
        const total_items = +(res.headers?.get("X-Total-Count") ?? 0);
        const page_size = PAGE_SIZE;
        const totalPages = calulatePagesCount(page_size, total_items);
        const d = await res.json();
        return {
          totalPages,
          total_items,
          users: d,
        };
      }),
    placeholderData: keepPreviousData,
    // staleTime: 30 * 1000,
  });
  return {
    ...query,
    data: query?.data?.users ?? [],
    count: query?.data?.total_items ?? 0,
    totalPages: query?.data?.totalPages ?? 1,
  };
};
