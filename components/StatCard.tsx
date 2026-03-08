export default function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20">
      <p className="text-xs uppercase tracking-[0.18em] text-white/45">
        {title}
      </p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-white/60">{subtitle}</p>
    </div>
  );
}