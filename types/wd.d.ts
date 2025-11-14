declare module "wd" {
  import { EventEmitter } from "events";

  export interface Browser extends EventEmitter {
    init(caps: any): Promise<void>;
    quit(): Promise<void>;
    elementById(id: string): Promise<any>;
    elementsByClassName(cls: string): Promise<any[]>;
  }

  const wd: {
    promiseChainRemote(host: string, port: number): Browser;
  };

  export default wd;
}
