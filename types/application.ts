export type ApplicationStatus =
  | "draft"
  | "applied"
  | "shortlisted"
  | "exam"
  | "result-published"
  | "completed"
  | "rejected"
  | "expired";

export interface ApplicationDocument {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

export type PaymentStatus = "pending" | "paid" | "not-required";

export type ApplicationType =
  | "job"
  | "admission"
  | "scholarship"
  | "government";

export interface Application {
  id: string;

  name: string;

  source: string;

  url?: string;

  paymentStatus: PaymentStatus;

  payAmount?: number;

  applicationType?: ApplicationType;

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

  daysLeft?: number;

  synced: boolean;

  createdAt: string;

  updatedAt: string;
}
