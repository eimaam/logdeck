import { Typography } from "antd";
import { Terminal, Bell } from "lucide-react";
import { FadeIn } from "../ui/FadeIn";

const { Title } = Typography;

const Workflow = () => {
  return (
    <section id="workflow" className="w-full px-4 md:px-6 py-32 bg-bg-surface border-y border-border-muted">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="font-display text-brand-primary font-semibold tracking-widest uppercase text-xs">Workflow</span>
              <Title level={2} className="font-display! text-4xl! md:text-5xl! font-bold! text-text-primary! tracking-tight leading-tight">
                Set up in minutes,<br />not days.
              </Title>
              <p className="text-text-secondary text-lg max-w-md">
                We're obsessed over the developer experience so you can get back to building features.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-primary flex items-center justify-center text-black  font-bold text-sm">1</div>
                <div className="space-y-2">
                  <h4 className="text-text-primary font-bold text-lg">Install the SDK</h4>
                  <p className="text-brand-primary font-code text-sm bg-bg-surface p-2 rounded-md border border-border-muted">npm install @logdeck/node</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-primary flex items-center justify-center text-black font-bold text-sm">2</div>
                <div className="space-y-2">
                  <h4 className="text-text-primary font-bold text-lg">Initialize LogDeck</h4>
                  <p className="text-text-secondary">Add the initialization code to your entry point with your API key.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-primary flex items-center justify-center text-black font-bold text-sm">3</div>
                <div className="space-y-2">
                  <h4 className="text-text-primary font-bold text-lg">Receive Alerts</h4>
                  <p className="text-text-secondary">Connect your Telegram account and start receiving real-time notifications.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative border border-border-strong bg-bg-base shadow-2xl p-8 aspect-square flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-xs space-y-4">
              <div className="bg-bg-elevated p-4 rounded-xl border border-border-muted flex items-center gap-4 animate-bounce">
                <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-text-on-primary">
                  <Bell size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-muted font-bold uppercase">Critical Alert</div>
                  <div className="text-text-primary font-medium">Payment Error: 500</div>
                </div>
              </div>
              <div className="bg-bg-elevated/50 p-4 rounded-xl border border-border-muted/50 flex items-center gap-4 blur-[1px]">
                <div className="w-10 h-10 rounded-full bg-text-muted flex items-center justify-center text-text-primary">
                  <Terminal size={20} />
                </div>
                <div>
                  <div className="text-xs text-text-disabled font-bold uppercase">Log Received</div>
                  <div className="text-text-muted font-medium">User auth successful</div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default Workflow;
