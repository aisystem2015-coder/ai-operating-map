import Navigation from "@/components/Navigation";
import SprintPage from "@/components/pages/SprintPage";

export const metadata = {
  title: "Sprint Report · AI Operating Map",
  description: "90 días construyendo el FG AI Lab — Francisco Guevara + Maya Avila",
};

export default function Page() {
  return (
    <>
      <Navigation />
      <SprintPage />
    </>
  );
}
