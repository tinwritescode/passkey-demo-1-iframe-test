"use client";

import { useEffect, useRef } from "react";
import { env } from "../env";

export default function Home() {
  // initialize a channel to the ifram  const channel = new BroadcastChannel("iframe-channel");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const popupWindowRef = useRef<Window | null>(null);

  // Add useEffect to listen for messages from popup
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify origin if needed
      console.log("Received message from popup:", event.data);

      // Handle different message types
      switch (event.data.type) {
        case "POPUP_READY":
          console.log("Popup is ready to receive messages");
          break;
        // Add other cases as needed
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="mx-auto max-w-xl">
      <p className="mt-10 text-sm text-gray-500">
        The iframe and the popup listener are placed in the login screen. Make
        sure to logout from the iframe/popup before clicking the buttons below.
      </p>

      {/* For login, test at login screen, for registration, test at logged in screen */}
      <p className="mt-4">
        For registration, test at logged in screen. <br />
        For login, test at login screen.
      </p>

      <div className="h-20"></div>
      <div className="text-2xl font-bold">Iframe test</div>

      {/* iframe 3000 */}
      <div className="mt-3 flex items-center justify-center">
        <iframe
          ref={iframeRef}
          src={`${env.NEXT_PUBLIC_IFRAME_DOMAIN}`}
          width="500px"
          height="500px"
          className="rounded-md border border-red-400"
          allow="publickey-credentials-create *; publickey-credentials-get *"
        />
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => {
            iframeRef.current?.contentWindow?.postMessage(
              { type: "TRIGGER_REGISTRATION", value: "test" },
              "*",
            );
          }}
          className="rounded-md bg-green-500 p-2 text-white"
        >
          Trigger registration in iframe
        </button>

        <button
          onClick={() => {
            iframeRef.current?.contentWindow?.postMessage(
              { type: "TRIGGER_AUTHN", value: "test" },
              "*",
            );
          }}
          className="rounded-md bg-green-500 p-2 text-white"
        >
          Trigger login in iframe
        </button>
      </div>

      <div className="mt-10 text-2xl font-bold">Popup test</div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => {
            const popup = window.open(
              `${env.NEXT_PUBLIC_IFRAME_DOMAIN}`,
              "_blank",
              "width=500,height=500",
            );
            if (popup) {
              popupWindowRef.current = popup;
            }
          }}
          className="rounded-md bg-blue-500 p-2 text-white"
        >
          Open popup
        </button>

        <button
          onClick={() => {
            if (!popupWindowRef.current) {
              console.error("Popup window is not open");
              return;
            }
            popupWindowRef.current.postMessage(
              { type: "TRIGGER_AUTHN", value: "test" },
              "*",
            );
          }}
          className="rounded-md bg-purple-500 p-2 text-white"
        >
          Send message to popup
        </button>
      </div>

      <div className="h-20"></div>
    </div>
  );
}
