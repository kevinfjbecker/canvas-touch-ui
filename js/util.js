export const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y })

export const dist = (a, b) =>
    Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)

export const length = ({ x, y }) => Math.sqrt(x * x + y * y)

export const normal = ({ x, y }) => {
    const len = length({ x, y })
    return {
        x: x / len,
        y: y / len
    }
}

export const scale = (vector, magintude) => ({
    x: vector.x * magintude,
    y: vector.y * magintude
})

export const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y })