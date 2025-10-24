import { useImages } from "@/hooks/useImages";
import { useParams } from "react-router-dom";
import "./detail.css";

export default function DetailPage() {
  const { useFetchImage } = useImages();
  const { id } = useParams();
  const { data: image, isFetching, isError } = useFetchImage(id);

  if (!id || isError) return <span>문제 발생</span>;

  if (image && !isFetching)
    return (
      <section
        aria-label="이미지 상세"
        className="w-full max-h-[70vh] flex flex-col md:flex-row"
      >
        <figure className="w-full md:w-2/3 flex items-center justify-center">
          <img
            src={image.download_url}
            className="frame object-contain w-auto h-full"
          />
        </figure>
        <div className="w-full md:w-1/3 flex items-center justify-end md:justify-start md:px-8 lg:px-12 py-5">
          <figcaption className="w-fit md:max-w-60 h-fit drop-shadow-md bg-white font-sans p-3">
            <ul className="text-[0.7rem] w-full">
              <li className="font-bold pr-8">
                <span>{image.author}</span>
              </li>
              <li className="mt-1">Digital Photo</li>
              <li>
                {image.width} X {image.height}
              </li>
            </ul>
          </figcaption>
        </div>
      </section>
    );

  return <span>Loading</span>;
}
