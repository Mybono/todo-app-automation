// import { remote, RemoteOptions } from "webdriverio";
// import { capabilities } from "../config/capabilities";
// let driver: WebdriverIO.Browser | undefined;

// export async function createDriver(): Promise<WebdriverIO.Browser> {
//   const options: RemoteOptions = {
//     protocol: "http",
//     hostname: "127.0.0.1",
//     port: 4723,
//     path: "/",
//     capabilities: capabilities[0],
//   };

//   driver = await remote(options);
//   return driver;
// }

// export async function getDriver(): Promise<WebdriverIO.Browser> {
//   if (!driver) {
//     driver = await createDriver();
//   }
//   return driver;
// }

// export { driver };
