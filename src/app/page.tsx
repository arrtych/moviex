import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js",
};
const apiUrl = "/api/show-data";
export default async function Home() {
  //useeffect with fetch
  return (
    <div>
      <main>Main page</main>
    </div>
  );
}
