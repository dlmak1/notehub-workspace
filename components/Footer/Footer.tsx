import Link from "next/link";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <Link href="/" className={css.brand}>NoteHub</Link>
        <p>A place for your ideas — a portfolio project by Dmytro Severyn.</p>
        <a
          href="https://github.com/dlmak1/09-auth"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source on GitHub ↗
        </a>
      </div>
    </footer>
  );
}
