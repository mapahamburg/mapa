import { MapPin, Calendar, User } from "lucide-react";

interface MeetingChipProps {
  where: string;
  when: string;
  age?: string;
}

export function MeetingChip({ where, when, age }: MeetingChipProps) {
  return (
    <div
      style={{
        background: "var(--surface-page-deep)",
        borderRadius: 12,
        padding: "12px 14px",
        fontSize: 13.5,
        color: "var(--fg)",
        border: "1px solid var(--border-soft)",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <MapPin size={14} strokeWidth={1.5} />
        {where}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Calendar size={14} strokeWidth={1.5} />
        {when}
      </div>
      {age && (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <User size={14} strokeWidth={1.5} />
          {age}
        </div>
      )}
    </div>
  );
}
