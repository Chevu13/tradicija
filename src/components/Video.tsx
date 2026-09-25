import { featuredVideo, socials } from "@/lib/site";

export function Video() {
  return (
    <section id="snimak" className="py-16 md:py-24">
      <div className="wrap grid gap-10 md:grid-cols-[minmax(0,22rem)_1fr] md:items-center md:gap-16">
        <video
          className="aspect-[9/16] w-full max-w-[22rem] justify-self-center bg-ink md:justify-self-start"
          src="/media/video/svadba.mp4"
          poster="/media/img/svadba-poster.jpg"
          controls
          playsInline
          preload="none"
        >
          Vaš pregledač ne podržava video.
        </video>

        <div>
          <h2 className="text-[clamp(1.9rem,3.6vw,2.75rem)]">Uživo sa svadbe</h2>
          <p className="mt-4 max-w-lg text-mute">
            Neizmenjen snimak sa jedne od naših svadbi pod šatorom — saksofon i harmonika među
            gostima, pa pesma i kolo. Uključite zvuk.
          </p>
          <p className="mt-8 font-semibold">Više snimaka</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a className="link" href={socials.instagram.href} target="_blank" rel="noopener noreferrer">
                Instagram — {socials.instagram.handle}
              </a>
            </li>
            <li>
              <a
                className="link"
                href={`https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube — spot „{featuredVideo.title}“
              </a>
            </li>
            <li>
              <a className="link" href={socials.tiktok.href} target="_blank" rel="noopener noreferrer">
                TikTok — {socials.tiktok.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
