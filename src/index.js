const { value } = require('./import-me');


function runDemo() {
    console.info(`It works: ${value}`);
}


if (typeof window !== 'undefined') {
    window.runDemo = runDemo;
}

if (typeof module !== 'undefined') {
    module.exports = { runDemo };
}
