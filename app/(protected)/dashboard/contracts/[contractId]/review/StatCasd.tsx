// components/StatCard.tsx

type Props = {
  value: number;
  label: string;
  color: string;
};

export default function StatCard({
  value,
  label,
  color,
}: Props) {
  return (
    <div className="glass-card glow-border rounded-[2rem] border border-border/60 p-6">
      <div className={`text-4xl font-bold ${color}`}>
        {value}
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        {label}
      </div>
    </div>
  );
}