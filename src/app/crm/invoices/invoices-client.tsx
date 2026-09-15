"use client";

import { useEffect, useState } from "react";
import { CrmShell } from "@/components/crm/CrmShell";
import type { SessionUser } from "@/lib/crm-auth";
import type { InvoiceStatus } from "@/lib/crm-types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type InvoiceRow = {
  id: string;
  number: string;
  customerName: string;
  customerEmail: string;
  customerCompany?: string;
  description: string;
  amountCents: number;
  currency: string;
  status: InvoiceStatus;
  dueDate?: string;
  createdAt: string;
};

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function CrmInvoicesClient({ user }: { user: SessionUser }) {
  const [invoices, setInvoices] = useState<InvoiceRow[]>([]);

  useEffect(() => {
    void fetch("/api/crm/invoices")
      .then((r) => r.json())
      .then((data: { invoices: InvoiceRow[] }) => {
        setInvoices(data.invoices ?? []);
      });
  }, []);

  return (
    <CrmShell user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Invoices</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Customer invoices created from won deals and accounting.
          </p>
        </div>

        <div className="rounded-xl border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No invoices yet.
                  </TableCell>
                </TableRow>
              ) : (
                invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.number}
                    </TableCell>
                    <TableCell>
                      <div>{invoice.customerName}</div>
                      <div className="text-xs text-muted-foreground">
                        {invoice.customerCompany ?? invoice.customerEmail}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate text-muted-foreground">
                      {invoice.description}
                    </TableCell>
                    <TableCell>
                      {formatMoney(invoice.amountCents, invoice.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{invoice.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {invoice.dueDate
                        ? new Date(invoice.dueDate).toLocaleDateString()
                        : "—"}
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
