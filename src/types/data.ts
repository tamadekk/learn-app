import { circleUser, moon } from '@/assets';
import { MenuItem } from './components';

export const menuItems: MenuItem[] = [
  {
    id: 'account',
    src: circleUser,
    label: 'My Account',
    action: () => console.log('Navigate to account'),
  },
  {
    id: 'night-mode',
    src: moon,
    label: 'Night mode',
    action: () => console.log('Toggle night mode'),
  },
];
