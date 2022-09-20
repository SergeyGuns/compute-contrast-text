export const computeGrayContrast = (dark, light) => (hex) => {
    const RBG_THRESHOLD = 127
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    const [r1, r2, g1, g2, b1, b2] = hex.split('')
    console.log({ r1, r2, g1, g2, b1, b2 })
    const [r, g, b] = [parseInt(r1 + r2, 16), parseInt(g1 + g2, 16), parseInt(b1 + b2, 16)]
    console.log({ r, g, b })
    const average = [r, g, b].reduce((a, b) => a + b) / 3
    console.log({ average })
    return average > RBG_THRESHOLD ? dark : light
}
