type Func = (x: unknown) => void;

interface IEvents {
  [key: string]: Func[];
}

class EventEmitter {
  private events: IEvents;

  constructor() {
    this.events = {};
  }

  public subscribe(eventName: string, fn: Func): Func {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);

    return () => {
      this.events[eventName] = this.events[eventName].filter((eventFn) => fn !== eventFn);
    };
  }

  public emit(eventName: string, data: unknown): void {
    const event = this.events[eventName];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, data);
      });
    }
  }
}

const emitter = new EventEmitter();

export { emitter, EventEmitter, IEvents };
