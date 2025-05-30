
export function Header() {
  return (
    <header className=
      "sticky top-0 z-50 flex items-center justify-between w-full px-6 py-4 border-b border-border bg-background"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-foreground">
          StudioFlow
        </h1>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
          Production: The Last of Us
        </span> 
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          John Doe
        </span>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
          JD
        </div>
      </div>
    </header>
  );
}
