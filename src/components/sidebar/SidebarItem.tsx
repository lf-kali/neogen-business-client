import { Link, useLocation } from 'react-router-dom';
import type { SidebarItemConfig } from '../../config/sidebarConfig.tsx';

interface SidebarItemProps {
  item: SidebarItemConfig;
  isExpanded: boolean;
}

export function SidebarItem({ item, isExpanded }: SidebarItemProps) {
  const location = useLocation();
  
  const isActive = location.pathname.startsWith(item.path);

  return (
    <Link to={item.path}>
      <div
        className={`relative flex items-center gap-4 rounded-lg px-3 py-3 transition-all duration-200 ${
          isActive
            ? 'bg-white/15 text-white'
            : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`}
        title={item.label}
      >
        <div className="shrink-0">{item.icon}</div>
        
        <span
          className={`overflow-hidden text-sm font-medium oxanium-400 whitespace-nowrap transition-all duration-300 ${
            isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'
          }`}
        >
          {item.label}
        </span>
      </div>
    </Link>
  );
}
