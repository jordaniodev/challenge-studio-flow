import { useLocation } from 'react-router-dom';

import { HeaderScene } from '../HeaderScene';

export function Header() {
  const { pathname } = useLocation();
  return (
    <header className='sticky top-0 z-50 flex items-center justify-between w-full gap-8 px-6 py-4 border-b border-border bg-background'>
      <div className='flex items-center gap-12'>
        <h1 className='text-xl font-semibold text-foreground'>StudioFlow</h1>
      </div>

      {pathname.startsWith('/production') && <HeaderScene />}

      <div className='flex items-center gap-2'>
        <span className='text-sm text-muted-foreground'>John Doe</span>
        <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium'>
          JD
        </div>
      </div>
    </header>
  );
}
