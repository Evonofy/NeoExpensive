import create from 'zustand';

export type Storage = 'cookies' | 'localStorage';

export const defaultStorage: Storage = 'cookies';

type useStorageStoreProps = {
  storage: Storage;
  setStorage: (storage: Storage) => void;
};

export const useStorageStore = create<useStorageStoreProps>((set) => ({
  storage: defaultStorage,
  setStorage(storage) {
    set(() => ({
      storage,
    }));
  },
}));
