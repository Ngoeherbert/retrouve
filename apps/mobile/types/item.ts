export type ItemStatus = 'lost' | 'found' | 'pending' | 'resolved';

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ItemStatus;
  location: string;
  date: string;
  image: string | null;
  ownerName: string;
  organizationId: string | null;
}
