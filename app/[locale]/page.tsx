import Navbar from "./components/Shared/Navbar";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-start space-y-4 p-24">
        <h1 className="text-4xl font-bold text-primary">{t("title")}</h1>
        <p className="text-lg font-medium text-primary">{t("description")}</p>
      </main>
    </>
  );
}
