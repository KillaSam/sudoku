import { createContext } from 'react';

export const ArrayContext = createContext({
  allArr: [],
  setAllArr: () => {},
  onChangeCell: () => () => {}
})