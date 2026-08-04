import type { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";

type NotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  const filterLabel = tag === "all" ? "All notes" : tag;

  return {
    title: `Notes: ${filterLabel} | NoteHub`,
    description: `Browse and manage your notes filtered by ${filterLabel}.`,
    openGraph: {
      title: `Notes: ${filterLabel} | NoteHub`,
      description: `Browse and manage your notes filtered by ${filterLabel}.`,
      url: `https://notehub.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tagFromSlug = slug[0];
  const tag = tagFromSlug === "all" ? undefined : tagFromSlug;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes({ page: 1, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tagFromSlug} tag={tagFromSlug} />
    </HydrationBoundary>
  );
}
