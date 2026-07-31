// Replica of the shipped decision logic in dev-shell.ts, driven by simulated viewports.
let fits = [], fitW = 0, fitH = 0, vw, vh;
const fit = (w, h) => fits.push(`${w}x${h}`);
function apply() { if (vw !== fitW || vh > fitH) { fitW = vw; fitH = vh; fit(vw, vh); } }
const set = (w, h) => { vw = w; vh = h; apply(); };
const assert = (c, m) => { if (!c) { console.error('FAIL:', m); process.exitCode = 1; } else console.log('ok  ', m); };

set(1920, 1200);
assert(fits.join() === '1920x1200', 'initial fit uses the full viewport');

set(1920, 700);                    // keyboard opens (auto-fav-edit case)
set(1920, 620);                    // more resize events as it animates
assert(fits.join() === '1920x1200', 'keyboard shrink never refits — page cannot squash');

set(1920, 1200);                   // keyboard dismissed
assert(fits.join() === '1920x1200', 'after dismiss the page is already correctly fitted');

set(1200, 1920);                   // rotation: width changed
assert(fits.join() === '1920x1200,1200x1920', 'width change always refits');

set(1200, 900);                    // keyboard in the new orientation
assert(fits.join() === '1920x1200,1200x1920', 'shrink ignored in new orientation too');

fits = []; fitW = 0; fitH = 0;
set(1920, 700);                    // page loaded while keyboard was already open
set(1920, 1200);                   // then dismissed
assert(fits.join() === '1920x700,1920x1200', 'load-with-keyboard-open recovers on dismiss');

fits = []; fitW = 0; fitH = 0;
set(1340, 800);                    // 8" tablet, no keyboard
assert(fits.join() === '1340x800', '8-inch tablet fits normally');
