import { useState } from "react";
import { Switch } from "@headlessui/react";

type SwitcherProps = {
    initial: boolean,
    text: string,
    switchFunc: (value: boolean) => void
}

export default function Switcher({ initial, text, switchFunc }: SwitcherProps) {
  const [enabled, setEnabled] = useState(initial);

  return (
    <div className="h-6">
        <Switch
            checked={enabled}
            onChange={(value) => {
                setEnabled(value);
                switchFunc(value);
            }}
            className={`${
                enabled ? 'bg-indigo-500' : 'bg-gray-300'
            } relative inline-flex items-center h-6 focus:outline-none rounded-full w-11`}
        >
            <span className="sr-only">{text}</span>
            <span
                aria-hidden="true"
                className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
        </Switch>
    </div>
  );
}
