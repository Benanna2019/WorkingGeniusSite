import * as React from 'react'

import { ErrorAlert, SuccessAlert } from '@/app/components/Alert'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/Input'
import { LoadingSpinner } from '@/app/components/LoadingSpinner'
import { validEmail } from '@/app/lib/utils'

export function WritingSubscriptionForm({ defaultValue = '' }) {
    const [email, setEmail] = React.useState(defaultValue)
    const [status, setStatus] = React.useState('default')

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setStatus('default')
        return setEmail(e.target.value.trim())
    }

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('saving')

        if (!validEmail(email)) {
            setStatus('saving')
            return setStatus('invalid-email')
        }

        await fetch(`/api/newsletter`, {
            method: 'POST',
            body: JSON.stringify({ email }),
        }).then((res) => res.json())

        setStatus('success')
    }

    return (
        <div className="space-y-4 p-4">
            <div className="flex flex-col space-y-4">
                <p className="text-tertiary">
                    Get an email whenever I publish new posts. I also publish semi-regular
                    newsletters containing links to interesting articles about design,
                    technology, and startups.
                </p>
                <form
                    data-cy="subscribe-hn-form"
                    onSubmit={submit}
                    className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3"
                >
                    <label className="md:col-span-2">
                        <span className="sr-only">Email address</span>
                        <Input
                            value={email}
                            disabled={status === 'loading'}
                            onChange={onChange}
                            placeholder="Email address"
                            type="email"
                            name="email"
                        />
                    </label>
                    <Button
                        type="submit"
                        disabled={status === 'saving' || !email}
                    >
                        {status === 'saving' ? <LoadingSpinner /> : 'Subscribe'}
                    </Button>
                </form>
                <p className="text-quaternary text-sm">
                    Unsubscribe at any time. Powered by{' '}
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.getrevue.co/profile/brian_lovin"
                        className="text-primary"
                    >
                        Revue
                    </a>
                    .
                </p>
                {status === 'invalid-email' && (
                    <ErrorAlert>That email doesn't look valid, try another?</ErrorAlert>
                )}
                {status === 'success' && (
                    <SuccessAlert>
                        A confirmation email was sent to {email} — go click the link!
                    </SuccessAlert>
                )}
            </div>
        </div>
    )
}