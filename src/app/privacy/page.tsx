import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy and personal data protection - Duvo",
};

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How taskcrew, Inc. (Duvo) processes personal data for the website, marketing, careers, and communications."
      updated="November 26, 2025"
      sections={[
        {
          heading: "Controller",
          body: "taskcrew, Inc. operates Duvo. For privacy questions contact info@duvo.ai. Platform customer data under an MSA is governed by that agreement, not this website policy.",
        },
        {
          heading: "What we process",
          body: "Contact details you submit, usage data for the marketing site, career application data, and communications metadata needed to respond to you.",
        },
        {
          heading: "Legal bases",
          body: "Contract performance, legitimate interests in operating and improving the site, and consent where required for marketing.",
        },
        {
          heading: "Your rights",
          body: "EEA/UK individuals may request access, rectification, erasure, restriction, and portability, and may lodge a complaint with a supervisory authority.",
        },
      ]}
    />
  );
}
