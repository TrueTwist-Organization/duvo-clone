import { Suspense } from "react";
import ContactPage from "./contact-client";

export const metadata = {
  title: "Start with one process - Duvo",
  description:
    "Choose an outcome and book a conversation with the Duvo team.",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-[var(--muted)]">
          Loading…
        </div>
      }
    >
      <ContactPage />
    </Suspense>
  );
}
