import {Drivers, Storage} from "@ionic/storage";
import cordovaSQLiteDriver from "localforage-cordovasqlitedriver";

const store = new Storage({
  driverOrder: [cordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
})

export const useStorage = () => {
  return store
}
