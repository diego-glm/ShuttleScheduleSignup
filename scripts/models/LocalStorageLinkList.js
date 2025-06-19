import Storage from "./Interface/StorageHandler.js";
import LinkLists from "./GroupList.js";

export default class LocalStorageLinkList extends Storage {
    /**@type {string} */
    #localStorageKey;
    /**@type {LinkLists} */
    collectionAddr;
    
    constructor(localStorageKey) {
        super();
        this.#localStorageKey = localStorageKey;
    }
    
    load() {
        try {
            const stored = localStorage.getItem(this.#localStorageKey);
            if (stored) {
                const linkListArray = JSON.parse(stored);
                this.collectionAddr.clear();
                for (const [key, value] of linkListArray) {
                    this.collectionAddr.set(key, value);
                }
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            this.collectionAddr.clear();
        }
    }
    
    save() {
        try {
            const linkListArray = Array.from(this.collectionAddr.entries());
            localStorage.setItem(this.#localStorageKey, JSON.stringify(linkListArray));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }
}
