"use client";

import Image from "next/image";

export default function QRcode() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <a
        href="https://chat.whatsapp.com/IO2CwQaesTK8VnV6yHl99N"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-4"
      >
        <Image
          src="/qrcode.png" // zamijeni s pravom putanjom QR koda
          alt="QR code za WhatsApp grupu"
          width={300}
          height={300}
          className="rounded-lg shadow-lg w-full max-w-xs"
        />
        <span className="text-lg font-semibold text-gray-800 text-center">
          Pridruži se WhatsApp grupi
        </span>
      </a>
    </main>
  );
}
