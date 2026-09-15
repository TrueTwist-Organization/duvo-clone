"use client";

import { useEffect, useState } from "react";
import { CrmShell } from "@/components/crm/CrmShell";
import type { SessionUser } from "@/lib/crm-auth";
import type { LeadStatus } from "@/lib/crm-types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type LeadRow = {
  id: string;
  name: string;
  email: string;
  company?: string;
  status: LeadStatus;
  source: string;
};

export function CrmLeadsClient({ user }: { user: SessionUser }) {
  const [leads, setLeads] = useState<LeadRow[]>([]);

  useEffect(() => {
    void fetch("/api/crm/leads")
      .then((r) => r.json())
      .then((data: { leads: LeadRow[] }) => {
        setLeads(data.leads ?? []);
      });
  }, []);

  return (
    <CrmShell user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Leads</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            All inbound and pipeline leads from the website and sales team.
          </p>
        </div>

        <div className="rounded-xl border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No leads yet.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {lead.email}
                    </TableCell>
                    <TableCell>{lead.company ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{lead.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.source}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </CrmShell>
  );
}
