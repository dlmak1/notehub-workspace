import { cookies } from "next/headers";
import type { AxiosResponse } from "axios";
import nextServer from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import type { FetchNotesResponse } from "./clientApi";

interface FetchNotesParams {
  page: number;
  search?: string;
  perPage?: number;
  tag?: string;
}

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

export async function fetchNotes({
  page,
  search,
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const cookieHeader = await getCookieHeader();
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      ...(tag ? { tag } : {}),
    },
    headers: {
      Cookie: cookieHeader,
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieHeader = await getCookieHeader();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response.data;
}

export async function getMe(): Promise<User> {
  const cookieHeader = await getCookieHeader();
  const response = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response.data;
}

export async function checkSession(): Promise<AxiosResponse> {
  const cookieHeader = await getCookieHeader();
  const response = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return response;
}
