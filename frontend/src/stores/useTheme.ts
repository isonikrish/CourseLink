import {create} from 'zustand'
import { ThemeState } from '../utils/types';

const useTheme = create<ThemeState>((set) => ({
  isDarkMode: true,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode }))
  
}));

export default useTheme;
