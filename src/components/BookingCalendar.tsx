"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Info, MapPin } from "lucide-react";
import { enUS } from "react-day-picker/locale";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const DURATIONS = [30, 45] as const;

function buildSlots() {
  const slots: string[] = [];
  for (let h = 9; h <= 17; h++) {
    for (const m of [0, 15, 30, 45]) {
      if (h === 17 && m > 0) continue;
      slots.push(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
      );
    }
  }
  return slots;
}

const ALL_SLOTS = buildSlots();

function normalizeGuestEmail(value: string) {
  return value.trim().toLowerCase();
}

function isValidGuestEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeGuestEmail(value));
}

function mergeGuestList(current: string[], pendingInput: string) {
  const list = [...current];
  const pending = normalizeGuestEmail(pendingInput);
  if (
    pending &&
    isValidGuestEmail(pending) &&
    !list.includes(pending) &&
    list.length < 10
  ) {
    list.push(pending);
  }
  return list;
}

function nextWeekday(from = new Date()) {
  const d = new Date(from);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 6) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

type Props = {
  outcomeLabel?: string;
  onBooked?: (booking: {
    date: Date;
    time: string;
    duration: number;
  }) => void;
};

type Step = "schedule" | "details" | "done";

export function BookingCalendar({
  outcomeLabel = "Automate",
  onBooked,
}: Props) {
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState<Step>("schedule");
  const [month, setMonth] = useState<Date | undefined>();
  const [date, setDate] = useState<Date | undefined>();
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>(30);
  const [time, setTime] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [guestInput, setGuestInput] = useState("");
  const [guests, setGuests] = useState<string[]>([]);
  const [timezone, setTimezone] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "warn" | "err">("idle");
  const [mailNote, setMailNote] = useState("");
  const [guestError, setGuestError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initial = nextWeekday();
    setDate(initial);
    setMonth(initial);
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    setReady(true);
  }, []);

  const dateLabel = useMemo(() => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [date]);

  const shortDateLabel = useMemo(() => {
    if (!date) return "";
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [date]);

  const canConfirm =
    firstName.trim().length >= 1 &&
    surname.trim().length >= 1 &&
    email.includes("@") &&
    Boolean(date && time);

  function addGuest() {
    const g = normalizeGuestEmail(guestInput);
    if (!g) return;
    if (!isValidGuestEmail(g)) {
      setGuestError("Enter a valid email address.");
      return;
    }
    if (guests.includes(g)) {
      setGuestError("This guest is already added.");
      return;
    }
    if (guests.length >= 10) {
      setGuestError("Maximum 10 guests allowed.");
      return;
    }
    setGuests((prev) => [...prev, g]);
    setGuestInput("");
    setGuestError("");
  }

  async function confirm() {
    if (!date || !time || !canConfirm) {
      setStatus("err");
      return;
    }
    const finalGuests = mergeGuestList(guests, guestInput);
    if (finalGuests.length !== guests.length) {
      setGuests(finalGuests);
      setGuestInput("");
      setGuestError("");
    }
    setLoading(true);
    setStatus("idle");
    setMailNote("");
    const fullName = `${firstName.trim()} ${surname.trim()}`;
    const guestNote =
      finalGuests.length > 0 ? ` Guests: ${finalGuests.join(", ")}.` : "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email: normalizeGuestEmail(email),
          outcome: outcomeLabel,
          message: `Booked ${duration} min demo on ${shortDateLabel} at ${time} (${timezone}).${guestNote}`,
          bookingDate: date.toISOString().slice(0, 10),
          bookingTime: time,
          durationMins: duration,
          timezone,
          guests: finalGuests,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        autoReplyOk?: boolean;
        deliveredTo?: string;
        guestInvitesSent?: number;
        guestInvitesRequested?: number;
        guestInviteResults?: { email: string; sent: boolean; reason?: string }[];
      } | null;
      if (!res.ok) throw new Error("failed");
      const guestSent = data?.guestInvitesSent ?? 0;
      const guestRequested = data?.guestInvitesRequested ?? finalGuests.length;
      if (data?.autoReplyOk === false) {
        setStatus("warn");
        setMailNote(
          `Booked for ${shortDateLabel} at ${time}, but email failed. Check CRM → Emails.`,
        );
      } else if (guestRequested > 0 && guestSent === 0) {
        setStatus("warn");
        const skipped =
          data?.guestInviteResults
            ?.filter((g) => !g.sent)
            .map((g) => `${g.email}${g.reason ? ` (${g.reason})` : ""}`)
            .join("; ") ?? "";
        setMailNote(
          `Booked for ${shortDateLabel} at ${time}. Your confirmation was sent, but guest invites failed.${skipped ? ` ${skipped}` : ""}`,
        );
      } else {
        setStatus("ok");
        const sentGuests =
          data?.guestInviteResults?.filter((g) => g.sent).map((g) => g.email) ??
          [];
        const skippedGuests =
          data?.guestInviteResults?.filter((g) => !g.sent) ?? [];
        let note = `Booked for ${shortDateLabel} at ${time}. Confirmation sent to ${email}.`;
        if (sentGuests.length > 0) {
          note += ` Guest invites sent to: ${sentGuests.join(", ")}.`;
        } else if (finalGuests.length > 0) {
          note += " Guest invites could not be sent.";
        }
        if (skippedGuests.length > 0) {
          const reasons = skippedGuests
            .map((g) => `${g.email}${g.reason ? ` (${g.reason})` : ""}`)
            .join("; ");
          note += ` Skipped: ${reasons}.`;
        }
        setMailNote(note);
      }
      setStep("done");
      onBooked?.({ date, time, duration });
    } catch {
      setStatus("err");
    } finally {
      setLoading(false);
    }
  }

  if (!ready || !month) {
    return (
      <div className="flex h-[520px] items-center justify-center rounded-[1.4rem] border border-[var(--line)] bg-white text-sm text-[var(--muted)]">
        Loading calendar…
      </div>
    );
  }

  if (step === "details" || step === "done") {
    return (
      <div className="overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-white shadow-[0_20px_60px_rgba(42,43,59,0.08)]">
        <div className="px-6 py-7 md:px-10 md:py-9">
          <h3 className="text-xl font-semibold tracking-tight text-[#2a2b3b]">
            Your information
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-base font-semibold text-[#2a2b3b]">
              {dateLabel} {time}
            </p>
            <button
              type="button"
              onClick={() => {
                setStep("schedule");
                setStatus("idle");
              }}
              className="text-sm font-semibold text-[#0d9488] hover:underline"
            >
              Edit
            </button>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
            <MapPin className="h-4 w-4" />
            Google Meet
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-[#2a2b3b]">
                First name <span className="text-red-500">*</span>
              </span>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={step === "done"}
                className="mt-1.5 w-full rounded-lg border border-[#d5d7de] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2a2b3b]/40"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-[#2a2b3b]">
                Surname <span className="text-red-500">*</span>
              </span>
              <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                disabled={step === "done"}
                className="mt-1.5 w-full rounded-lg border border-[#d5d7de] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2a2b3b]/40"
              />
            </label>
          </div>

          <label className="mt-4 block text-sm">
            <span className="font-medium text-[#2a2b3b]">
              Your email address <span className="text-red-500">*</span>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={step === "done"}
              className="mt-1.5 w-full rounded-lg border border-[#d5d7de] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2a2b3b]/40"
            />
          </label>

          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <div className="flex items-center gap-2">
              <h4 className="text-base font-semibold text-[#2a2b3b]">
                Add guests
              </h4>
              <Info className="h-4 w-4 text-[var(--muted)]" aria-hidden />
            </div>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Invite up to 10 guests to attend the meeting.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input
                type="email"
                placeholder="Add an email…"
                value={guestInput}
                disabled={step === "done" || guests.length >= 10}
                onChange={(e) => {
                  setGuestInput(e.target.value);
                  if (guestError) setGuestError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addGuest();
                  }
                }}
                className="min-w-[12rem] flex-1 rounded-lg border border-[#d5d7de] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#2a2b3b]/40"
              />
              <button
                type="button"
                onClick={addGuest}
                disabled={
                  step === "done" ||
                  !isValidGuestEmail(guestInput) ||
                  guests.length >= 10
                }
                className={cn(
                  "rounded-lg border px-4 py-2.5 text-sm font-semibold transition",
                  isValidGuestEmail(guestInput) && step !== "done"
                    ? "border-[#2a2b3b] bg-[#2a2b3b] text-white"
                    : "cursor-not-allowed border-[#c5d4e0] bg-[#eef4f8] text-[#9aa0a8]",
                )}
              >
                Add
              </button>
              <span className="text-sm text-[var(--muted)]">
                {guests.length}/10 guests
              </span>
            </div>
            {guestError ? (
              <p className="mt-2 text-sm text-red-600">{guestError}</p>
            ) : guestInput.trim() && isValidGuestEmail(guestInput) ? (
              <p className="mt-2 text-sm text-[#0d9488]">
                Press Add or Confirm — this guest will be included automatically.
              </p>
            ) : null}
            {guests.length === 0 ? (
              <p className="mt-3 text-sm text-[var(--muted)]">
                Added guests will appear here.
              </p>
            ) : (
              <ul className="mt-3 flex flex-wrap gap-2">
                {guests.map((g) => (
                  <li
                    key={g}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg-soft)] px-3 py-1 text-xs font-medium"
                  >
                    {g}
                    {step !== "done" ? (
                      <button
                        type="button"
                        aria-label={`Remove ${g}`}
                        onClick={() =>
                          setGuests((prev) => prev.filter((x) => x !== g))
                        }
                        className="text-[var(--muted)] hover:text-[var(--fg)]"
                      >
                        ×
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {status === "ok" || status === "warn" ? (
            <p
              className={cn(
                "mt-6 text-sm",
                status === "ok" ? "text-emerald-700" : "text-amber-700",
              )}
            >
              {mailNote}
            </p>
          ) : null}
          {status === "err" ? (
            <p className="mt-6 text-sm text-red-600">
              Fill first name, surname, and a valid email.
            </p>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[var(--line)] bg-[#f4f5f7] px-6 py-4 md:px-10">
          <button
            type="button"
            onClick={() => {
              setStep("schedule");
              setStatus("idle");
            }}
            className="rounded-lg border border-[#2a2b3b]/25 bg-white px-5 py-2.5 text-sm font-semibold text-[#2a2b3b]"
          >
            Back
          </button>
          {step === "done" ? (
            <button
              type="button"
              onClick={() => {
                setStep("schedule");
                setTime(null);
                setFirstName("");
                setSurname("");
                setEmail("");
                setGuests([]);
                setStatus("idle");
                setMailNote("");
              }}
              className="rounded-lg bg-[#2a2b3b] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Book another
            </button>
          ) : (
            <button
              type="button"
              disabled={loading || !canConfirm}
              onClick={() => void confirm()}
              className={cn(
                "rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition",
                canConfirm && !loading
                  ? "bg-[#2a2b3b] hover:bg-[#1a1a22]"
                  : "cursor-not-allowed bg-[#9aa0a8]",
              )}
            >
              {loading ? "Confirming…" : "Confirm"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-white shadow-[0_20px_60px_rgba(42,43,59,0.08)] md:grid md:grid-cols-[0.95fr_1.05fr]">
      <div className="bg-[#22222c] px-5 py-6 text-white md:px-7 md:py-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logos/duvo-logo-dark.svg"
            alt="duvo.ai"
            width={110}
            height={28}
            className="h-7 w-auto"
          />
          <p className="mt-3 text-sm text-white/70">Demo call with our team</p>
        </div>

        <div className="mt-6 flex justify-center">
          <Calendar
            mode="single"
            locale={enUS}
            month={month}
            onMonthChange={setMonth}
            selected={date}
            onSelect={(d) => {
              setDate(d);
              setTime(null);
            }}
            disabled={(d) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return d < today || d.getDay() === 0 || d.getDay() === 6;
            }}
            className="rounded-xl border-0 bg-transparent p-0 text-white [--cell-size:2.35rem]"
            classNames={{
              root: "w-full",
              months: "w-full",
              month: "w-full",
              month_caption:
                "flex items-center justify-center px-2 pt-1 text-sm font-semibold text-white",
              caption_label: "text-white",
              button_previous:
                "text-white/70 hover:bg-white/10 hover:text-white",
              button_next: "text-white/70 hover:bg-white/10 hover:text-white",
              weekdays: "text-white/45",
              weekday: "text-[0.65rem] font-semibold tracking-[0.12em]",
              day: "text-white/85",
              day_button:
                "text-white data-[selected-single=true]:bg-white data-[selected-single=true]:text-[#121217] hover:bg-white/10",
              today: "bg-white/10 rounded-full",
              outside: "text-white/25",
              disabled: "text-white/20 opacity-40",
            }}
          />
        </div>
      </div>

      <div className="flex flex-col px-5 py-6 md:px-7 md:py-8">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <MapPin className="h-4 w-4" />
          Google Meet
        </div>

        <p className="mt-6 text-sm font-semibold">How long do you need?</p>
        <div className="mt-2 flex gap-2">
          {DURATIONS.map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setDuration(mins)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition",
                duration === mins
                  ? "border-transparent bg-[#e8eef2] text-[var(--fg)]"
                  : "border-[var(--line)] bg-white hover:bg-[var(--bg-soft)]",
              )}
            >
              {mins} mins
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm font-semibold">What time works best?</p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Showing times for {shortDateLabel || "—"}
        </p>
        <p className="mt-1 text-xs text-[#0d9488]">{timezone}</p>

        <ScrollArea className="mt-4 h-56 rounded-xl border border-[var(--line)]">
          <div className="space-y-2 p-3">
            {ALL_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => {
                  setTime(slot);
                  setStep("details");
                  setStatus("idle");
                }}
                className={cn(
                  "w-full rounded-lg border px-3 py-2.5 text-sm font-medium transition",
                  time === slot
                    ? "border-[#2a2b3b] bg-[#2a2b3b] text-white"
                    : "border-[var(--line)] hover:border-[var(--fg)]/30",
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
