import Link from "next/link";
import css from "./page.module.css";

const features = [
  {
    number: "01",
    title: "Organize with tags",
    description:
      "Keep work, personal ideas, shopping lists, and to-dos in the right place.",
  },
  {
    number: "02",
    title: "Find notes faster",
    description:
      "Search your notes and filter by category when you need an idea again.",
  },
  {
    number: "03",
    title: "Your space, your notes",
    description:
      "Create an account, sign in, and access a personal notes workspace.",
  },
];

const sampleNotes = [
  {
    tag: "Work",
    title: "Launch checklist",
    body: "Review the final design and prepare everything for release.",
    style: css.noteLavender,
  },
  {
    tag: "Personal",
    title: "Weekend ideas",
    body: "Find a new hiking route and make time for a little reset.",
    style: css.notePeach,
  },
  {
    tag: "Todo",
    title: "The little things",
    body: "Capture a thought now. Turn it into something great later.",
    style: css.noteMint,
  },
];

export default function Home() {
  return (
    <main className={css.main}>
      <section className={css.hero} aria-labelledby="hero-title">
        <div className={css.heroContent}>
          <div className={css.eyebrow}>
            <span className={css.eyebrowDot} aria-hidden="true" />
            THE SPACE FOR YOUR IDEAS
          </div>
          <h1 id="hero-title" className={css.title}>
            Big ideas start
            <br />
            <span>with a little note.</span>
          </h1>
          <p className={css.description}>
            Capture what matters, keep your thoughts organized, and find the
            right note at the right moment. A calmer way to stay on top of your
            everyday ideas.
          </p>
          <div className={css.actions}>
            <Link href="/sign-up" className={css.primaryAction}>
              Start taking notes <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/sign-in" className={css.secondaryAction}>
              I already have an account <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className={css.heroFootnote}>Simple to start. Easy to make your own.</p>
        </div>

        <div className={css.previewWrap}>
          <div className={css.glow} aria-hidden="true" />
          <div className={css.preview} aria-label="Illustrative preview of NoteHub notes">
            <div className={css.previewTopbar}>
              <div className={css.previewBrand}>
                <span className={css.brandMark} aria-hidden="true">N</span>
                <span>NoteHub</span>
              </div>
              <span className={css.previewDots} aria-hidden="true">•••</span>
            </div>
            <div className={css.previewHeading}>
              <div>
                <span className={css.previewEyebrow}>YOUR WORKSPACE</span>
                <h2>All your notes</h2>
              </div>
              <span className={css.previewPlus} aria-hidden="true">+</span>
            </div>
            <div className={css.previewSearch}>
              <span aria-hidden="true">⌕</span> Search your notes...
            </div>
            <div className={css.previewTags}>
              <span className={css.previewTagActive}>All notes</span>
              <span>Work</span>
              <span>Personal</span>
              <span>Todo</span>
            </div>
            <div className={css.notesGrid}>
              {sampleNotes.map((note) => (
                <div key={note.title} className={css.noteCard + " " + note.style}>
                  <span className={css.noteTag}>{note.tag}</span>
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                  <span className={css.noteDecoration} aria-hidden="true">✦</span>
                </div>
              ))}
            </div>
            <p className={css.previewDisclaimer}>Illustrative preview · Not real user data</p>
          </div>
          <div className={css.floatingLabel} aria-hidden="true">
            <span className={css.floatingIcon}>✦</span>
            <span>Make room for ideas</span>
          </div>
        </div>
      </section>

      <section className={css.featuresSection} aria-labelledby="features-title">
        <div className={css.sectionHeading}>
          <p className={css.sectionKicker}>BUILT FOR EVERYDAY CLARITY</p>
          <h2 id="features-title">Less clutter. More thinking.</h2>
          <p>Everything you need to give your ideas a home.</p>
        </div>
        <div className={css.featuresGrid}>
          {features.map((feature) => (
            <article className={css.feature} key={feature.number}>
              <span className={css.featureNumber}>{feature.number}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={css.bottomSection}>
        <div>
          <p className={css.sectionKicker}>READY WHEN YOU ARE</p>
          <h2>Give your next idea a place to land.</h2>
        </div>
        <Link href="/sign-up" className={css.bottomAction}>
          Create an account <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
