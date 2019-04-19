export declare const fullScreen: {
    requestFullscreen: (element: HTMLElement) => any;
    readonly exitFullscreen: any;
    addEventListener: (type: string, handler: () => void, options?: any) => void;
    removeEventListener: (type: string, handler: () => void, options?: any) => void;
    fullscreenSupported: boolean;
    fullscreenElement: any;
    onfullscreenchange: any;
    onfullscreenerror: any;
};
