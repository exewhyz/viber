"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const { data: messages } = useQuery(trpc.messages.getMany.queryOptions());
  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
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
        disabled={createMessage.isPending}
        onClick={() => {
          createMessage.mutate({ value: text });
          setText("");
        }}
        className="w-1/3"
      >
        Create
      </Button>
      <div className="flex flex-col gap-4 w-full items-center overflow-y-auto h-96">
        {messages && messages?.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className="p-2 border rounded w-1/3 text-left"
            >
              <p className="text-sm text-gray-500">
                {message.createdAt.toLocaleString()}
              </p>
              <Link
                href={message?.fragment?.sandboxUrl || "#"}
                target={!message?.fragment?.sandboxUrl ? "_self" : "_blank"}
              >
                <p className="text-lg font-semibold">{message.content}</p>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No messages yet</div>
        )}
      </div>
    </div>
  );
}
