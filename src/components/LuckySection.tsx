import { useState } from "react";

export default function LuckySection() {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
  };

  return (
    <section className="flex flex-col items-center justify-center">
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
    </section>
  );
}
