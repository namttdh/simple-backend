export declare const IWebServiceName = "IWebService";
export interface IWebService {
    /** @desc run application */
    run(): void;
    /** @desc get instance of web service */
    instance(): any;
}
