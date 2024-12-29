const eventEmitter = {
    listeners: new Set<Function>(),
    subscribe(listener: Function) {
      this.listeners.add(listener);
    },
    unsubscribe(listener: Function) {
      this.listeners.delete(listener);
    },
    emit(data: any) {
      this.listeners.forEach((listener) => listener(data));
    },
  };
  
  export default eventEmitter;
  