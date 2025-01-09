import { SelectionStore, getEmptyBoxes, getInitialBoxes } from './selection.store';
import { TestBed } from '@angular/core/testing';
import { defaultOption } from '../constants';
import { localStorageKey } from '../constants';
import { IBox } from '../types';

describe('SelectionStore', () => {
  beforeEach(() => {
    spyOn(window.localStorage, 'getItem').and.callFake((key: string) => {
      if (key === localStorageKey) {
        return null;
      }
      return null;
    });
  });

  it('default boxes quantity should be 10', () => {
    const store = TestBed.inject(SelectionStore);
    expect(store.boxes().length).toBe(10);
  });

  it('should set activeBox and activeBoxId', () => {
    const store = TestBed.inject(SelectionStore);
    store.selectBox(1);
    expect(store.activeBoxId()).toBe(1);
    expect(store.activeBox()).toBeTruthy;
    expect(store.activeBox()?.id).toBe(1);
  })

  it('should set option on selectOption', () => {
    const store = TestBed.inject(SelectionStore);
    store.selectBox(1);
    store.selectOption({...defaultOption, value: 1});
    store.selectBox(2);
    store.selectOption({...defaultOption, value: 2});
    expect(store.totalValue()).toBe(3);
  })

  it('should clear boxes correctly', () => {
    const store = TestBed.inject(SelectionStore);
    store.clearBoxes();
    store.boxes().forEach(box => {
      expect(box.option).toBeNull();
    })
    expect(store.activeBox()?.option).not.toBeTruthy();
  })

  it('should define initial boxes correctly', () => {
    const boxes = getInitialBoxes();
    boxes.forEach(box => {
      expect(box.option).toBeNull();
    })
    expect(boxes.length).toBe(10);
  })

  it('should define empty boxes correctly', () => {
    const boxes = getEmptyBoxes();
    boxes.forEach(box => {
      expect(box.option).toBeNull();
    })
    expect(boxes.length).toBe(10);
  })

  it('should return empty boxes when localStorage is empty', () => {
    const result = getInitialBoxes();
    expect(result).toEqual(getEmptyBoxes());
    expect(window.localStorage.getItem).toHaveBeenCalledWith(localStorageKey);
  });

  it('should return parsed boxes from localStorage', () => {
    const mockBoxes: IBox[] = [
      { id: 1, option: null },
      { id: 2, option: { id: 1, label: 'Option 1', value: 1 } },
    ];
    const mockData = JSON.stringify({ boxes: mockBoxes });

    (window.localStorage.getItem as jasmine.Spy).and.returnValue(mockData);

    const result = getInitialBoxes();
    expect(result).toEqual(mockBoxes);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(localStorageKey);
  });

  it('should handle invalid JSON in localStorage gracefully', () => {
    (window.localStorage.getItem as jasmine.Spy).and.returnValue('invalid JSON');

    expect(() => getInitialBoxes()).toThrowError(SyntaxError);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(localStorageKey);
  });
});