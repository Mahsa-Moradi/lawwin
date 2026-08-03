import { cn } from "@/components/ui/cn";
import { contactEmails } from "@/lib/siteConfig";

type ContactEmailLinksProps = {
  className?: string;
  linkClassName?: string;
};

export function ContactEmailLinks({
  className,
  linkClassName,
}: ContactEmailLinksProps) {
  return (
    <ul className={cn("space-y-2", className)}>
      {contactEmails.map((email) => (
        <li key={email}>
          <a
            href={`mailto:${email}`}
            className={cn(
              "inline-block font-mono text-sm no-underline transition-colors",
              linkClassName,
            )}
            dir="ltr"
          >
            {email}
          </a>
        </li>
      ))}
    </ul>
  );
}
