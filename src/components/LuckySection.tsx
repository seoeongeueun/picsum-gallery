import { useState } from "react";
import { useImages } from "@/hooks/useImages";

export default function LuckySection() {
  const [input, setInput] = useState<string>("");
  const [seed, setSeed] = useState<string>("");
  const { useFetchImageBySeed } = useImages();

  const { data: imgUrl, isFetching, isError } = useFetchImageBySeed(seed);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //유저 인풋에서 공백을 제거한 string을 시드로 설정
    const cleaned = input.replace(/\s+/g, "");
    console.log(cleaned);

    if (!cleaned) return;
    setSeed(cleaned);
    setInput("");
  };

  return (
    <section className="flex flex-col items-center justify-center gap-20 text-theme">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-2">
          <input
            id="lucky-input"
            type="text"
            value={input}
            required
            title="마법의 단어를 입력해주세요"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your magic word"
          />
          <button type="submit">
            <span>Confirm</span>
          </button>
        </div>
      </form>
      {isFetching && <p>Finding Image for '{seed}'...</p>}
      {imgUrl && (
        <figure className="polaroid rotate-1 max-w-[14rem] aspect-[14/16.8] drop-shadow-lg bg-white border border-px border-gray-100 p-3 relative">
          <div className="tape w-6 h-12 bg-theme opacity-80 rotate-[20deg] rounded-xs absolute -top-6 left-1/2"></div>
          <img
            src={imgUrl}
            alt="랜덤 이미지"
            className="w-full aspect-square"
          ></img>
          <span className="absolute bottom-2 right-2 font-memoment text-black">
            {seed} ♧
          </span>
        </figure>
      )}
    </section>
  );
}
