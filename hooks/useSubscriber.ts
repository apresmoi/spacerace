import React from "react";

type SubscriberCallback<TArgs extends any[], TReturn> = (
  ...args: TArgs
) => TReturn;

type Subscribers<TArgs extends any[], TReturn> = {
  [key: string]: SubscriberCallback<TArgs, TReturn>[];
};

export function useSubscriber<
  K extends string,
  TArgs extends any[],
  TReturn
>() {
  const subscribers = React.useRef<Subscribers<TArgs, TReturn>>({});

  const addSubscriber = React.useCallback(
    (key: K, callback: (...args: TArgs) => TReturn) => {
      if (!subscribers.current[key]) subscribers.current[key] = [];
      subscribers.current[key].push(callback);
    },
    []
  );

  const removeSubscriber = React.useCallback(
    (key: K, callback: (...args: TArgs) => TReturn) => {
      if (!subscribers.current[key]) subscribers.current[key] = [];
      subscribers.current[key].filter((cb) => cb !== callback);
    },
    []
  );

  const trigger = React.useCallback((key: K, ...args: TArgs) => {
    if (!subscribers.current[key]) subscribers.current[key] = [];
    subscribers.current[key].forEach((cb) => {
      cb(...args);
    });
  }, []);

  return {
    subscribers,
    addSubscriber,
    removeSubscriber,
    trigger,
  };
}
