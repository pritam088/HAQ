import React from "react";

interface FormattedTextProps {
  content: string;
  className?: string;
  boldClassName?: string;
}

/**
 * FormattedText:
 * 1. Strips markdown heading hashtags (#, ##, ###, etc.)
 * 2. Parses **bold** markers into semantic <strong> tags with custom styling
 * 3. Preserves line breaks and clean paragraph structure
 */
export function FormattedText({
  content,
  className = "",
  boldClassName = "font-bold text-navy",
}: FormattedTextProps) {
  if (!content) return null;

  // 1. Remove all markdown heading hashtags (#, ##, ###, ####, etc.) at line starts
  const stripped = content.replace(/^#{1,6}\s*/gm, "");

  // 2. Split lines
  const lines = stripped.split("\n");

  return (
    <div className={`space-y-1.5 ${className}`}>
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        // Split by **bold** markdown tokens
        const parts = line.split(/(\*\*[^*]+?\*\*)/g);

        return (
          <p key={lineIdx} className="leading-relaxed">
            {parts.map((part, partIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                const text = part.slice(2, -2);
                return (
                  <strong key={partIdx} className={boldClassName}>
                    {text}
                  </strong>
                );
              }
              return <span key={partIdx}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}

