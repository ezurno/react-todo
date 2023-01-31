import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minute = get(minuteState);
    return minute / 60;
  },

  /**
   *
   *  set은 State 값을 수정해주기 위해 사용
   * @param newValue 값을 수정한 값을 arg로 지정해 주어야 함 default type이 any 이므로 Number로 수정
   */
  set: ({ set }, newValue) => {
    const minute = Number(newValue) * 60;
    set(minuteState, minute);
  },
});
