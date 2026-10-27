import React from "react";
import { HugeiconsIcon } from "@hugeicons/react-native";
import type { IconSvgElement } from "@hugeicons/react-native";
import {
  Home01Icon,
  Search01Icon,
  Add01Icon,
  Message01Icon,
  UserIcon,
  Notification01Icon,
  Settings01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  Image01Icon,
  Camera01Icon,
  Location01Icon,
  Calendar01Icon,
  Bookmark01Icon,
  HeartAddIcon,
  Share01Icon,
  MoreHorizontalIcon,
  SearchAddIcon,
  Logout01Icon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";

export const appIcons = {
  home: Home01Icon,
  search: Search01Icon,
  add: Add01Icon,
  messages: Message01Icon,
  user: UserIcon,
  notifications: Notification01Icon,
  settings: Settings01Icon,
  back: ArrowLeft01Icon,
  next: ArrowRight01Icon,
  close: Cancel01Icon,
  check: CheckmarkCircle01Icon,
  image: Image01Icon,
  camera: Camera01Icon,
  location: Location01Icon,
  calendar: Calendar01Icon,
  bookmark: Bookmark01Icon,
  like: HeartAddIcon,
  share: Share01Icon,
  more: MoreHorizontalIcon,
  searchAdd: SearchAddIcon,
  logout: Logout01Icon,
  menu: Menu01Icon,
} satisfies Record<string, IconSvgElement>;

export type AppIconName = keyof typeof appIcons;

interface AppIconProps {
  name: AppIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function AppIcon({ name, size = 24, color = "#222222" }: AppIconProps) {
  return <HugeiconsIcon icon={appIcons[name]} size={size} color={color} />;
}
