"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteNote } from "@/lib/api/clientApi";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success(`The note ${note.title} has been deleted.`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleDelete(id: string) {
    mutation.mutate(id);
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => {
        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
