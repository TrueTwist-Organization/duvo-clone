"use client";

import { useEffect, useState } from "react";
import { CrmShell } from "@/components/crm/CrmShell";
import type { SessionUser } from "@/lib/crm-auth";
import type { PaymentStatus } from "@/lib/crm-types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type PaymentRow = {
  id: string;
  invoiceId: string;
  amountCents: number;
  currency: string;
  status: PaymentStatus;
  paidAt?: string;
  createdAt: string;
};

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function CrmPaymentsClient({ user }: { user: SessionUser }) {
  const [payments, setPayments] = useState<PaymentRow[]>([]);

  useEffect(() => {
    void fetch("/api/crm/payments")
      .then((r) => r.json())
      .then((data: { payments: PaymentRow[] }) => {
        setPayments(data.payments ?? []);
      });
  }, []);

  return (
    <CrmShell user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Payments</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Stripe and recorded payments linked to invoices.
          </p>
        </div>

        <div className="rounded-xl border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No payments yet.
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium font-mono text-xs">
                      {payment.id}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">
                      {payment.invoiceId}
                    </TableCell>
                    <TableCell>
                      {formatMoney(payment.amountCents, payment.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{payment.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleString()
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
