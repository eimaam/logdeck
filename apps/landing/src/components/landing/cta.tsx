import { Typography } from "antd";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
import { APP_URL } from "@logdeck/shared";

const { Title } = Typography;

const Cta = () => {
    return (
        <section className="w-full px-4 md:px-6 py-32">
            <FadeIn className=" max-w-5xl mx-auto text-center bg-bg-surface p-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,var(--bg-base)_0%,transparent_70%)]" />
                <Title level={2} className="font-display! text-text-primary! text-5xl md:text-7xl font-bold! mb-8 tracking-tight">
                    Stop flying blind.
                </Title>
                <p className="text-text-secondary text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-12 font-medium opacity-90">
                    Get the visibility you need to build better software. Start your 14-day free trial today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="!bg-bg-base !text-text-primary hover:!bg-bg-surface" onClick={() => window.location.href = APP_URL + "/auth"}>
                        Start Free Trial
                    </Button>
                    <Button size="lg" className="!border-text-on-primary !text-text-on-primary hover:!bg-text-on-primary/10">
                        View Documentation
                    </Button>
                </div>
            </FadeIn>
        </section>
    )
}

export default Cta;
