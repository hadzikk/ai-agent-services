export function randomInt(minimum: number, maximum: number) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

export function randomFloat(minimum: number, maximum: number) {
    return Number((Math.random() * (maximum - minimum) + minimum).toFixed(1));
}