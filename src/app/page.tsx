"use client";

import { useEffect, useRef } from "react";
import { env } from "../env";

export default function Home() {
  // initialize a channel to the ifram  const channel = new BroadcastChannel("iframe-channel");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  return (
    <div className="mx-auto max-w-xl">
      <div className="text-2xl font-bold">Iframe test</div>

      {/* iframe 3000 */}
      <div className="flex h-screen items-center justify-center">
        <iframe
          ref={iframeRef}
          src={`${env.NEXT_PUBLIC_IFRAME_DOMAIN}`}
          width="500px"
          height="500px"
          className="rounded-md border border-red-400"
          allow="publickey-credentials-create publickey-credentials-get *"
        />
      </div>

      <div className="text-2xl font-bold">Popup test</div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            // channelRef.current?.postMessage("hello from parent");
            iframeRef.current?.contentWindow?.postMessage(
              { type: "TRIGGER_AUTHN", value: "test" },
              "*",
            );
          }}
          className="rounded-md bg-green-500 p-2 text-white"
        >
          Send message to iframe
        </button>

        <button
          onClick={() => {
            window.open(`${env.NEXT_PUBLIC_IFRAME_DOMAIN}`, "_blank");
          }}
          className="rounded-md bg-blue-500 p-2 text-white"
        >
          Open iframe in new tab
        </button>
      </div>
    </div>
  );
}
