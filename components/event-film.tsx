const VIDEO_ID = "YDu_VDar-fQ";
const VIDEO_TITLE =
  "2nd Ahmad al-Fergani International Physics Olympiad - The legacy of greatness continues";

export function EventFilm() {
  return (
    <section
      aria-label="Official FIPHO film"
      className="w-full"
      id="event-film-title"
    >
      <div className="aspect-video">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
          title={VIDEO_TITLE}
        />
      </div>
    </section>
  );
}
