// A3 — Event Loop, reproduce the exact output order
//
// Goal:
//   Fill in the TODO lines so that the console output is EXACTLY:
//
//   1) 1 sync start
//   2) 2 sync end
//   3) 3 microtask: promise.then
//   4) 4 microtask: queueMicrotask
//   5) 5 microtask: nested
//   6) 6 timeout
//
// Rules & Hints:
//   - Use ONLY: console.log, setTimeout(..., 0), Promise.resolve().then(...), queueMicrotask(...)
//   - Microtasks (then/queueMicrotask) run BEFORE the next macrotask (setTimeout).
//   - Microtasks run FIFO. If a microtask enqueues another, the new one runs AFTER the ones already queued.

function runA3(){
    console.clear();
    console.log("Running A3 — Event Loop (homework)");

    const EXPECTED = [
        "1 sync start",
        "2 sync end",
        "3 microtask: promise.then",
        "4 microtask: queueMicrotask",
        "5 microtask: nested",
        "6 timeout",
    ];

    const seen = [];
    const log = (msg) => { console.log(msg); seen.push(msg); };

    // ─────────────────────────────────────────────────────────────
    // TODO: Write code that produces EXACTLY the EXPECTED order.
    // Start with the first sync log:
    log("1 sync start");

    // Schedule a macrotask (should be LAST overall):
    // TODO: set a timeout that logs "6 timeout"
    setTimeout(() => {
        log("6 timeout");
    }, 0);

    // Schedule a microtask via Promise.then:
    //   Inside that microtask, also enqueue ANOTHER microtask that logs "5 microtask: nested"
    // TODO:
    Promise.resolve().then(() => {
        log("3 microtask: promise.then");
        queueMicrotask(() => {
            log("5 microtask: nested");
        });
    });

    // Schedule a queueMicrotask that logs "4 microtask: queueMicrotask"
    // TODO:
    queueMicrotask(() => {
        log("4 microtask: queueMicrotask");
    });

    // End of synchronous section:
    log("2 sync end");
    // ─────────────────────────────────────────────────────────────

    // Tiny checker (non-blocking)
    setTimeout(() => {
        const pass = EXPECTED.length === seen.length && EXPECTED.every((v, i) => v === seen[i]);
        console.log("---");
        console.log(pass ? " Order matches EXACTLY" : " Order does not match");
        if (!pass) {
            console.log("Expected:", EXPECTED);
            console.log("Got     :", seen);
        }
    }, 1);
}

// Expose for HTML button
window.runA3 = runA3;