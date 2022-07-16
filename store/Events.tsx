import * as React from "react";

type EventSubscriber = (
  eventName: string,
  callback: (...args: any) => void
) => void;

type EventTrigger = (eventName: string, ...args: any) => void;

type IEventStoreContext = {
  subscribeEvent: EventSubscriber;
  unsubscribeEvent: EventSubscriber;
  triggerEvent: EventTrigger;
};

type SubscriberRepository = {
  [eventName: string]: Array<(...args: any) => void>;
};

const subscribers: SubscriberRepository = {};

const contextValue: IEventStoreContext = {
  subscribeEvent: (eventName, callback) => {
    if (subscribers[eventName]) {
      subscribers[eventName].push(callback);
      return;
    }
    subscribers[eventName] = [callback];
  },

  unsubscribeEvent: (eventName, callback) => {
    if (subscribers[eventName]) {
      subscribers[eventName] = subscribers[eventName].filter(
        (cb) => cb !== callback
      );
      return;
    }
    subscribers[eventName] = [];
  },

  triggerEvent: (eventName, ...args) => {
    if (subscribers[eventName]) {
      subscribers[eventName].forEach((cb) => cb(...args));
    }
  },
};

export const EventsStoreContext =
  React.createContext<IEventStoreContext>(contextValue);

export function useEvents() {
  return React.useContext(EventsStoreContext);
}

export function EventsStore(props: React.PropsWithChildren<{}>) {
  return (
    <EventsStoreContext.Provider value={contextValue}>
      {props.children}
    </EventsStoreContext.Provider>
  );
}
