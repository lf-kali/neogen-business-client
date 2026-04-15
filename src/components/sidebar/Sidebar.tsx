import { useState } from 'react';
import { SidebarItem } from './SidebarItem';
import { sidebarItems } from '../../config/sidebarConfig.tsx';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`border-r border-white/10 bg-[#0b0f1f]/75 backdrop-blur transition-all duration-300 ${
        isExpanded ? 'w-60' : 'w-17'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >

      {/* Navigation Items */}
      <nav className="space-y-2 px-2 py-4">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.id} item={item} isExpanded={isExpanded} />
        ))}
      </nav>
    </aside>
  );
}
