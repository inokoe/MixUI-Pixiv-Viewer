import { memo } from 'react';
import { ReferenceLink } from './Config';

interface ReferenceLinksProps {
  referenceLinks: ReferenceLink[];
}

const ReferenceLinks = memo<ReferenceLinksProps>(({ referenceLinks }) => {
  return (
    <div className="space-y-2">
      {referenceLinks.map(link => (
        <div key={link.url}>
          <a
            href={link.url ? link.url : '#'}
            target={link.url ? '_blank' : ''}
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
