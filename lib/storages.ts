import { Strings } from "./strings";

export const Storages = {
  /**
   * Get an item from the browser storage (localStorage or sessionStorage)
   * @param key key of the item to get
   * @param options
   * @returns the parsed item if found and can be parsed to JSON or null otherwise
   * @throws an error if using this method where the browser context is not available
   */
  getItem(key: string, options: { type: "session" | "local" }): unknown | null {
    if (typeof window === "undefined") {
      throw new Error("The browser storages are not available in this context");
    }

    const storage = options.type === "session" ? sessionStorage : localStorage;
    const item: string | null = storage.getItem(key);

    try {
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(`Can't parse value for item with key ${key}`, e);
      return null;
    }
  },
  /**
   * Set an item from the browser storage (localStorage or sessionStorage)
   * @param key key of the item to set
   * @param options
   * @throws an error if using this method where the browser context is not available
   */
  setItem(key: string, value: unknown, options: { type: "session" | "local" }): void {
    if (typeof window === "undefined") {
      throw new Error("The browser storages are not available in this context");
    }

    if (Strings.isEmpty(key)) {
      throw new Error("The key should not be empty when setting an item into a storage");
    }

    const storage = options.type === "session" ? sessionStorage : localStorage;
    storage.setItem(key, JSON.stringify(value));
  },
  /**
   * Remove an item from the browser storage (localStorage or sessionStorage)
   * @param key key of the item to remove
   * @param options
   * @throws an error if using this method where the browser context is not available
   */
  removeItem(key: string, options: { type: "session" | "local" }): void {
    if (typeof window === "undefined") {
      throw new Error("The browser storages are not available in this context");
    }

    const storage = options.type === "session" ? sessionStorage : localStorage;
    storage.removeItem(key);
  },
};
