import { detectSocialLink } from "@/lib/social";
import { hexToRgba } from "@/lib/utils";
import type { ProfileCardLink } from "@/types";

interface SocialLinksProps {
  links: ProfileCardLink[];
  color: string;
}

const SocialLinks = ({ links, color }: SocialLinksProps) => {
  const socials = links
    .map((l) => ({ link: l, platform: detectSocialLink(l.url) }))
    .filter((s): s is { link: ProfileCardLink; platform: NonNullable<ReturnType<typeof detectSocialLink>> } => s.platform !== null);

  if (socials.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-3 pt-2">
      {socials.map(({ link, platform }) => {
        const Icon = platform.icon;
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            style={{
              background: hexToRgba(color, 0.12),
              color: color,
            }}
            aria-label={platform.name}
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
};

export { SocialLinks };
