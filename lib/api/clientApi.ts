import nextServer from "./api";
import type { Note, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

interface FetchNotesParams {
  page: number;
  search?: string;
  perPage?: number;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export type AuthRequest = {
  email: string;
  password: string;
};

export type UpdateUserRequest = {
  username: string;
};

export type SessionResponse = {
  success: boolean;
};

export async function fetchNotes({
  page,
  search,
  perPage = 12,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      ...(tag ? { tag } : {}),
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function register(payload: AuthRequest): Promise<User> {
  const response = await nextServer.post<User>("/auth/register", payload);
  return response.data;
}

export async function login(payload: AuthRequest): Promise<User> {
  const response = await nextServer.post<User>("/auth/login", payload);
  return response.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function checkSession(): Promise<boolean> {
  const response = await nextServer.get<SessionResponse>("/auth/session");
  return response.data.success;
}

export async function getMe(): Promise<User> {
  const response = await nextServer.get<User>("/users/me");
  return response.data;
}

export async function updateMe(payload: UpdateUserRequest): Promise<User> {
  const response = await nextServer.patch<User>("/users/me", payload);
  return response.data;
}
