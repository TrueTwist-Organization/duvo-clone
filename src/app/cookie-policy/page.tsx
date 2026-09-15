import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Cookie Policy - Duvo",
};

export default function Page() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="How cookies and similar technologies are used on the Duvo marketing website."
      updated="November 26, 2025"
      sections={[
        {
          heading: "Essential cookies",
          body: "Required for security, load balancing, and remembering cookie preferences.",
        },
        {
          heading: "Analytics",
          body: "Optional analytics help understand how visitors use the site so we can improve content and navigation.",
        },
        {
          heading: "Choices",
          body: "Where required, you can accept or reject non-essential cookies. Browser settings can also block cookies.",
        },
      ]}
    />
  );
}
