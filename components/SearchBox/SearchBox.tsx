"use client";

import { useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearchChange: (value: string) => void;
}

export default function SearchBox({ onSearchChange }: SearchBoxProps) {
  const [value, setValue] = useState("");

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onSearchChange(e.target.value);
      }}
    />
  );
}
