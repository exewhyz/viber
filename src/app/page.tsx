"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const queryClient = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Background task started");
      },
    })
  );
  const [text, setText] = useState("");
  return (
    <div className="p-4 flex gap-4 flex-col items-center h-screen justify-center">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-1/3"
        placeholder="Enter text"
      />
      <Button
        disabled={queryClient.isPending}
        onClick={() => queryClient.mutate({ text })}
      >
        Invoke
      </Button>
    </div>
  );
}
