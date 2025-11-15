import type { Options } from '@wdio/types'
import { execSync } from 'child_process'
import { capabilities } from './src/config'
import { logger } from './src/utils/logger'

export const config: Options.Testrunner = {
    runner: 'local',
    specs: ['./src/tests/**/*.ts'],
    maxInstances: 1,
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    services: [
        ['appium', {
            command: 'appium',
            args: {
                relaxedSecurity: true
            },
            capabilities: capabilities[0]
        }]
    ],

    /**
     * Hook before starting the session: completely clean the emulator and Appium
     */
    onPrepare: function () {
        try {
            logger.log('💥 Cleaning emulator and Appium servers...')

            // Force stop all Appium services
            execSync('pkill -f appium || true')

            // Kill the emulator
            execSync('adb -s emulator-5554 emu kill || true')
            
            // Restart ADB server
            execSync('adb start-server')

            // Wait for the emulator to boot
            logger.log('⏳ Waiting for emulator to boot...')
            execSync('adb -s emulator-5554 wait-for-device')

            // Fully clear Appium packages
            const packages = [
                'io.appium.uiautomator2.server',
                'io.appium.uiautomator2.server.test',
                'io.appium.settings'
            ]
            for (const pkg of packages) {
                logger.log(`🧹 Clearing package: ${pkg}`)
                execSync(`adb -s emulator-5554 shell pm clear ${pkg} || true`)
                execSync(`adb -s emulator-5554 uninstall ${pkg} || true`)
            }

            logger.log('✅ Emulator and Appium cleaned successfully!')
        } catch (e) {
            logger.warn(`⚠️ Cleanup failed, continuing anyway: ${e}`)
        }
    }
}
