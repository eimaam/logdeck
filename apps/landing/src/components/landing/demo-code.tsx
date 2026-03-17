import React from 'react'
import { FadeIn } from '@logdeck/shared'

const DemoCode: React.FC = () => {
  return (
    <FadeIn delay={0.4} duration={0.8} yOffset={40} className="w-full max-w-4xl mx-auto">
      <div className="relative rounded-2xl border border-border-strong bg-bg-surface shadow-2xl overflow-hidden aspect-[16/10]">
        {/* heading */}
        <div className="absolute top-0 left-0 right-0 h-10 border-b border-border-strong bg-bg-elevated flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />

          <div className="ml-auto text-[10px] text-text-muted font-code tracking-widest lowercase">app.ts</div>
        </div>

        <div className="pt-14 p-8 font-code text-sm sm:text-base leading-relaxed overflow-x-auto">
          <p className="text-text-primary">
            <span className="text-state-warning">import</span> logdeck <span className="text-state-warning">from</span> <span className="text-state-success">"@logdeck/node"</span>;
          </p>
          <p className="text-text-muted">// Initialize with your API key</p>
          <p className="text-text-primary">
            logdeck.<span className="text-state-info">init</span>({'{'}
          </p>
          <p className="pl-4 text-text-primary">
            apiKey: <span className="text-state-success">"ld_live_ab34cd56..."</span>,
          </p>
          <p className="pl-4 text-text-primary">
            serviceName: <span className="text-state-success">"payment-service"</span>
          </p>
          <p className="text-text-primary">{'}'});</p>
          <br />
          <p className="text-text-muted">// automatically catch uncaught exceptions</p>
          <p className="text-text-primary">
            app.<span className="text-state-info">post</span>(
            <span className="text-state-success">"/checkout"</span>,{' '}
            <span className="text-state-warning">async</span> (req: Request, res: Response) ={'>'} {'{'}
          </p>
          <p className="pl-4 text-text-primary">
            <span className="text-state-warning">try</span> {'{'}
          </p>
          <p className="pl-8 text-text-primary">await processPayment(req.body);</p>
          <p className="pl-4 text-text-primary">
            {'}'} <span className="text-state-warning">catch</span> (error) {'{'}
          </p>
          <p className="pl-8 text-text-primary">
            logdeck.<span className="text-state-error">error</span>(
            <span className="text-state-success">"Payment failed"</span>, {'{'} error, userId: req.user.id {'}'}
            );
          </p>
          <p className="pl-4 text-text-primary">{'}'}</p>
          <p className="text-text-primary">{'}'});</p>
        </div>
      </div>
    </FadeIn>
  )
}

export default DemoCode