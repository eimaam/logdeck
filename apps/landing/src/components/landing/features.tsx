import { Bell, Activity, Zap, type LucideIcon } from "lucide-react";
import { Card } from "../ui/Card";
import { FadeIn, FadeInItem, FadeInStagger } from "../ui/FadeIn";
import { Typography } from "antd";

const { Title } = Typography;


interface IFeatureProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

const FEATURES_DATA: IFeatureProps[] = [
    {
        title: "Real-time Monitoring",
        description: "Watch your logs stream in real-time as events happen in your applications. Zero delay, pure feedback.",
        icon: Activity
    },
    {
        title: "Instant Telegram Alerts",
        description: "Get notified immediately on your phone via Telegram when critical errors occur. Configure alerts easily.",
        icon: Bell
    },
    {
        title: "Zero Latency Logging",
        description: "Built with performance in mind. Log and forget without impacting your app's response times.",
        icon: Zap
    }
]

const FeatureCard = ({ icon: Icon, title, description }: IFeatureProps) => {
    return <Card padding="lg" rounded="none" className="w-full h-full    bg-transparent!  hover:border-border-strong transition-colors">
        <div className="w-12 h-12 border-border-default border bg-bg-surface  mb-6  flex items-center justify-center text-brand-primary">
            <Icon size={24} />
        </div>
        <div className="space-y-3">
            <h4 className="font-display text-xl font-bold text-text-primary">
                {title}
            </h4>
            <p className="text-base text-text-secondary leading-relaxed">
                {description}
            </p>
        </div>
    </Card>
}


const Features = () => {
    return (
        <section id="features" className="w-full space-y-16 px-4 md:px-6 py-32 bg-bg-base">
            <FadeIn className="text-left">
                <div className="space-y-4 font-display!">
                    <span className="text-brand-primary font-semibold tracking-widest uppercase text-xs">Features</span>
                    <Title level={2} className="font-display! text-4xl! md:text-5xl! font-bold! text-text-primary! tracking-tight">
                        Debug production
                    </Title>
                    <p className="text-text-secondary max-w-xl">
                        Designed for developers who want simplicity and speed without the bloat.
                    </p>
                </div>
            </FadeIn>
            <FadeInStagger className="w-full grid grid-cols-1 md:grid-cols-3  max-w-6xl mx-auto">
                {
                    FEATURES_DATA.map((feature, index) => (
                        <FadeInItem key={index} className="h-full">
                            <FeatureCard {...feature} />
                        </FadeInItem>
                    ))
                }
            </FadeInStagger>
        </section>
    )
}

export default Features;
