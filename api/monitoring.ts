// Vercel Edge: tunnel for Sentry. Set SENTRY_INGEST_URL (e.g. https://xxx.ingest.us.sentry.io/api/yyy/envelope/) to enable.
export const config = { runtime: "edge" };

/** Forwards Sentry envelope POST to ingest when SENTRY_INGEST_URL is set; otherwise 204 so the route doesn't error. */
export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405 });
  }
  const ingestUrl = process.env.SENTRY_INGEST_URL;
  if (!ingestUrl) {
    return new Response(null, { status: 204 });
  }
  const url = new URL(request.url);
  const sentryUrl = `${ingestUrl}?${url.searchParams.toString()}`;
  const body = await request.arrayBuffer();
  const contentType = request.headers.get("content-type") ?? "";
  const res = await fetch(sentryUrl, {
    method: "POST",
    headers: { "Content-Type": contentType },
    body,
  });
  return new Response(res.body, { status: res.status });
}
