import { useEffect, useState } from "react";

interface Props {
  targetTime: number; // timestamp in ms
}

export default function Timer({ targetTime }: Props) {
  const [remaining, setRemaining] = useState(() => Math.max(0, targetTime - Date.now()));

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => {
      const diff = Math.max(0, targetTime - Date.now());
      setRemaining(diff);
      if (diff <= 0) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, [targetTime]);

  if (remaining <= 0) return null;

  const totalSecs = Math.floor(remaining / 1000);
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;

  return (
    <div className="font-mono text-sm text-brand-burnt font-medium">
      Retry in {h}h {m.toString().padStart(2, "0")}m {s.toString().padStart(2, "0")}s
    </div>
  );
}
