import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/solid";
import Switcher from "./Switcher";

export const ThemeChanger = () => {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null
    
    return (
        <div className="flex items-center">
            {theme === 'dark' ? 
                <MoonIcon
                    className="mx-auto h-6 mr-2 w-auto text-indigo-500"
                    aria-hidden="true"
                /> :
                <SunIcon
                    className="mx-auto h-6 mr-2 w-auto text-gray-400"
                    aria-hidden="true"
                />}
            <Switcher initial={theme === 'dark' ? true : false} text="change theme" switchFunc={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        </div>
    )
}
