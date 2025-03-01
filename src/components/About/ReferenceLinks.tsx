import { memo } from 'react';

interface ReferenceLink {
  url: string;
  text: string;
}

const referenceLinks: ReferenceLink[] = [
  {
    url: 'https://github.com/mixmoe/HibiAPI',
    text: 'Pixiv Api : https://github.com/mixmoe/HibiAPI',
  },
  {
    url: 'https://github.com/journey-ad/pixiv-viewer',
    text: '✨ Pixiv Viewer : https://github.com/journey-ad/pixiv-viewer',
  },
  {
    url: 'https://github.com/asadahimeka/pixiv-viewer',
    text: '🪐 Pixiv Viewer : https://github.com/asadahimeka/pixiv-viewer',
  },
];

const ReferenceLinks = memo(() => {
  return (
    <div className="space-y-2">
      {referenceLinks.map(link => (
        <div key={link.url}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {link.text}
          </a>
        </div>
      ))}
    </div>
  );
});

ReferenceLinks.displayName = 'ReferenceLinks';

export default ReferenceLinks;
