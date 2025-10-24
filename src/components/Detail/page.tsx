import { useImages } from "@/hooks/useImages";
import { useParams } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import "./detail.css";
import Spinner from "@/components/Spinner";

export default function DetailPage() {
  const { useFetchImage } = useImages();
  const { id } = useParams();
  const { data: image, isFetching, isError } = useFetchImage(id!);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  if (!id || isError) return <span>Unexpected Error: please try again</span>;

  return (
    <section className="w-full max-h-[70vh] h-[70vh] flex flex-col md:flex-row">
      <figure className="w-full md:w-2/3 flex items-center justify-center">
        {image && !isFetching && (
          <img
            src={image.download_url}
            alt={`Photo by ${image.author}`}
            decoding="async"
            className={clsx(
              isLoaded ? "opacity-100" : "opacity-0",
              "frame h-fit max-h-full w-auto object-contain justify-self-center transition-opacity duration-700"
            )}
            onLoad={() => setIsLoaded(true)}
          />
        )}
        {!isLoaded && <Spinner />}
      </figure>
      <aside
        aria-label="이미지 정보"
        className="w-fit flex items-center justify-end md:justify-start md:px-8 lg:px-12 py-5"
      >
        <div className="w-fit min-w-20 md:max-w-60 h-fit min-h-16 drop-shadow-md bg-white font-sans p-3">
          <ul
            className={clsx(
              "text-[0.7rem] transition-colors duration-1000",
              !image && "text-white"
            )}
          >
            <li className="font-bold pr-8">
              <span>{image?.author || "filler text"}</span>
            </li>
            <li className="mt-1">Digital Photo</li>
            <li>
              {image?.width} X {image?.height}
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
}
