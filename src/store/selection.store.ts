import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';
import { IBox, IOption, ILSData } from '../types';
import { options, localStorageKey } from '../constants';

interface ISelectionState {
  activeBoxId: number | null;
  boxes: IBox[];
  options: readonly IOption[];
}

const initialState: ISelectionState = {
  activeBoxId: null,
  boxes: getInitialBoxes(),
  options: options,
};

export const SelectionStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ activeBoxId, boxes }) => ({
    activeBox: computed((): IBox | null => {
      const index = boxes().findIndex((el) => el.id === activeBoxId());
      let result: IBox | null = null;
      if (index !== -1) {
        result = boxes()[index];
      }
      return result;
    }),
    totalValue: computed((): number => {
      return +boxes()
        .reduce((acc, box) => acc + (box?.option?.value || 0), 0)
        .toFixed(2);
    }),
  })),
  withMethods((store) => ({
    selectBox(id: number): void {
      patchState(store, (state) => ({ activeBoxId: id }));
    },
    selectOption(option: IOption): void {
      const boxes = structuredClone(store.boxes());
      const idx = boxes.findIndex((el) => el.id === store.activeBoxId());
      if (idx !== -1) {
        boxes[idx].option = option;
      }
      let nextId = boxes[idx].id;
      if (idx + 1 < store.boxes().length) {
        nextId = store.boxes()[idx + 1].id;
      }
      patchState(store, (state) => ({
        boxes,
        activeBoxId: nextId,
      }));
      saveData(store.boxes());
    },
    clearBoxes(): void {
      const boxes = structuredClone(store.boxes());
      boxes.forEach((box) => {
        box.option = null;
      });
      patchState(store, (state) => ({
        boxes,
      }));
      localStorage.removeItem(localStorageKey);
    },
  }))
);

function getInitialBoxes(): IBox[] {
  const dataString = window.localStorage.getItem(localStorageKey);
  const boxes = dataString ? JSON.parse(dataString)?.boxes : getEmptyBoxes();
  return boxes;
}

function getEmptyBoxes(): IBox[] {
  return new Array(10).fill(null).map((_, index) => ({
    id: index,
    option: null,
  }));
}

function saveData(boxes: IBox[]): void {
  const data: ILSData = { boxes };
  localStorage.setItem(localStorageKey, JSON.stringify(data));
}
