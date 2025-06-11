export function dualParser(text) {
    const lines = text.split('\n');
    const array = [];

    for (const line of lines) {
        const [first, second] = line.trim().split(',');
        if (first && second) {
            array.push({first: first.trim(),second: second.trim()});
        }
    }
    
    return array;
}