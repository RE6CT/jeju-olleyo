interface ProgressIndicatorProps {
  current: number;
  total: number;
  progress: number;
}

export const ProgressIndicator = ({
  current,
  total,
  progress,
}: ProgressIndicatorProps) => {
  return (
    <div className="absolute bottom-6 left-0 z-10 w-full">
      <div className="container mx-auto px-5">
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-white/70 px-3 py-1 text-sm font-semibold text-black md:text-base">
            {current} / {total}
          </span>
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/50">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-black"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
