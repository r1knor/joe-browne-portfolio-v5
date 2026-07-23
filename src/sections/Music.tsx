import { useState } from 'react';
import { SectionFrame } from '../components/SectionFrame';

type Release = {
  title: string;
  artist: string;
  detail: string;
  artwork: string;
  externalUrl: string;
  resource: 'tracks' | 'playlists';
  resourceId: string;
};

const releases: readonly Release[] = [
  {
    title: 'Dubby Riddim',
    artist: 'Riknor',
    detail: 'Original track',
    artwork: '/assets/images/music-releases/dubby-riddim.jpg',
    externalUrl: 'https://soundcloud.com/riknorgrime/dubby-riddim',
    resource: 'tracks',
    resourceId: '408280827',
  },
  {
    title: 'Debt Enforcer VIP',
    artist: 'Riknor',
    detail: 'El b2b Coza w/ Limmz · Subtle FM',
    artwork: '/assets/images/music-releases/debt-enforcer-vip.jpg',
    externalUrl: 'https://soundcloud.com/riknorgrime/debt-enforcer-vip-el-b2b-coza-w-limmz-subtle-fm',
    resource: 'tracks',
    resourceId: '1680194901',
  },
  {
    title: 'Dark Garage Dubz',
    artist: 'Riknor',
    detail: 'Playlist',
    artwork: '/assets/images/music-releases/dark-garage-dubz.jpg',
    externalUrl: 'https://soundcloud.com/riknorgrime/sets/dark-garage-dubz',
    resource: 'playlists',
    resourceId: '1607223844',
  },
  {
    title: 'Badman VIP',
    artist: 'Riknor',
    detail: 'DJ Jack Dat & Jammz · Rinse FM',
    artwork: '/assets/images/music-releases/badman-vip.jpg',
    externalUrl: 'https://soundcloud.com/riknorgrime/badman-vip-dj-jack-dat-rinse-fm',
    resource: 'tracks',
    resourceId: '1431289417',
  },
  {
    title: 'Fedz',
    artist: 'Riknor',
    detail: 'Project Allout Records',
    artwork: '/assets/images/music-releases/fedz.jpg',
    externalUrl: 'https://soundcloud.com/projectalloutrecords/riknor-fedz',
    resource: 'tracks',
    resourceId: '317629023',
  },
  {
    title: 'Gangsters EP',
    artist: 'Riknor',
    detail: 'PAR 075 · Project Allout Records',
    artwork: '/assets/images/music-releases/gangsters-ep.jpg',
    externalUrl: 'https://soundcloud.com/projectalloutrecords/sets/riknor-gangsters-ep-par-075-out-friday-24th-march',
    resource: 'playlists',
    resourceId: '298702113',
  },
  {
    title: 'Five Pound Bet',
    artist: 'Bru-C & Window Kid',
    detail: 'Produced by Riknor',
    artwork: '/assets/images/music-releases/five-pound-bet.jpg',
    externalUrl: 'https://soundcloud.com/iambru/bru-c-window-kid-5-pound-bet',
    resource: 'tracks',
    resourceId: '273708709',
  },
  {
    title: 'Early Grave',
    artist: 'Riknor',
    detail: 'GetDarker · Free download',
    artwork: '/assets/images/music-releases/early-grave.jpg',
    externalUrl: 'https://soundcloud.com/getdarker/riknor-early-grave-free-download',
    resource: 'tracks',
    resourceId: '237483683',
  },
] as const;

const playerUrl = ({ resource, resourceId }: Release) => {
  const source = encodeURIComponent('https://api.soundcloud.com/' + resource + '/' + resourceId);
  return 'https://w.soundcloud.com/player/?url=' + source + '&color=%23ef554c&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false';
};

export function Music() {
  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = hovered ?? active ?? 0;

  return (
    <SectionFrame id="music" number="05" title="Riknor, on record." className="music">
      <div className="music__intro" data-reveal>
        <p>
          A decade producing grime and dark garage as Riknor—cut for radio, pressed for labels and
          played out on big systems.
        </p>
        <ul className="music__credits" aria-label="Music credentials">
          <li>BBC 1Xtra</li>
          <li>Rinse FM</li>
          <li>O2 Arena</li>
          <li>10+ years</li>
        </ul>
      </div>

      <div className="music__deck">
        <ol className="music__index" aria-label="Selected music productions">
          {releases.map((release, index) => (
            <li
              key={release.externalUrl}
              className={active === index ? 'is-active' : undefined}
              onPointerEnter={() => setHovered(index)}
              onPointerLeave={() => setHovered(null)}
            >
              <button
                type="button"
                onClick={() => setActive(active === index ? null : index)}
                aria-expanded={active === index}
                aria-label={
                  (active === index ? 'Stop ' : 'Play ') + release.title + ' by ' + release.artist
                }
              >
                <span className="music__no" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="music__titles">
                  <strong>{release.title}</strong>
                  <em>{release.artist}</em>
                </span>
                <span className="music__detail">{release.detail}</span>
                <span className="music__play" aria-hidden="true">
                  {active === index ? 'Stop' : 'Play'}
                </span>
              </button>
              {active === index && (
                <div className="music__player-row">
                  <iframe
                    title={release.artist + ' — ' + release.title + ' on SoundCloud'}
                    src={playerUrl(release)}
                    width="100%"
                    height="112"
                    allow="autoplay; encrypted-media"
                  />
                  <a href={release.externalUrl} target="_blank" rel="noreferrer">
                    Open on SoundCloud ↗
                  </a>
                </div>
              )}
            </li>
          ))}
        </ol>

        <figure className="music__stage" aria-hidden="true">
          {releases.map((release, index) => (
            <img
              key={release.externalUrl}
              src={release.artwork}
              alt=""
              width="500"
              height="500"
              loading="lazy"
              className={index === shown ? 'is-shown' : undefined}
            />
          ))}
          <figcaption>
            <span>{String(shown + 1).padStart(2, '0')}</span>
            <span>{releases[shown].title}</span>
          </figcaption>
        </figure>
      </div>
    </SectionFrame>
  );
}
