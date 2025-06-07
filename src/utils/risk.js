const crypto = require('crypto');

function generate_risk_data(user_agent = null) {
    const random_choice = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const get_random_int = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const generate_random_hex = (length) => {
        let result = '';
        const characters = '0123456789abcdef';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const generate_random_alphanumeric = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const ua_input = user_agent || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36";

    const md5sum = crypto.createHash('md5');
    md5sum.update(ua_input);
    const user_agent_md5 = md5sum.digest('hex');

    const screen_resolutions = [
        [1920, 1080, 1920, 1040],
        [2560, 1440, 2560, 1400],
        [1366, 768, 1366, 728],
        [1440, 900, 1440, 860],
        [1680, 1050, 1680, 1010],
        [2560, 1600, 2560, 1560],
        [3840, 2160, 3840, 2120],
        [1600, 900, 1600, 860]
    ];

    const [screen_width, screen_height, avail_width, avail_height] = random_choice(screen_resolutions);

    const timezone_options = [
        [-300, "America/New_York"],
        [-360, "America/Chicago"],
        [-420, "America/Denver"],
        [-480, "America/Los_Angeles"],
        [-540, "America/Anchorage"],
        [-420, "America/Phoenix"],
        [-600, "America/Honolulu"],
        [-360, "America/Guatemala"],
        [-300, "America/Toronto"],
        [-240, "America/Puerto_Rico"],
    ];

    const [tz_offset, tz_name] = random_choice(timezone_options);

    const webgl_options = [
        "Google Inc. (Intel)~ANGLE (Intel, Intel(R) HD Graphics 520 Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (Intel)~ANGLE (Intel, Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (Intel)~ANGLE (Intel, Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (Intel)~ANGLE (Intel, Intel(R) Iris Xe Graphics Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (Intel)~ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (Intel)~ANGLE (Intel, Intel(R) HD Graphics 4600 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (Intel)~ANGLE (Intel, Intel(R) Iris Plus Graphics 655 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (Intel)~ANGLE (Intel, Intel(R) UHD Graphics 770 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (Intel)~ANGLE (Intel, Intel(R) HD Graphics P630 Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (Intel)~ANGLE (Intel, Intel(R) HD Graphics 530 Direct3D9Ex vs_3_0 ps_3_0)", // Example with D3D9

        "Google Inc. (NVIDIA)~ANGLE (NVIDIA, NVIDIA GeForce GTX 1050 Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (NVIDIA)~ANGLE (NVIDIA, NVIDIA GeForce GTX 1060 6GB Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (NVIDIA)~ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (NVIDIA)~ANGLE (NVIDIA, NVIDIA GeForce RTX 2060 Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (NVIDIA)~ANGLE (NVIDIA, NVIDIA GeForce RTX 2070 SUPER Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (NVIDIA)~ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (NVIDIA)~ANGLE (NVIDIA, NVIDIA GeForce RTX 3070 Ti Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (NVIDIA)~ANGLE (NVIDIA, NVIDIA GeForce GTX 970 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (NVIDIA)~ANGLE (NVIDIA, NVIDIA GeForce RTX 3080 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (NVIDIA)~ANGLE (NVIDIA, NVIDIA GeForce RTX 4070 Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (NVIDIA)~ANGLE (NVIDIA, NVIDIA GeForce RTX 4090 Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (NVIDIA)~ANGLE (NVIDIA Corporation, GeForce GTX 1650/PCIe/SSE2, OpenGL 4.6.0 NVIDIA 472.12)", // Example with OpenGL

        "Google Inc. (AMD)~ANGLE (AMD, AMD Radeon RX 570 Series Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (AMD)~ANGLE (AMD, AMD Radeon RX 580 Series Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (AMD)~ANGLE (AMD, AMD Radeon RX 5700 XT Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (AMD)~ANGLE (AMD, AMD Radeon RX 6700 XT Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (AMD)~ANGLE (AMD, AMD Radeon(TM) Graphics Direct3D11 vs_5_0 ps_5_0)", // Common for integrated APUs
        "Google Inc. (AMD)~ANGLE (AMD, AMD Radeon RX Vega 56 Series Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (AMD)~ANGLE (AMD, AMD Radeon VII Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (AMD)~ANGLE (AMD, AMD Radeon RX 6800M Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (AMD)~ANGLE (AMD, AMD Radeon RX 6600 Direct3D11 vs_5_0 ps_5_0)",
        "Google Inc. (AMD)~ANGLE (AMD, AMD Radeon RX 7900 XTX Direct3D11 vs_5_0 ps_5_0, D3D11)",
        "Google Inc. (AMD)~ANGLE (Advanced Micro Devices, Inc., Radeon RX 5600 XT, OpenGL 4.6.0 Compatibility Profile Context 21.30.0)" // Example with OpenGL
    ];

    const persistent_cookie = ["_rp_uid=" + [
        generate_random_hex(8),
        generate_random_hex(4),
        generate_random_hex(4),
        generate_random_hex(4),
        generate_random_hex(12)
    ].join("-")];

    const client_data_obj = {
        "version": "1.0.0",
        "deviceFingerprint": generate_random_alphanumeric(128) + ":40",
        "persistentCookie": persistent_cookie,
        "components": {
            "userAgent": user_agent_md5,
            "webdriver": 0,
            "language": "en-US",
            "colorDepth": random_choice([24, 32]),
            "deviceMemory": random_choice([0.5, 1, 2, 4, 8, 16]),
            "pixelRatio": random_choice([1, 1.25, 1.5, 2]),
            "hardwareConcurrency": random_choice([4, 6, 7, 8, 12, 16]),
            "screenWidth": screen_width,
            "screenHeight": screen_height,
            "availableScreenWidth": avail_width,
            "availableScreenHeight": avail_height,
            "timezoneOffset": tz_offset,
            "timezone": tz_name,
            "sessionStorage": 1,
            "localStorage": 1,
            "indexedDb": 1,
            "addBehavior": 0,
            "openDatabase": 0,
            "platform": "Win32",
            "plugins": generate_random_hex(32),
            "canvas": generate_random_hex(32),
            "webgl": generate_random_hex(32),
            "webglVendorAndRenderer": random_choice(webgl_options),
            "adBlock": random_choice([0, 1]),
            "hasLiedLanguages": 0,
            "hasLiedResolution": 0,
            "hasLiedOs": random_choice([0, 1]),
            "hasLiedBrowser": 0,
            "fonts": generate_random_hex(32),
            "audio": generate_random_hex(32),
            "enumerateDevices": generate_random_hex(32),
            "visitedPages": [],
            "batteryInfo": {
                "batteryLevel": random_choice([0.25, 0.50, 0.75, 0.90, 1.00]) * 100,
                "batteryCharging": random_choice([true, false])
            },
            "botDetectors": {
                "webDriver": false,
                "cookieEnabled": true,
                "headlessBrowser": false,
                "noLanguages": false,
                "inconsistentEval": false,
                "inconsistentPermissions": false,
                "domManipulation": false,
                "appVersionSuspicious": false,
                "functionBindSuspicious": random_choice([true, false]),
                "botInUserAgent": false,
                "windowSizeSuspicious": false,
                "botInWindowExternal": false,
                "webGL": false
            }
        }
    };

    const risk_data_payload = { // Renamed to avoid confusion
        "riskData": {
            "clientData": btoa(JSON.stringify(client_data_obj)),
        }
    };

    // Return both the risk_data_payload and the raw deviceFingerprint
    return {
        riskDataForPayload: risk_data_payload,
        deviceFingerprint: client_data_obj.deviceFingerprint 
    };
}

if (typeof window === 'undefined') {
    if (typeof btoa === 'undefined') {
        global.btoa = str => Buffer.from(str).toString('base64');
    }
    // const result = generate_risk_data(); // You can remove or comment out these lines
    // console.log(JSON.stringify(result, null, 2)); // if they are only for standalone testing
} else {
    // Code for browser environment, if any
}

module.exports = { generate_risk_data };