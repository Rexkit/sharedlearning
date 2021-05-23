import * as React from "react";
import { LockClosedIcon } from '@heroicons/react/solid';
import { useMutation } from '@apollo/client';
import { SIGNIN_QUERY } from "../../utils/queries";
import { SignInUser, SignInUserVariables } from "../../utils/types/SignInUser";
import { Notification } from "../../components/Notification";

const SignInForm = () => {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [error, setError] = React.useState<{message:string}|null>(null);

    const [login, result] = useMutation<SignInUser, SignInUserVariables>(SIGNIN_QUERY, {
        onError: (error) => {
            setError(error);
        }
    });

    React.useEffect(() => {
        if ( result.data ) {
            console.log(result.data);
        }
    }, [result.data])

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

        login({variables: { email, password }})
    }

    return (
        <>
        {error ? <Notification heading={error.message} text="Please enter valid credentials" state={false} callback={() => setError(null)} /> : null}
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-200">Sign in to your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-200">
                        Or{' '}
                        <a href="#" className="font-medium text-indigo-500 hover:text-indigo-400">
                            sign up for free
                        </a>
                    </p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={submit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-200 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 dark:bg-gray-900 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-200 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            Sign in
                    </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default SignInForm;
