declare module 'node-base64-image' {
    type Callback<T> = (err: any, x?: T) => void

    function encode(url: string, options: { string?: boolean, local?: boolean }, callback: Callback<any>): void

    function decode(imageBuffer: any, options: { filename?: string }, callback: Callback<any>): void
}