import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import HealthCheck from "./_health-check";

export const metadata = { title: "tRPC Health Check" };

export default function TRPCTestPage() {
  prefetch(trpc.health.queryOptions());
  prefetch(trpc.greet.queryOptions({ name: "Developer" }));

  return (
    <HydrateClient>
      <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">tRPC Setup Check</h1>
            <p className="text-zinc-500 text-sm">
              Delete <code className="text-zinc-300">app/trpc-status/</code> after confirming ✅
            </p>
          </div>

          <ErrorBoundary
            fallback={
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400 text-sm text-center">
                ❌ tRPC request failed — check your terminal for errors
              </div>
            }
          >
            <Suspense
              fallback={
                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-zinc-500 text-sm text-center animate-pulse">
                  Connecting to tRPC...
                </div>
              }
            >
              <HealthCheck />
            </Suspense>
          </ErrorBoundary>

          <p className="text-center text-zinc-600 text-xs">
            <a
              href="https://trpc.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-400 underline underline-offset-2"
            >
              tRPC Docs
            </a>
            {" · "}
            <a
              href="https://github.com/Dhavalkurkutiya/create-trpc-setup"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-400 underline underline-offset-2"
            >
              create-trpc-setup
            </a>
          </p>

        </div>
      </main>
    </HydrateClient>
  );
}
