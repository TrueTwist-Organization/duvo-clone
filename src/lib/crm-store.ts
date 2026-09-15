import { hashPassword } from "./crm-auth";
import type {
  CrmRole,
  InvoiceStatus,
  LeadStatus,
  PaymentStatus,
} from "./crm-types";

export type { CrmRole, InvoiceStatus, LeadStatus, PaymentStatus };
export { PIPELINE } from "./crm-types";

export type StoreUser = {
  id: string;
  email: string;
  name: string;
  role: CrmRole;
  passwordHash: string;
  active: boolean;
  createdAt: string;
};

export type StoreLead = {
  id: string;
  name: string;
  email: string;
  company?: string;
  process?: string;
  message?: string;
  source: string;
  status: LeadStatus;
  valueCents: number;
  currency: string;
  assignedToId?: string;
  createdAt: string;
  updatedAt: string;
};

export type StoreActivity = {
  id: string;
  leadId: string;
  userId?: string;
  type: string;
  note: string;
  createdAt: string;
};

export type StoreInvoice = {
  id: string;
  number: string;
  leadId?: string;
  createdById?: string;
  customerName: string;
  customerEmail: string;
  customerCompany?: string;
  description: string;
  amountCents: number;
  currency: string;
  status: InvoiceStatus;
  dueDate?: string;
  stripeSessionId?: string;
  stripePaymentIntentId?: string;
  paidAt?: string;
  sentAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type StorePayment = {
  id: string;
  invoiceId: string;
  amountCents: number;
  currency: string;
  status: PaymentStatus;
  stripeCheckoutSessionId?: string;
  stripePaymentIntentId?: string;
  stripeEventId?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type StoreEmail = {
  id: string;
  to: string[];
  from: string;
  subject: string;
  html: string;
  replyTo?: string;
  tag: string;
  mode: "resend" | "mock" | "gmail";
  status: "queued" | "sent" | "failed";
  error?: string;
  createdAt: string;
};

type MemoryStore = {
  users: StoreUser[];
  leads: StoreLead[];
  activities: StoreActivity[];
  invoices: StoreInvoice[];
  payments: StorePayment[];
  emails: StoreEmail[];
  invoiceSeq: number;
  ready: boolean;
};

const g = globalThis as unknown as { __duvoCrmStore?: MemoryStore };

function emptyStore(): MemoryStore {
  return {
    users: [],
    leads: [],
    activities: [],
    invoices: [],
    payments: [],
    emails: [],
    invoiceSeq: 1000,
    ready: false,
  };
}

export function getStore(): MemoryStore {
  if (!g.__duvoCrmStore) g.__duvoCrmStore = emptyStore();
  if (!g.__duvoCrmStore.emails) g.__duvoCrmStore.emails = [];
  return g.__duvoCrmStore;
}

export async function ensureSeeded() {
  const store = getStore();
  if (store.ready) return store;

  const [adminHash, salesHash, acctHash] = await Promise.all([
    hashPassword("admin123"),
    hashPassword("sales123"),
    hashPassword("account123"),
  ]);

  store.users = [
    {
      id: "user_admin",
      email: "admin@duvo.ai",
      name: "Admin User",
      role: "ADMIN",
      passwordHash: adminHash,
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "user_sales1",
      email: "sales@duvo.ai",
      name: "Alex Sales",
      role: "SALES",
      passwordHash: salesHash,
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "user_sales2",
      email: "jordan@duvo.ai",
      name: "Jordan Closer",
      role: "SALES",
      passwordHash: salesHash,
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "user_acct",
      email: "accounting@duvo.ai",
      name: "Sam Accounts",
      role: "ACCOUNTING",
      passwordHash: acctHash,
      active: true,
      createdAt: new Date().toISOString(),
    },
  ];

  const now = Date.now();
  store.leads = [
    {
      id: "lead_1",
      name: "Petra Novak",
      email: "petra@notino.example",
      company: "Notino",
      process: "Bonus reconciliation",
      message: "Want a process catalogue and automation brief.",
      source: "website",
      status: "PROPOSAL",
      valueCents: 4800000,
      currency: "EUR",
      assignedToId: "user_sales1",
      createdAt: new Date(now - 86400000 * 6).toISOString(),
      updatedAt: new Date(now - 86400000 * 1).toISOString(),
    },
    {
      id: "lead_2",
      name: "Martin Kral",
      email: "martin@rohlik.example",
      company: "Rohlik Group",
      process: "OOS prevention",
      message: "Need inbound invoice audit pilot.",
      source: "website",
      status: "QUALIFIED",
      valueCents: 7200000,
      currency: "EUR",
      assignedToId: "user_sales2",
      createdAt: new Date(now - 86400000 * 4).toISOString(),
      updatedAt: new Date(now - 86400000 * 2).toISOString(),
    },
    {
      id: "lead_3",
      name: "Eva Benes",
      email: "eva@pilulka.example",
      company: "Pilulka",
      process: "Ordering",
      message: "Availability recovery follow-up.",
      source: "referral",
      status: "NEW",
      valueCents: 2500000,
      currency: "EUR",
      createdAt: new Date(now - 86400000 * 1).toISOString(),
      updatedAt: new Date(now - 86400000 * 1).toISOString(),
    },
    {
      id: "lead_4",
      name: "Tom Hughes",
      email: "tom@retail.example",
      company: "North Retail",
      process: "Freight audit",
      message: "Guaranteed freight audit interest.",
      source: "website",
      status: "WON",
      valueCents: 3600000,
      currency: "EUR",
      assignedToId: "user_sales1",
      createdAt: new Date(now - 86400000 * 20).toISOString(),
      updatedAt: new Date(now - 86400000 * 3).toISOString(),
    },
  ];

  store.activities = [
    {
      id: "act_1",
      leadId: "lead_1",
      userId: "user_sales1",
      type: "note",
      note: "Sent discovery deck and booked workshop.",
      createdAt: new Date(now - 86400000 * 2).toISOString(),
    },
  ];

  store.invoices = [
    {
      id: "inv_1",
      number: "INV-1001",
      leadId: "lead_4",
      createdById: "user_acct",
      customerName: "Tom Hughes",
      customerEmail: "tom@retail.example",
      customerCompany: "North Retail",
      description: "Freight Audit — pilot run (Q1)",
      amountCents: 1500000,
      currency: "EUR",
      status: "SENT",
      dueDate: new Date(now + 86400000 * 14).toISOString(),
      sentAt: new Date(now - 86400000 * 2).toISOString(),
      createdAt: new Date(now - 86400000 * 2).toISOString(),
      updatedAt: new Date(now - 86400000 * 2).toISOString(),
    },
  ];

  store.invoiceSeq = 1002;
  store.emails = store.emails ?? [];
  store.ready = true;
  return store;
}

export function nextInvoiceNumber(store: MemoryStore) {
  const n = store.invoiceSeq++;
  return `INV-${n}`;
}
