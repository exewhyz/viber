"use client";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Renders a button that triggers a background task mutation and displays a success notification upon completion.
 *
 * The button is disabled while the mutation is pending.
 */
export default function Home() {
  const trpc = useTRPC();
  const queryClient = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Background task started");
      },
    })
  );
  return (
    <div className="p-4">
      <Button
        disabled={queryClient.isPending}
        onClick={() => queryClient.mutate({ text: "test" })}
      >
        Invoke
      </Button>
    </div>
  );
}
