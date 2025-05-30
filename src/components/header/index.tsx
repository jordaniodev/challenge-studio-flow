import { cn } from '../../utils/cn';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn(
      "flex items-center justify-between w-full px-6 py-4 border-b border-[var(--color-border)]",
      className
    )}>
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-[var(--color-foreground)]">
          StudioFlow
        </h1>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]">
          Production: The Last of Us
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--color-muted-foreground)]">
          John Doe
        </span>
        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary-foreground)] text-sm font-medium">
          JD
        </div>
      </div>
    </header>
  );
}
