// utils/getThemeComponents.js
import {
    Dark,
    Light,
    DarkBtn,
    LightBtn,
    DarkOutlineBtn,
    LightOutlineBtn,
    DarkInput,
    LightInput,
} from '../Global-Theme/GlobalTheme.js'; // update this path based on your structure

export const getThemeComponents = (theme) => {
    const isDark = theme === 'Dark';

    return {
        base: isDark ? Dark : Light,
        btn: isDark ? DarkBtn : LightBtn,
        outlineBtn: isDark ? DarkOutlineBtn : LightOutlineBtn,
        input: isDark ? DarkInput : LightInput,
    };
};
