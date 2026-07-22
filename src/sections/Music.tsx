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
  return 'https://w.soundcloud.com/player/?url=' + source + '&color=%23ef554c&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false';
};

export function Music() {
  return (
    <SectionFrame id="music" number="05" title="Music Production Career" className="music">
      <ol className="music__release-grid" aria-label="Selected music productions">
        {releases.map((release, index) => (
          <li className="music__release" key={release.externalUrl}>
            <figure className="music__release-disc">
              <img
                src={release.artwork}
                alt={release.title + ' cover artwork'}
                width="500"
                height="500"
                loading="lazy"
              />
              <span aria-hidden="true" />
            </figure>

            <div className="music__release-body">
              <div className="music__release-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{release.artist}</span>
                <a href={release.externalUrl} target="_blank" rel="noreferrer" aria-label={'Open ' + release.title + ' on SoundCloud'}>
                  SC ↗
                </a>
              </div>
              <h3>{release.title}</h3>
              <p>{release.detail}</p>
              <iframe
                title={release.artist + ' — ' + release.title + ' on SoundCloud'}
                src={playerUrl(release)}
                width="100%"
                height="112"
                loading="lazy"
                allow="autoplay; encrypted-media"
              />
            </div>
          </li>
        ))}
      </ol>

      <ul className="music__credits" aria-label="Music credentials from the source portfolio">
        <li>BBC 1Xtra</li><li>Rinse FM</li><li>O2 Arena</li><li>10+ years</li>
      </ul>
    </SectionFrame>
  );
}