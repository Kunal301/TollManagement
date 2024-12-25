export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    tenantId?: string; // Make optional to align with both use cases
  }
  