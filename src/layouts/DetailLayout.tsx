import { Outlet, useNavigate } from "react-router-dom";

export default function DetailLayout() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex flex-col">
      <header className="p-4 bg-background w-full h-fit flex flex-row justify-between items-center">
        <h2 className="text-theme p-4 font-paperozi font-extrabold break-all">
          Picsum Gallery
        </h2>
        <nav aria-label="페이지 이동">
          <button
            type="button"
            onClick={handleGoBack}
            aria-label="뒤로가기"
            className="font-extrabold"
          >
            X
          </button>
        </nav>
      </header>

      <main className="w-full p-8 md:p-12">
        <Outlet />
      </main>
    </div>
  );
}
