import {
  doc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Application } from "@/types/application";

export const addApplicationToCloud = async (
  uid: string,
  appData: Application,
) => {
  const ref = doc(db, "users", uid, "applications", appData.id);

  await setDoc(ref, appData);
};

export const getCloudApplications = async (
  uid: string,
): Promise<Application[]> => {
  const colRef = collection(db, "users", uid, "applications");

  const snapshot = await getDocs(colRef);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Application[];
};

export const deleteCloudApplication = async (uid: string, id: string) => {
  await deleteDoc(doc(db, "users", uid, "applications", id));
};

export const updateCloudApplication = async (
  uid: string,
  id: string,
  updates: Partial<Application>,
) => {
  await updateDoc(doc(db, "users", uid, "applications", id), updates);
};
