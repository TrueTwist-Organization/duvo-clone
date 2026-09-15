"use client";

import { useEffect, useMemo, useState } from "react";
import { CrmShell } from "@/components/crm/CrmShell";
import type { SessionUser } from "@/lib/crm-auth";
import { PIPELINE, type LeadStatus } from "@/lib/crm-types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LeadRow = {
  id: string;
  name: string;
  email: string;
  company?: string;
  status: LeadStatus;
  valueCents: number;
  currency: string;
};

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function CrmPipelineClient({ user }: { user: SessionUser }) {
  const [leads, setLeads] = useState<LeadRow[]>([]);

  useEffect(() => {
    void fetch("/api/crm/leads")
      .then((r) => r.json())
      .then((data: { leads: LeadRow[] }) => {
        setLeads(data.leads ?? []);
      });
  }, []);

  const byStatus = useMemo(() => {
    const map = Object.fromEntries(
      PIPELINE.map((status) => [status, [] as LeadRow[]]),
    ) as Record<LeadStatus, LeadRow[]>;
    for (const lead of leads) {
      map[lead.status]?.push(lead);
    }
    return map;
  }, [leads]);

  return (
    <CrmShell user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Pipeline</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Leads grouped by status across the sales funnel.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {PIPELINE.map((status) => {
            const column = byStatus[status] ?? [];
            return (
              <div
                key={status}
                className="w-64 shrink-0 space-y-3"
              >
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                    {status}
                  </h3>
                  <Badge variant="secondary">{column.length}</Badge>
                </div>
                <div className="space-y-2">
                  {column.length === 0 ? (
                    <p className="rounded-xl border border-dashed px-3 py-6 text-center text-xs text-muted-foreground">
                      Empty
                    </p>
                  ) : (
                    column.map((lead) => (
                      <Card key={lead.id} className="shadow-none">
                        <CardHeader className="p-3 pb-1">
                          <CardTitle className="text-sm font-medium">
                            {lead.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-1 p-3 pt-0 text-xs text-muted-foreground">
                          <p>{lead.company ?? lead.email}</p>
                          {lead.valueCents > 0 ? (
                            <p className="font-medium text-foreground">
                              {formatMoney(lead.valueCents, lead.currency)}
                            </p>
                          ) : null}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CrmShell>
  );
}
