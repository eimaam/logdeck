// import logo from "../../assets/images/logo.png";

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  withTitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 'medium', withTitle }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-8 h-8 md:w-10 md:h-10',
    large: 'w-10 h-10 md:w-12 md:h-12',
    xlarge: 'w-16 h-16',
    xxlarge: 'w-20 h-20',
  };
  className = className ? `${sizeClasses[size]} ${className}` : sizeClasses[size];
  return (
    <div className="flex items-center gap-2">
      <img src={""} alt="LogDeck logo" className={`${className}`} />
      {withTitle && <h3 className="font-bold text-xl text-text-primary tracking-tight">LogDeck</h3>}
    </div>
  );
};
