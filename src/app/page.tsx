import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Next.js",
};
// const apiUrl = "/api/show-data";
export default async function Home() {
  //useeffect with fetch
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center px-4">
      <main>Main page</main>
      <Button size={"lg"} variant={"destructive"}>
        Button
      </Button>
    </div>
  );
}
