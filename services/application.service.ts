import { addApplication } from "@/lib/application-storage";

import { addApplicationToCloud } from "@/services/application-cloud";

import { auth } from "@/lib/firebase";

import { Application } from "@/types/application";

export const createApplication = async (app: Application) => {
  addApplication(app);

  const user = auth.currentUser;

  if (user) {
    const { circularFile, ...cloudData } = app;

    await addApplicationToCloud(user.uid, cloudData);
  }
};
