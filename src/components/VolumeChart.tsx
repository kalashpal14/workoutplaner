"use client";

interface ChartPoint {
  label: string;
  volume: number;
}

export default function VolumeChart({ data }: { data: ChartPoint[] }) {
  if (data.length === 0) {
    return (
      <p className="py-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Log a few sets to see your volume trend.
      </p>
    );
  }

  const max = Math.max(...data.map((d) => d.volume), 1);

  return (
    <div className="flex h-32 items-end gap-2">
      {data.map((d) => (
        <div
          key={d.label}
          className="flex min-w-0 flex-1 flex-col items-center gap-1"
          title={`${d.label}: ${d.volume.toLocaleString()} kg`}
        >
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md bg-blue-500/80 transition-all hover:bg-blue-600"
              style={{ height: `${Math.max(4, (d.volume / max) * 100)}%` }}
            />
          </div>
          <span className="w-full truncate text-center text-[10px] text-zinc-500 dark:text-zinc-400">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}
