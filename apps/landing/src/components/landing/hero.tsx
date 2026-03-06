import { Button } from '@/components/ui/Button';
import { Typography } from 'antd';
import { FadeIn, FadeInItem, FadeInStagger } from '@/components/ui/FadeIn';
import DemoCode from './demo-code';

const { Title } = Typography;

const Hero = () => {
    return (
        <section className="flex flex-col items-center pt-24 pb-32 overflow-hidden">
            <FadeInStagger className='flex flex-col items-center text-center gap-6 bg-transparent!'>
                <FadeInItem>
                    <div className="w-max mx-auto mb-4 px-4 py-1.5 bg-brand-primary-muted border border-brand-primary/20 rounded-full text-xs font-semibold text-brand-primary tracking-wider uppercase">
                        The Developer SDK
                    </div>
                </FadeInItem>
                <FadeInItem>
                    <Title level={1} className="font-display! text-text-primary! text-6xl! md:text-8xl! mb-6! font-bold! tracking-tight max-w-4xl leading-[1.05]">
                        Know instantly<br />
                        when <span className="text-brand-primary">your code breaks</span>
                    </Title>
                </FadeInItem>

                <FadeInItem>
                    <p className="text-text-secondary text-lg md:text-xl max-w-2xl leading-relaxed mb-10 block">
                        LogDeck provides real-time error monitoring and instant Telegram alerts for your Node.js applications. Debug faster and sleep better.
                    </p>
                </FadeInItem>
                <FadeInItem>
                    <div className="flex flex-col sm:flex-row gap-4 mb-20">
                        <Button size="lg">
                            Start Free Trial →
                        </Button>
                        <Button size="lg" variant="outline">
                            View Demo
                        </Button>
                    </div>
                </FadeInItem>
            </FadeInStagger>

            <DemoCode />
        </section>
    )
}

export default Hero;
