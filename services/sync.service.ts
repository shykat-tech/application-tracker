import { getApplications } from "@/lib/application-storage";
import { STORAGE_KEYS } from "@/lib/storage";
import { addApplicationToCloud } from "@/services/application-cloud";

export const syncLocalToCloud = async (uid: string) => {
  const localApps = getApplications();

  for (const app of localApps) {
    const cloudApp = {
      ...app,
      synced: true,
    };
    await addApplicationToCloud(uid, cloudApp);
  }
  localStorage.setItem(
    STORAGE_KEYS.APPLICATIONS,
    JSON.stringify(localApps.map((app) => ({ ...app, synced: true }))),
  );
};
