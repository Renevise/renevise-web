import { createClient, type QueryParams } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
  perspective: "published",
});

export const SANITY_REVALIDATE_SECONDS = 60;

type SanityFetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

export async function sanityFetch<T = unknown>(
  query: string,
  params: QueryParams = {},
  options: SanityFetchOptions = {}
): Promise<T> {
  const { revalidate = SANITY_REVALIDATE_SECONDS, tags } = options;

  return client.fetch<T>(query, params, {
    next: {
      revalidate: tags && tags.length > 0 ? false : revalidate,
      tags,
    },
  });
}
