declare module "wd" {
  interface Browser {
    init(caps: any): Promise<void>;
    elementByAccessibilityId(selector: string): Promise<any>;
    elementByXPath(selector: string): Promise<any>;
    elementsById(selector: string): Promise<any[]>;
    elementById(selector: string): Promise<any>;
  }

  const wd: {
    promiseChainRemote(host: string, port: number): Browser;
  };

  export default wd;
}
