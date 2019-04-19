"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Data
var GPUBenchmark_1 = require("../../__generated__/GPUBenchmark");
// Features
var getBrowserType_1 = require("../browserFeatures/getBrowserType");
// @ts-check
var isWebGLSupported = function () {
    var attributes = {
        alpha: false,
        antialias: false,
        depth: false,
        failIfMajorPerformanceCaveat: true,
        stencil: false,
    };
    // Keep reference to the canvas and context in order to clean up
    // after the necessary information has been extracted
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes);
    if (!gl || !(gl instanceof WebGLRenderingContext)) {
        return false;
    }
    return gl;
};
var getWebGLUnmaskedRenderer = function (gl) {
    if (gl) {
        var glExtensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
        var renderer = glExtensionDebugRendererInfo &&
            gl.getParameter(glExtensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL);
        return renderer;
    }
    return false;
};
// Get benchmark entry's by percentage of the total benchmark entries
var getBenchmarkByPercentage = function (benchmark, percentages) {
    var chunkOffset = 0;
    var benchmarkTiers = percentages.map(function (percentage) {
        var chunkSize = Math.round((benchmark.length / 100) * percentage);
        var chunk = benchmark.slice(chunkOffset, chunkOffset + chunkSize);
        chunkOffset += chunkSize;
        return chunk;
    });
    return benchmarkTiers;
};
var cleanEntryString = function (entryString) {
    return entryString
        .toLowerCase() // Lowercase all for easier matching
        .split('- ')[1] // Remove prelude score (`3 - `)
        .split(' /')[0];
}; // Reduce 'apple a9x / powervr series 7xt' to 'apple a9x'
var getEntryVersionNumber = function (entryString) { return entryString.replace(/[\D]/g, ''); }; // Grab and concat all digits in the string
var cleanRendererString = function (rendererString) {
    var cleanedRendererString = rendererString.toLowerCase();
    // Strip off ANGLE and Direct3D version
    if (cleanedRendererString.includes('angle (') && cleanedRendererString.includes('direct3d')) {
        cleanedRendererString = cleanedRendererString.replace('angle (', '').split(' direct3d')[0];
    }
    // Strip off the GB amount (1060 6gb was being concatenated to 10606 and because of it using the fallback)
    if (cleanedRendererString.includes('nvidia') && cleanedRendererString.includes('gb')) {
        cleanedRendererString = cleanedRendererString.split(/\dgb/)[0];
    }
    return cleanedRendererString;
};
exports.getGPUTier = function (options) {
    if (options === void 0) { options = {}; }
    var mobileBenchmarkPercentages = options.mobileBenchmarkPercentages || [
        0,
        50,
        30,
        20,
    ];
    var desktopBenchmarkPercentages = options.desktopBenchmarkPercentages || [
        0,
        50,
        30,
        20,
    ];
    var forceRendererString = options.forceRendererString || false;
    var forceMobile = options.forceMobile || false;
    var renderer;
    var tier;
    var type;
    var gl = isWebGLSupported();
    // WebGL support is missing
    if (!gl) {
        if (getBrowserType_1.isMobile || getBrowserType_1.isTablet || forceMobile) {
            return {
                tier: 'GPU_MOBILE_TIER_0',
                type: 'WEBGL_UNSUPPORTED',
            };
        }
        return {
            tier: 'GPU_DESKTOP_TIER_0',
            type: 'WEBGL_UNSUPPORTED',
        };
    }
    if (forceRendererString === false) {
        renderer = getWebGLUnmaskedRenderer(gl);
    }
    else {
        renderer = forceRendererString;
    }
    renderer = cleanRendererString(renderer);
    var rendererVersionNumber = renderer.replace(/[\D]/g, '');
    // GPU BLACKLIST
    // https://wiki.mozilla.org/Blocklisting/Blocked_Graphics_Drivers
    // https://www.khronos.org/webgl/wiki/BlacklistsAndWhitelists
    // https://chromium.googlesource.com/chromium/src/+/master/gpu/config/software_rendering_list.json
    // https://chromium.googlesource.com/chromium/src/+/master/gpu/config/gpu_driver_bug_list.json
    var isGPUBlacklisted = /(radeon hd 6970m|radeon hd 6770m|radeon hd 6490m|radeon hd 6630m|radeon hd 6750m|radeon hd 5750|radeon hd 5670|radeon hd 4850|radeon hd 4870|radeon hd 4670|geforce 9400m|geforce 320m|geforce 330m|geforce gt 130|geforce gt 120|geforce gtx 285|geforce 8600|geforce 9600m|geforce 9400m|geforce 8800 gs|geforce 8800 gt|quadro fx 5|quadro fx 4|radeon hd 2600|radeon hd 2400|radeon hd 2600|mali-4|mali-3|mali-2)/.test(renderer);
    if (isGPUBlacklisted) {
        if (getBrowserType_1.isMobile || getBrowserType_1.isTablet || forceMobile) {
            return {
                tier: 'GPU_MOBILE_TIER_0',
                type: 'BLACKLISTED',
            };
        }
        return {
            tier: 'GPU_DESKTOP_TIER_0',
            type: 'BLACKLISTED',
        };
    }
    if (getBrowserType_1.isMobile || getBrowserType_1.isTablet || forceMobile) {
        var mobileBenchmark = getBenchmarkByPercentage(GPUBenchmark_1.GPU_BENCHMARK_SCORE_MOBILE, mobileBenchmarkPercentages);
        var isRendererAdreno_1 = renderer.includes('adreno');
        var isRendererApple_1 = renderer.includes('apple');
        var isRendererMali_1 = renderer.includes('mali') && !renderer.includes('mali-t');
        var isRendererMaliT_1 = renderer.includes('mali-t');
        var isRendererNVIDIA_1 = renderer.includes('nvidia');
        var isRendererPowerVR_1 = renderer.includes('powervr');
        mobileBenchmark.forEach(function (benchmarkTier, index) {
            return benchmarkTier.forEach(function (benchmarkEntry) {
                var entry = cleanEntryString(benchmarkEntry);
                var entryVersionNumber = getEntryVersionNumber(entry);
                if ((entry.includes('adreno') && isRendererAdreno_1) ||
                    (entry.includes('apple') && isRendererApple_1) ||
                    (entry.includes('mali') && !entry.includes('mali-t') && isRendererMali_1) ||
                    (entry.includes('mali-t') && isRendererMaliT_1) ||
                    (entry.includes('nvidia') && isRendererNVIDIA_1) ||
                    (entry.includes('powervr') && isRendererPowerVR_1)) {
                    if (entryVersionNumber.includes(rendererVersionNumber)) {
                        tier = "GPU_MOBILE_TIER_" + index;
                        type = "BENCHMARK - " + entry;
                    }
                    // Handle mobile edge cases
                }
            });
        });
        if (!tier) {
            tier = 'GPU_MOBILE_TIER_1';
            type = 'FALLBACK';
        }
        return {
            tier: tier,
            type: type,
        };
    }
    if (getBrowserType_1.isDesktop) {
        var desktopBenchmark = getBenchmarkByPercentage(GPUBenchmark_1.GPU_BENCHMARK_SCORE_DESKTOP, desktopBenchmarkPercentages);
        var isRendererIntel_1 = renderer.includes('intel');
        var isRendererAMD_1 = renderer.includes('amd');
        var isRendererNVIDIA_2 = renderer.includes('nvidia');
        desktopBenchmark.forEach(function (benchmarkTier, index) {
            return benchmarkTier.forEach(function (benchmarkEntry) {
                var entry = cleanEntryString(benchmarkEntry);
                var entryVersionNumber = getEntryVersionNumber(entry);
                if ((entry.includes('intel') && isRendererIntel_1) ||
                    (entry.includes('amd') && isRendererAMD_1) ||
                    (entry.includes('nvidia') && isRendererNVIDIA_2)) {
                    if (entryVersionNumber.includes(rendererVersionNumber)) {
                        tier = "GPU_DESKTOP_TIER_" + index;
                        type = "BENCHMARK - " + entry;
                    }
                    // Handle desktop edge cases
                }
            });
        });
        if (!tier) {
            tier = 'GPU_DESKTOP_TIER_1';
            type = 'FALLBACK';
        }
        return {
            tier: tier,
            type: type,
        };
    }
    return {
        tier: tier,
        type: type,
    };
};
//# sourceMappingURL=getGPUTier.js.map