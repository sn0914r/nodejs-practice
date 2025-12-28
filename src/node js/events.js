// =============== NODE JS BUILT-IN MODULES [EVENTS] ===============
// ========== EVENTS MODULE ==========

/*======================================================================
KEY METHODS:
    1. .on(eventName, cb) => attaches a listener to an event.
    2. .emit(eventName) => call all the listeners attached to the given events.
    3. .off(eventName, cb) => removes the listener attached to given events.
    4. .once(eventName, cb) => emits only once
    5. .removeAllListeners(eventName) => removes all listeners to the given event
    6. .listenerCount(eventName) => returns the number of listeners attached to an event.
======================================================================*/
const EventEmitter = require("events");
const events = new EventEmitter();

const listener1 = () => {
  console.log("program started");
};

const listener2 = (num) => {
  console.log("started at", num);
};

const listener3 = (from, to) => {
  console.log("started from", from, "to", to);
};

events.on("start", listener1);
events.on("start", listener2);
events.on("start", listener3);
events.emit("start", 1, 30); // calls all 3 listeners

events.off("start", listener1); // removes the 1st listener
events.emit("start", 1, 30); // calls 2 remaining listeners

events.once("login", () => {
  console.log("user logged in");
});
events.emit("login"); // calls only once
events.emit("login");

console.log(
  "Total number of events (before 'removeAllListener'):",
  events.listenerCount("start")
);
events.removeAllListeners("start");
console.log(
  "Total number of events (after 'removeAllListener'):",
  events.listenerCount("start")
);
