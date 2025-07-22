import { Course } from "@/types/data";
import { GroupData, TimetableData } from "@/types/model";

const DB_NAME = "TimetableDB";
const DB_VERSION = 1;
const GROUP_STORE = "groups";
const TIMETABLE_STORE = "timetables";
const MY_COURSE_COMPETITION_STORE = "myCourseCompetition";


let db: IDBDatabase | null = null;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) return resolve(db);

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      if (!database.objectStoreNames.contains(GROUP_STORE)) {
        database.createObjectStore(GROUP_STORE, { keyPath: "id" });
      }
      if (!database.objectStoreNames.contains(TIMETABLE_STORE)) {
        database.createObjectStore(TIMETABLE_STORE, { keyPath: "id" });
      }
      if (!database.objectStoreNames.contains(MY_COURSE_COMPETITION_STORE)) {
        database.createObjectStore(MY_COURSE_COMPETITION_STORE, { keyPath: "id" });
      }
    };
  });
}

export async function addGroup(group: GroupData): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(GROUP_STORE, "readwrite");
    const store = tx.objectStore(GROUP_STORE);
    const request = store.add(group);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getGroup(id: string): Promise<GroupData | undefined> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(GROUP_STORE, "readonly");
    const store = tx.objectStore(GROUP_STORE);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllGroups(): Promise<GroupData[]> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(GROUP_STORE, "readonly");
    const store = tx.objectStore(GROUP_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function updateGroup(group: GroupData): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(GROUP_STORE, "readwrite");
    const store = tx.objectStore(GROUP_STORE);
    const request = store.put(group);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteGroup(id: string): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(GROUP_STORE, "readwrite");
    const store = tx.objectStore(GROUP_STORE);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}


export async function addTimetable(timetable: TimetableData): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(TIMETABLE_STORE, "readwrite");
    const store = tx.objectStore(TIMETABLE_STORE);
    const request = store.add(timetable);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getTimetable(id: string): Promise<TimetableData | undefined> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(TIMETABLE_STORE, "readonly");
    const store = tx.objectStore(TIMETABLE_STORE);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllTimetables(): Promise<TimetableData[]> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(TIMETABLE_STORE, "readonly");
    const store = tx.objectStore(TIMETABLE_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function updateTimetable(timetable: TimetableData): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(TIMETABLE_STORE, "readwrite");
    const store = tx.objectStore(TIMETABLE_STORE);
    const request = store.put(timetable);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteTimetable(id: string): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(TIMETABLE_STORE, "readwrite");
    const store = tx.objectStore(TIMETABLE_STORE);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function getAllMyCourses(): Promise<Course[]> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(MY_COURSE_COMPETITION_STORE, "readonly");
    const store = tx.objectStore(MY_COURSE_COMPETITION_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveMyCourse(course: Course): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(MY_COURSE_COMPETITION_STORE, "readwrite");
    const store = tx.objectStore(MY_COURSE_COMPETITION_STORE);
    const request = store.put(course);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function deleteMyCourse(id: string): Promise<void> {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(MY_COURSE_COMPETITION_STORE, "readwrite");
    const store = tx.objectStore(MY_COURSE_COMPETITION_STORE);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}