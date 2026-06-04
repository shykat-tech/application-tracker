// src/lib/application-storage.ts

import { STORAGE_KEYS } from "./storage";
import { Application } from "@/types/application";

export const getApplications = (): Application[] => {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);

  return data ? JSON.parse(data) : [];
};

export const saveApplications = (apps: Application[]) => {
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
};

export const addApplication = (app: Application) => {
  const apps = getApplications();

  apps.unshift(app);

  saveApplications(apps);
};

export const updateApplication = (
  id: string,
  updates: Partial<Application>,
) => {
  const apps = getApplications();

  const updated = apps.map((app) =>
    app.id === id ? { ...app, ...updates } : app,
  );

  saveApplications(updated);
};

export const deleteApplication = (id: string) => {
  const apps = getApplications();

  const filtered = apps.filter((app) => app.id !== id);

  saveApplications(filtered);
};
