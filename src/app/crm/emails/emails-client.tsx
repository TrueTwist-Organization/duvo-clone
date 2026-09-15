"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { CrmShell } from "@/components/crm/CrmShell";
import type { SessionUser } from "@/lib/crm-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type MailRow = {
  id: string;
  to: string[];
  subject: string;
  tag: string;
  mode: "resend" | "mock";
  status: string;
  createdAt: string;
  html: string;
};

export function CrmEmailsClient({ user }: { user: SessionUser }) {
  const [mode, setMode] = useState<"mock" | "resend">("mock");
  const [emails, setEmails] = useState<MailRow[]>([]);

  useEffect(() => {
    void fetch("/api/crm/emails")
      .then((r) => r.json())
      .then((data: { mode: "mock" | "resend"; emails: MailRow[] }) => {
        setMode(data.mode);
        setEmails(data.emails ?? []);
      });
  }, []);

  return (
    <CrmShell user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Email automation</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Contact + booking forms auto-send sales notify + user confirmation.
            {mode === "mock"
              ? " Running in mock mode (no RESEND_API_KEY) — mails are logged here."
              : " Sending live via Resend."}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Mail className="h-4 w-4" />
              Outbox
            </CardTitle>
            <CardDescription>
              Mode: <Badge variant="secondary">{mode}</Badge>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {emails.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No emails yet. Submit the contact form or book a demo to trigger
                automation.
              </p>
            ) : (
              emails.map((mail) => (
                <div
                  key={mail.id}
                  className="rounded-xl border p-4 text-sm"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">{mail.tag}</Badge>
                    <Badge
                      variant={mail.status === "sent" ? "default" : "destructive"}
                    >
                      {mail.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(mail.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 font-medium">{mail.subject}</p>
                  <p className="text-muted-foreground">
                    To: {mail.to.join(", ")}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </CrmShell>
  );
}
