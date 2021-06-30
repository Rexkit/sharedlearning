import * as React from "react";

type Props = {
    header?: React.ReactNode,
    content?: React.ReactNode,
    footer?: React.ReactNode,
    centerContent?: boolean
}

export const DefaultLayout = ({ header, content, footer, centerContent }: Props) => {
    return (
        <div className='bg-gray-50 dark:bg-gray-900'>
            <div className="flex flex-col min-h-screen justify-between">
                {header && (
                    <header>
                        {header}
                    </header>
                )}
                
                {content && (
                    <main className={centerContent ? 'h-auto' : 'h-full'}>
                        {content}
                    </main>
                )}
                
                {footer && (
                    <footer>
                        {footer}
                    </footer>
                )}
            </div>
        </div>
    )
}