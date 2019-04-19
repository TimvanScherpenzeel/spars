export declare const pointerLock: {
    requestPointerLock: (element: HTMLElement) => any;
    readonly exitPointerLock: any;
    addEventListener: (type: string, handler: () => void, options?: any) => void;
    removeEventListener: (type: string, handler: () => void, options?: any) => void;
    pointerlockEnabled: boolean;
    pointerLockElement: any;
    onpointerlockchange: any;
    onpointerlockerror: any;
};
