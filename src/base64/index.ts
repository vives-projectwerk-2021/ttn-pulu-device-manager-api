export default {
    encode_text(data: any) {
        return Buffer.from(data).toString('base64')
    },
    encode_bytes(data: any) {
        const buffer = Uint8Array.from(data.match(/(..)/g).map((b: any)=>'0x'+b))
        return Buffer.from(String.fromCharCode(...buffer), 'binary').toString('base64')
    },
    decode_text(data: any) {
        return Buffer.from(data, 'base64').toString()
    },
    decode_bytes(data: any) {
        return Buffer.from(data, 'base64').toString('binary').split('').map(c=>c.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase()).join('')
    }
}