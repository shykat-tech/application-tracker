export type ApplicationStatus =
  | "draft"
  | "applied"
  | "admit-card"
  | "exam"
  | "result"
  | "completed"
  | "expired";

export interface ApplicationDocument {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

export interface Application {
  id: string;

  name: string;

  source: string;

  url?: string;

  paymentStatus: boolean;

  appliedDate?: string;

  lastApplicationDate?: string;

  status: ApplicationStatus;

  remarks?: string;

  circularUrl?: string;

  circularFile?: {
    name: string;
    url: string;
  };

  documents: ApplicationDocument[];

  synced: boolean;

  createdAt: string;

  updatedAt: string;
}
