import { cn } from "@/lib/utils";

interface StylizedNameProps {
  className?: string;
  firstName?: string;
  lastName?: string;
  showLastName?: boolean;
  showDot?: boolean;
}

/**
 * Font mapping per character position (0-indexed):
 * 0: Serif font (Lora) -> 'A' / 'A'
 * 1: Departure Mono font -> 'm' / 'z'
 * 2: Slanted Casta font -> 'a' / 'i'
 * 3: Serif font (Lora) -> 'n' / 'z'
 */
export const LETTER_FONTS: readonly string[] = [
  "font-serif", // A (serif)
  "font-departure font-thin text-[0.8em]", // m / z (departure, thinner & smaller)
  "font-casta italic font-bold pr-0.5 text-[0.9em]", // a / i (slanted casta, bold, right padding)
  "font-serif text-[0.85em]", // n / z (serif, smaller)
] as const;

export function getLetterFontClass(index: number): string {
  return LETTER_FONTS[index % LETTER_FONTS.length];
}

export function StylizedName({
  className,
  firstName = "Aman",
  lastName = "Aziz",
  showLastName = true,
  showDot = false,
}: StylizedNameProps) {
  return (
    <span
      className={cn("inline-flex items-baseline tracking-tighter", className)}
    >
      {/* First Name (Aman) */}
      <span className="inline-flex items-baseline">
        {firstName.split("").map((char, index) => (
          <span
            className={getLetterFontClass(index)}
            key={`first-${index}-${char}`}
          >
            {char}
          </span>
        ))}
      </span>

      {/* Last Name (Aziz) */}
      {showLastName && (
        <>
          <span className="inline-block w-[0.25em]" />
          <span className="inline-flex items-baseline">
            {lastName.split("").map((char, index) => (
              <span
                className={getLetterFontClass(index)}
                key={`last-${index}-${char}`}
              >
                {char}
              </span>
            ))}
          </span>
        </>
      )}

      {/* Dot */}
      {showDot && <span className="font-generalsans">.</span>}
    </span>
  );
}
