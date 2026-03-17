import { Link } from "react-router-dom"
import { Logo, Button } from "@logdeck/shared"
import { APP_URL } from "@logdeck/shared"

const Nav = () => {
  return (
    <nav className="w-full sticky top-0 md:px-6 flex items-center justify-between py-6 bg-bg-base/80 backdrop-blur-md z-50 border-b border-b-border-default">
      <Logo withTitle />
      <div className="flex items-center gap-4">
        <div className="border-r border-r-border-default px-8 hidden md:flex items-center gap-8 text-text-secondary font-medium">
          <a href="#features" className="hover:text-text-primary transition-colors">Features</a>
          <a href="#workflow" className="hover:text-text-primary transition-colors">Workflow</a>
          <a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-text-primary transition-colors">Docs</a>
        </div>
        <div className="flex items-center gap-4">
          <a href={APP_URL + "/auth"} className="font-bold text-text-secondary! hover:text-text-primary">Sign In</a>
          <Button onClick={() => window.location.href = APP_URL + "/auth"}>
            Start Free Trial
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Nav