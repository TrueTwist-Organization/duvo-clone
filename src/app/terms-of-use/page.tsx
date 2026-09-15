import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Terms of Use - Duvo",
};

export default function Page() {
  return (
    <LegalPage
      title="Terms of Use"
      description="Terms governing use of the Duvo marketing website and related public materials."
      updated="November 26, 2025"
      sections={[
        {
          heading: "Acceptance",
          body: "By using this website you agree to these terms. Product access is governed by a separate customer agreement.",
        },
        {
          heading: "Acceptable use",
          body: "Do not misuse the site, attempt unauthorized access, scrape in a way that degrades service, or misrepresent affiliation with Duvo.",
        },
        {
          heading: "Intellectual property",
          body: "Site content, trademarks, and materials remain the property of taskcrew, Inc. or its licensors.",
        },
        {
          heading: "Limitation",
          body: "The marketing site is provided as-is. Customer warranties live in the commercial agreement for the Duvo platform.",
        },
      ]}
    />
  );
}
