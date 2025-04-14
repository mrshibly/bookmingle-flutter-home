
export type BookStatus = 'available' | 'reserved' | 'shared';

export const getStatusColor = (status: BookStatus): string => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800';
    case 'reserved':
      return 'bg-yellow-100 text-yellow-800';
    case 'shared':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusLabel = (status: BookStatus): string => {
  switch (status) {
    case 'available':
      return 'Available';
    case 'reserved':
      return 'Reserved';
    case 'shared':
      return 'Shared';
    default:
      return 'Unknown';
  }
};
