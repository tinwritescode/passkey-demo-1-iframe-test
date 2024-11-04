"use client";

import { env } from "../env";

export default function Home() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="text-2xl font-bold">Testing cross domain</div>

      {/* iframe 3000 */}
      <div className="flex h-screen items-center justify-center">
        <iframe
          src={`${env.NEXT_PUBLIC_IFRAME_DOMAIN}`}
          width="500px"
          height="500px"
          className="rounded-md border border-red-400"
          allow="publickey-credentials-create publickey-credentials-get"
        />
      </div>
    </div>
  );
}
