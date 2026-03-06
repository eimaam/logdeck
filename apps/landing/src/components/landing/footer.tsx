import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="relative w-full overflow-hidden bg-bg-base pt-32 pb-12 mt-20">
            {/* large bg text */}
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.03] translate-y-12">
                <span className="text-[18vw] font-bold leading-none tracking-tighter">
                    LOGDECK
                </span>
            </div>

            <div className="relative font-display max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-24">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <span className="text-text-disabled font-medium uppercase tracking-[0.2em] text-[10px]">Product</span>
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <Link to="#features" className="text-text-secondary hover:text-brand-primary transition-colors text-xs font-medium tracking-widest uppercase">Features</Link>
                            <Link to="#pricing" className="text-text-secondary hover:text-brand-primary transition-colors text-xs font-medium tracking-widest uppercase">Pricing</Link>
                            <Link to="/changelog" className="text-text-secondary hover:text-brand-primary transition-colors text-xs font-medium tracking-widest uppercase">Changelog</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <span className="text-text-disabled font-medium uppercase tracking-[0.2em] text-[10px]">Resources</span>
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <Link to="/docs" className="text-text-secondary hover:text-brand-primary transition-colors text-xs font-medium tracking-widest uppercase">Documentation</Link>
                            <Link to="/api" className="text-text-secondary hover:text-brand-primary transition-colors text-xs font-medium tracking-widest uppercase">API Reference</Link>
                            <Link to="/guides" className="text-text-secondary hover:text-brand-primary transition-colors text-xs font-medium tracking-widest uppercase">Guides</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-4 col-span-2 md:col-span-1">
                        <span className="text-text-disabled font-medium uppercase tracking-[0.2em] text-[10px]">Connect</span>
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <Link to="https://twitter.com/logdeck" className="text-text-secondary hover:text-brand-primary transition-colors text-xs font-medium tracking-widest uppercase">Twitter</Link>
                            {/* <Link to="https://github.com/logdeck" className="text-text-secondary hover:text-brand-primary transition-colors text-xs font-medium tracking-widest uppercase">GitHub</Link> */}
                            <Link to="/support" className="text-text-secondary hover:text-brand-primary transition-colors text-xs font-medium tracking-widest uppercase">Support</Link>
                        </div>
                    </div>
                </div>

                {/* Central Heading */}
                <div className="font-display flex flex-col items-center text-center gap-2 mb-24">
                    <h2 className="text-brand-primary text-4xl md:text-6xl font-bold tracking-tight mb-2">
                        RELIABLE.
                    </h2>
                    <h2 className="text-brand-primary text-4xl md:text-6xl font-bold tracking-tight">
                        OBSERVABLE.
                    </h2>
                </div>

                {/* Separator Line with Text */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-[1px] flex-1 bg-border-muted"></div>
                    <span className="text-[10px] text-text-disabled uppercase tracking-[0.3em] font-medium whitespace-nowrap">
                        Logging Global Utility
                    </span>
                    <div className="h-[1px] flex-1 bg-border-muted"></div>
                </div>

                <div className="flex justify-center">
                    <span className="text-[10px] text-text-disabled uppercase tracking-widest font-medium">
                        &copy; {new Date().getFullYear()} LOGDECK ECOSYSTEM
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;