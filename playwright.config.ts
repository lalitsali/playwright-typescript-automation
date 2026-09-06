
// import { defineConfig, devices } from '@playwright/test';

// const ENV = process.env.ENV || 'prod';

// const ENV_URL = {
//   dev: 'https://www.saucedemo.com/',
//   qa: 'https://www.saucedemo.com/',
//   stage: 'https://www.saucedemo.com/',
//   prod: 'https://www.saucedemo.com/',
// };

// export default defineConfig({
//   testDir: './tests',

//   /* Run tests in parallel */
//   fullyParallel: true,

//   /* Prevent accidental test.only in CI */
//   forbidOnly: !!process.env.CI,

//   /* Retry failed tests on CI */
//   retries: process.env.CI ? 2 : 0,

//   /* Use one worker on CI, multiple locally */
//   workers: process.env.CI ? 1 : undefined,

//   /* Test execution timeout */
//   timeout: 30 * 1000,

//   /* Assertion timeout */
//   expect: {
//     timeout: 5000,
//   },

//   /* Reports */
//   reporter: [
//     ['list'],
//     ['html', { outputFolder: 'playwright-report', open: 'never' }],
//   ],

//   /* Shared settings */
//   use: {
//     baseURL: ENV_URL[ENV as keyof typeof ENV_URL],

//     screenshot: 'only-on-failure',

//     video: 'retain-on-failure',

//     trace: 'retain-on-failure',

//     actionTimeout: 10 * 1000,

//     navigationTimeout: 30 * 1000,
//   },

//   /* Browser projects */
//   projects: [
//         {
//             name: "setup",
//             testMatch: /auth\.setup\.ts/,
//         },

//         {
//             name: "chromium",
//            use: {
//     baseURL: "https://www.saucedemo.com",

//     headless: true,

//     storageState: "playwright/.auth/user.json",

//     trace: "on-first-retry",
// },
//             dependencies: ["setup"],
//         },
//     ],
// });


import { defineConfig, devices } from '@playwright/test';

const ENV = process.env.ENV || 'prod';

const ENV_URL = {
    dev: 'https://www.saucedemo.com/',
    qa: 'https://www.saucedemo.com/',
    stage: 'https://www.saucedemo.com/',
    prod: 'https://www.saucedemo.com/',
};

export default defineConfig({

    testDir: './tests',
globalSetup: require.resolve('./global-setup'),
    // Run tests in parallel
    fullyParallel: true,

    // Prevent accidental test.only in CI
    forbidOnly: !!process.env.CI,

    // Retry failed tests on CI
    retries: process.env.CI ? 2 : 0,

    // Use one worker on CI, multiple locally
    workers: process.env.CI ? 1 : undefined,

    // Test execution timeout
    timeout: 30 * 1000,

    // Assertion timeout
    expect: {
        timeout: 5000,
    },

    // Reports
    reporter: [
        ['list'],
        ['html', {
            outputFolder: 'playwright-report',
            open: 'never',
        }],
    ],

    // Shared settings
    use: {
        baseURL: ENV_URL[ENV as keyof typeof ENV_URL],

        screenshot: 'on',
        video: 'on',
        trace: 'on',

        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,

      storageState: 'playwright/.auth/user.json',

    },

    // Browser projects
    projects: [

       

        // Actual tests
        {
            name: 'chromium',

            use: {
                ...devices['Desktop Chrome'],

               // storageState: 'playwright/.auth/user.json',
            },

           // dependencies: ['setup'],
        },

           // Login tests - NO authentication
        {
            name: 'login',
            testMatch: '**/login.spec.ts',
            use: {
                ...devices['Desktop Chrome'],
                storageState: undefined,
            },
        },
    ],
});