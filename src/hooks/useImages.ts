import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchImagesByIdFn, fetchImagesByPageFn } from "@/api/images";

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
      queryFn: () => fetchImagesByIdFn(id),
      enabled: !!id,
    });

  const useFetchImagesByPage = (page: number) =>
    useQuery({
      queryKey: ["images", page],
      queryFn: () => fetchImagesByPageFn(page),
    });

  return {
    prefetchImages,
    useFetchImage,
    useFetchImagesByPage,
  };
}
