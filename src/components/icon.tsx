import { HugeiconsIcon } from "@hugeicons/react-native";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Add01Icon,
  Backpack01Icon,
  Camera01Icon,
  Cancel01Icon,
  File01Icon,
  Home01Icon,
  Key01Icon,
  Location01Icon,
  LocateFixedIcon,
  Message01Icon,
  MoreVerticalIcon,
  Notification01Icon,
  Search01Icon,
  SlidersHorizontalIcon,
  SmartPhone01Icon,
  Tick02Icon,
  User02Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";

import { Brand as brand } from "@/constants/theme";

const icons = {
  home: Home01Icon,
  search: Search01Icon,
  add: Add01Icon,
  chat: Message01Icon,
  profile: User02Icon,
  bell: Notification01Icon,
  pin: Location01Icon,
  locate: LocateFixedIcon,
  filter: SlidersHorizontalIcon,
  close: Cancel01Icon,
  check: Tick02Icon,
  back: ArrowLeft01Icon,
  next: ArrowRight01Icon,
  more: MoreVerticalIcon,
  camera: Camera01Icon,
  wallet: Wallet01Icon,
  bag: Backpack01Icon,
  phone: SmartPhone01Icon,
  key: Key01Icon,
  document: File01Icon,
} as const;

export type IconName = keyof typeof icons;

// Icon for each item category in the filters sheet.
export const CATEGORY_ICON: Record<string, IconName> = {
  Wallets: "wallet",
  Bags: "bag",
  Phones: "phone",
  Keys: "key",
  Documents: "document",
};

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function Icon({
  name,
  size = 24,
  color = brand.ink,
  strokeWidth = 1.8,
}: Props) {
  return (
    <HugeiconsIcon
      icon={icons[name]}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
    />
  );
}

export default Icon;
