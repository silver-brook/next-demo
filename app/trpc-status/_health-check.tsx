"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function HealthCheck() {
  const trpc = useTRPC();
  const { data: health } = useSuspenseQuery(trpc.health.queryOptions());
  const { data: greet  } = useSuspenseQuery(trpc.greet.queryOptions({ name: "Developer" }));

  return (
    <div className="space-y-3">
      <Row label="Status"    value={`✅ ${health.status}`}  color="text-emerald-400" />
      <Row label="Code"      value={String(health.code)}    color="text-blue-400" />
      <Row label="Message"   value={greet.message}          color="text-violet-400" />
      <Row label="Transport" value="HTTP Batch Link"         color="text-zinc-400" />
    </div>
  );
}

function Row({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
      <span className="text-zinc-500 text-sm">{label}</span>
      <span className={`text-sm font-medium ${color}`}>{value}</span>
    </div>
  );
}
