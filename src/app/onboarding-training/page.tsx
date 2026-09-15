import { OutcomePage } from "@/components/OutcomePage";
import { onboardingTraining } from "@/content/outcomes";

export const metadata = {
  title: "Role-specific onboarding and process training - Duvo",
  description: onboardingTraining.description,
};

export default function Page() {
  return <OutcomePage content={onboardingTraining} />;
}
