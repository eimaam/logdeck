
import { FadeIn, FadeInStagger, FadeInItem } from "../ui/FadeIn";
import { Typography } from "antd";
import PriceCard from "./price-card";

const { Title } = Typography;

const PRICING_DATA = [
    {
        name: "Hobby",
        price: "0",
        description: "For passion projects.",
        features: ["1 Project", "1000 Logs/day", "email support"],
        buttonText: "Get Started",
        variant: "outline" as const
    },
    {
        name: "Pro",
        price: "29",
        description: "For professionals.",
        features: ["10 Projects", "100,000 Logs/day", "Telegram Alerts", "24h support"],
        buttonText: "Start Free Trial",
        variant: "default" as const,
        popular: true
    },
    {
        name: "Enterprise",
        price: "99",
        description: "For growing teams.",
        features: ["Unlimited Projects", "Custom log limits", "Priority support"],
        buttonText: "Contact Sales",
        variant: "outline" as const
    }
]

const Pricing = () => {
    return (
        <section id="pricing" className="w-full space-y-16 px-4 md:px-6 py-32 bg-bg-base">
            <FadeIn>
                <div className="md:flex justify-between text-left space-y-4">
                    <div>

                    <span className="font-display text-brand-primary font-semibold tracking-widest uppercase text-xs">Pricing</span>
                    <Title level={2} className="font-display! text-4xl! md:text-5xl! font-bold! text-text-primary! tracking-tight">
                        Transparent pricing
                    </Title>
                    </div>
                    <p className="text-text-secondary max-w-xl">
                        Start for free, scale as you grow. <br /> No hidden fees.
                    </p>
                </div>
            </FadeIn>

            <FadeInStagger className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {PRICING_DATA.map((plan, index) => (
                    <PriceCard key={index} plan={plan} />
                ))}
            </FadeInStagger>
        </section>
    )
}

export default Pricing;
