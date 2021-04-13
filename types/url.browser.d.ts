declare const url: {
    new (url: string, base?: string | URL): URL;
    prototype: URL;
    createObjectURL(object: any): string;
    revokeObjectURL(url: string): void;
};
declare const urlSearchParams: {
    new (init?: string | string[][] | Record<string, string> | URLSearchParams): URLSearchParams;
    prototype: URLSearchParams;
    toString(): string;
};
export { url as URL, urlSearchParams as URLSearchParams };
//# sourceMappingURL=url.browser.d.ts.map