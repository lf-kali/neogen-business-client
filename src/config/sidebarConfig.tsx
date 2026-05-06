import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faMobileAlt,
  faTags,
  faBox,
  faClipboardList,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';

export interface SidebarItemConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

export const sidebarItems: SidebarItemConfig[] = [
  {
    id: 'customers',
    label: 'Clientes',
    path: '/customers',
    icon: <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />,
  },
  {
    id: 'devices',
    label: 'Dispositivos',
    path: '/devices',
    icon: <FontAwesomeIcon icon={faMobileAlt} className="h-6 w-6" />,
  },
  {
    id: 'productCategories',
    label: 'Categ. de produtos',
    path: '/product-categories',
    icon: <FontAwesomeIcon icon={faTags} className="h-6 w-6" />,
  },
  {
    id: 'products',
    label: 'Produtos',
    path: '/products',
    icon: <FontAwesomeIcon icon={faBox} className="h-6 w-6" />,
  },
  {
    id: 'serviceOrders',
    label: 'Ordens de Serviço',
    path: '/service-orders',
    icon: <FontAwesomeIcon icon={faClipboardList} className="h-6 w-6" />,
  },
  {
    id: 'serviceTypes',
    label: 'Serviços',
    path: '/service-types',
    icon: <FontAwesomeIcon icon={faWrench} className="h-6 w-6" />,
  },
];
