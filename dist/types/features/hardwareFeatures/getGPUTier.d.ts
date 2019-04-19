export interface IGetGPUTier {
    mobileBenchmarkPercentages?: number[];
    desktopBenchmarkPercentages?: number[];
    forceRendererString?: boolean;
    forceMobile?: boolean;
}
export declare const getGPUTier: (options?: IGetGPUTier) => {
    tier: string;
    type: string | undefined;
} | {
    tier: undefined;
    type: undefined;
};
