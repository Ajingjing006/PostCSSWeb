var postcss = require('postcss');
var test = require('ava');

var plugin = require('./');

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.is(result.css, output);
            t.is(result.warnings().length, 0);
        });
}

test('transitionShtct', t => {
    return run( t,
    	'div { property: all; duration: 1s; timing: ease-in-out; delay: 1s; }',
    	'div { transition: all 1s ease-in-out 1s; }', { });
});
