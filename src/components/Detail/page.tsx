import { useImages } from "@/hooks/useImages";
import { useParams } from "react-router-dom";
import Spinner from "@/components/Spinner";
import "./detail.css";

export default function DetailPage() {
  const { useFetchImage } = useImages();
  const { id } = useParams();
  const { data: image, isFetching, isError } = useFetchImage(id);

  if (!id || isError) return <span>Unexpected Error: please try again</span>;

  if (isFetching) {
    return <Spinner isCenter={false} />;
  } else if (image)
    return (
      <section className="w-full max-h-[70vh] h-[70vh] flex flex-col md:flex-row">
        <figure className="w-full md:w-2/3 flex items-center justify-center">
          <img
            src={image.download_url}
            alt={`Photo by ${image.author}`}
            className="frame h-full w-auto object-contain justify-self-center opacity-0 transition-opacity duration-700"
            onLoad={(e) => (e.currentTarget.style.opacity = "1")}
          />
        </figure>
        <aside
          aria-label="이미지 정보"
          className="w-fit animate-fadein flex items-center justify-end md:justify-start md:px-8 lg:px-12 py-5"
        >
          <div className="w-fit md:max-w-60 h-fit drop-shadow-md bg-white font-sans p-3">
            <ul className="text-[0.7rem]">
              <li className="font-bold pr-8">
                <span>{image.author}</span>
              </li>
              <li className="mt-1">Digital Photo</li>
              <li>
                {image.width}X{image.height}
              </li>
            </ul>
          </div>
        </aside>
      </section>
    );
}
