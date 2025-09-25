
function getUserCB(id, cb) {
    setTimeout(() => cb(null, { id, name: "User" + id }), 200);
}

function getOrdersCB(userId, cb) {
    setTimeout(() => {
        const chance = Math.random();
        // ~30% empty orders to drive the business-rule error
        if (chance < 0.3) return cb(null, []);
        // ~10% real error to prove error propagation still works
        if (chance < 0.4) return cb(new Error("DB failure"));
        cb(null, ["o1", "o2"]);
    }, 250);
}

function getRecsCB(userId, cb) {
    setTimeout(() => cb(null, ["r1", "r2", "r3"]), 180);
}


// TODO: use promisify
function promisify(fn) {
    return function (...args) {
      return new Promise((resolve, reject) => {
        fn(...args, (err, data) => err ? reject(err) : resolve(data));
      });
    };
}


// TODO: create wrappers using promisify
const getUserP   = promisify(getUserCB);
const getOrdersP = promisify(getOrdersCB);
const getRecsP   = promisify(getRecsCB);

/* ──────────────────────────────────────────────────────────────────────────
   - After fetching user and orders, INSERT a step that rejects with
     new Error("No orders") if orders.length === 0.
   - Catch all errors ONCE at the end (one .catch).
   - Always log "Done (sequential)" in a .finally().
────────────────────────────────────────────────────────────────────────── */
function runSequential() {
    console.log("— SEQUENTIAL —");
    return getUserP(1)
        .then(user => {
            console.log("user:", user);
            return getOrdersP(user.id).then(orders => ({ user, orders }));
        })
        .then(({ user, orders }) => {
            // TODO: business-rule failure here
            if (orders.length === 0) {
                throw new Error("No orders");
            }
            
            console.log("orders:", orders);
            return getRecsP(user.id).then(recommendations => ({ user, orders, recommendations }));
        })
        .then(({ user, orders, recommendations }) => {
            console.log("final (sequential):", { user, orders, recommendations });
        })
        .catch(err => {
            console.error("Caught (sequential):", err.message);
        })
        .finally(() => {
            console.log("Done (sequential)");
        });
}

/* ──────────────────────────────────────────────────────────────────────────
   - First getUserP(2).
   - Then, in a single .then, kick off Promise.all([getOrdersP(id), getRecsP(id)]).
   - Log the combined results structure: { user, orders, recommendations }.
   - Use a single .catch and .finally (like above).
────────────────────────────────────────────────────────────────────────── */
function runParallel() {
    console.log("— PARALLEL —");
    return getUserP(2)
        .then(user => {
            // TODO: run both in parallel using Promise.all and then log result
            console.log("user:", user);
            return Promise.all([getOrdersP(user.id), getRecsP(user.id)])
                .then(([orders, recommendations]) => ({ user, orders, recommendations }));
        })
        .then(({ user, orders, recommendations }) => {
            console.log("final (parallel):", { user, orders, recommendations });
        })
        .catch(err => {
            console.error("Caught (parallel):", err.message);
        })
        .finally(() => {
            console.log("Done (parallel)");
        });
}

/* ──────────────────────────────────────────────────────────────────────────
Optional -- Promise.race demo
   - Race two simple promises with different delays; log the winner.
   - Keep it tiny; focus remains on the above tasks.
────────────────────────────────────────────────────────────────────────── */
function runRaceOptional() {
    console.log("— RACE (optional) —");
    const p1 = new Promise(res => setTimeout(() => res("p1"), 120));
    const p2 = new Promise(res => setTimeout(() => res("p2"), 60));
    // TODO:practice  Promise.race return then (winner as console.log("race winner:", winner));
    return Promise.race([p1, p2]).then(winner => {
        console.log("race winner:", winner);
    });
}

/* ──────────────────────────────────────────────────────────────────────────
   ENTRY POINT for the HTML button
────────────────────────────────────────────────────────────────────────── */
function runA2() {
    console.clear();
    console.log("Running A2 — Promises");

    // Run sequential first (re-run a few times to trigger empty orders / DB failure paths)
    runSequential()
        .then(() => runParallel())
        .then(() => runRaceOptional());
}

// Expose for index.html button
window.runA2 = runA2;