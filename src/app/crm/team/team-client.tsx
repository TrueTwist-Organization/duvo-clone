"use client";

import { useEffect, useState } from "react";
import { CrmShell } from "@/components/crm/CrmShell";
import type { SessionUser } from "@/lib/crm-auth";
import type { CrmRole } from "@/lib/crm-types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TeamUser = {
  id: string;
  email: string;
  name: string;
  role: CrmRole;
  active: boolean;
  createdAt: string;
};

export function CrmTeamClient({ user }: { user: SessionUser }) {
  const [users, setUsers] = useState<TeamUser[]>([]);

  useEffect(() => {
    void fetch("/api/crm/team")
      .then((r) => r.json())
      .then((data: { users: TeamUser[] }) => {
        setUsers(data.users ?? []);
      });
  }, []);

  const sales = users.filter((u) => u.role === "SALES");

  return (
    <CrmShell user={user}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Sales team</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Active sales users who can own leads in the pipeline.
          </p>
        </div>

        <div className="rounded-xl border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No sales users found.
                  </TableCell>
                </TableRow>
              ) : (
                sales.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {member.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{member.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={member.active ? "default" : "outline"}>
                        {member.active ? "Active" : "Inactive"}
                      </Badge>
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
