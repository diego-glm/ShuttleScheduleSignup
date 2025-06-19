import Storage from "./Interface/StorageHandler.js";
import Registration from "./Registration.js";

export default class LocalStorage extends Storage {
    /**@type {string} */
    #localStorageKey;
    /**@type {Registration} */
    owner = null;
    
    constructor(localStorageKey) {
        super();
        this.#localStorageKey = localStorageKey;
    }
    
    setOwner(owner) {
        this.owner = owner;
    }
    
    save() {
        if (!this.owner) throw new Error("No owner set for LocalStorage.");
        const json = JSON.stringify(this.owner);
        localStorage.setItem(this.#localStorageKey, json)
    }
    
    
    load() {
        const raw = JSON.parse(localStorage.getItem(this.#localStorageKey));
        if (raw) {
            raw.forEach(entry => {
                this.owner.add(entry.room, entry.guest.name, entry.guest.phone);
            });
        }
    }
}