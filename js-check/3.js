let text = 'Hello World!';
let resuilt = '';
for (let i = 0; i < text.length; i++) {
    if (text[i] === 'o') {
        console.log(i + 1);
    }
    if (text[i] !== 'l') {
        resuilt += text[i];
    }
}

console.log(resuilt);