import type { ThemeConfig } from 'antd';
import { theme as Antdtheme } from 'antd';

const { darkAlgorithm } = Antdtheme;

export const theme: ThemeConfig = {
    token: {
        colorPrimary: '#3ECF8E',
        colorSuccess: '#3ECF8E', // Using brand color as 'success' for checked states/online
        colorError: '#FF5C5C',
        colorTextHeading: '#1A1A1A',
        colorText: '#FAFAFA',
        colorTextSecondary: '#CFCFCF',
        colorBgBase: '#121212',
        fontFamily: '"Syne Mono", monospace',
        borderRadius: 8,
    },
    // set default algortihm as dark
    algorithm: darkAlgorithm,
    components: {
        Button: {
            colorPrimary: '#3ECF8E',
            algorithm: true, // Enable automatic derivative colors
        },
        Input: {
            colorPrimary: '#3ECF8E',
        },
        Layout: {
            bodyBg: '#121212',
            siderBg: '#121212',
        },
    },
};
