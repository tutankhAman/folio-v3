import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      fillRule="evenodd"
    />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const CONTACT_ITEMS = [
  {
    name: "Email",
    value: "amanaziz2020@gmail.com",
    href: "mailto:amanaziz2020@gmail.com",
    icon: Mail,
    isEmail: true,
  },
  {
    name: "GitHub",
    value: "@tutankhAman",
    href: "https://github.com/tutankhAman",
    icon: GithubIcon,
    isEmail: false,
  },
  {
    name: "X (Twitter)",
    value: "@amancooks",
    href: "https://x.com/amancooks",
    icon: XIcon,
    isEmail: false,
  },
  {
    name: "LinkedIn",
    value: "in/aman-aziz",
    href: "https://linkedin.com/in/aman-aziz",
    icon: LinkedinIcon,
    isEmail: false,
  },
];

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("amanaziz2020@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
      {CONTACT_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <a
            className="group relative flex items-center justify-between border border-neutral-300 border-dashed bg-neutral-50/50 p-4 transition-all duration-200 hover:border-neutral-900 hover:bg-neutral-900"
            href={item.href}
            key={item.name}
            rel="noreferrer"
            target={item.isEmail ? undefined : "_blank"}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-neutral-200 bg-white text-neutral-700 transition-colors group-hover:border-neutral-700 group-hover:bg-neutral-800 group-hover:text-white">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate font-medium font-poppins text-neutral-900 text-xs transition-colors group-hover:text-white">
                  {item.name}
                </h3>
                <p className="truncate font-mono text-neutral-500 text-xs transition-colors group-hover:text-neutral-300">
                  {item.value}
                </p>
              </div>
            </div>

            <div className="ml-2 flex shrink-0 items-center gap-1.5">
              {item.isEmail && (
                <button
                  className="flex items-center gap-1 border border-neutral-200 bg-white px-2 py-0.5 font-mono text-[10px] text-neutral-600 transition-colors group-hover:border-neutral-700 group-hover:bg-neutral-800 group-hover:text-neutral-300"
                  onClick={copyEmail}
                  type="button"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              )}
              <ArrowUpRight className="h-4 w-4 text-neutral-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </div>
          </a>
        );
      })}
    </div>
  );
}
