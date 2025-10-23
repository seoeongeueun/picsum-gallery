import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  useQueries,
} from "@tanstack/react-query";
import {
  fetchImageByIdFn,
  fetchImagesByPageFn,
  fetchImageBySeedFn,
} from "@/api/images";

export function useImages() {
  const queryClient = useQueryClient();

  const prefetchImages = () =>
    queryClient.prefetchQuery({
      queryKey: ["images", 1],
      queryFn: () => fetchImagesByPageFn(1),
    });

  const useFetchImage = (id: string) =>
    useQuery({
      queryKey: ["image", id],
      queryFn: () => fetchImageByIdFn(id),
      enabled: !!id,
    });

  const useFetchImagesByPage = (page: number) =>
    useQuery({
      queryKey: ["images", page],
      queryFn: () => fetchImagesByPageFn(page),
    });

  const useInfiniteImages = () => {
    const query = useInfiniteQuery({
      queryKey: ["images"],
      queryFn: ({ pageParam = 1 }) => fetchImagesByPageFn(pageParam),
      initialPageParam: 1,
      getNextPageParam: (last, all) => {
        //다음 페이지 번호를 계산
        return last.length ? all.length + 1 : undefined;
      },
    });

    // masonry 적용 가능하게 데이터 배열을 flatten 후 반환
    const images = query.data?.pages.flat() ?? [];

    return {
      ...query,
      images,
    };
  };

  const useFetchImageBySeed = (seed: string) =>
    useQuery({
      queryKey: ["images", seed],
      queryFn: () => fetchImageBySeedFn(seed),
      enabled: !!seed,
    });

  const useFetchImagesByIds = (ids: Set<string>) =>
    useQueries({
      queries: [...ids].map((id) => ({
        queryKey: ["image", id],
        queryFn: () => fetchImageByIdFn(id),
        enabled: !!id,
      })),
      combine: (results) => {
        return {
          data: results.map((result) => result.data),
          isLoading: results.some((r) => r.isLoading),
          isError: results.some((r) => r.isError),
        };
      },
    });

  return {
    prefetchImages,
    useFetchImage,
    useFetchImagesByPage,
    useInfiniteImages,
    useFetchImageBySeed,
    useFetchImagesByIds,
  };
}
