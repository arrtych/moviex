import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const queryParams = Object.fromEntries(searchParams.entries());
  console.log("Search params:", queryParams);
  console.log(
    "API Key:",
    process.env.KINOPOISK_API_KEY ? "Present" : "Missing"
  );

  try {
    const apiUrl = "https://api.kinopoisk.dev/v1.4/movie";
    console.log("Requesting URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": process.env.KINOPOISK_API_KEY || "",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
        url: apiUrl,
      });
      return NextResponse.json(
        { error: `API Error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Successfully fetched search results");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Movie search API error:", error);
    return NextResponse.json(
      { error: "Failed to search movies" },
      { status: 500 }
    );
  }
}
