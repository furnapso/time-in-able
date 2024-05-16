import {Drivers, Storage} from "@ionic/storage";
import cordovaSQLiteDriver from "localforage-cordovasqlitedriver";

const storage = new Storage({
    driverOrder: [cordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
})
await storage.create()

export const useStorage = () => {
    return storage
}
