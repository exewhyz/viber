"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const [text, setText] = useState("");
  const router = useRouter();

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: (data) => {
        toast.success("Project created successfully");
        router.push(`/projects/${data.id}`);
      },
    })
  );

  return (
    <div className="p-4 flex gap-4 flex-col items-center h-screen justify-center">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-1/3"
        placeholder="Enter text"
      />
      <Button
        disabled={createProject.isPending}
        onClick={() => {
          createProject.mutate({ value: text });
          setText("");
        }}
        className="w-1/3"
      >
        Create
      </Button>
    </div>
  );
}
