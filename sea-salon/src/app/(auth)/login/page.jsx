"use client"
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logging, setlogging] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('')
    const router = useRouter()
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
          const redirectPath = session.user.role === 'admin' ? '/admin' : '/customer';
          router.replace(redirectPath);
        }
      }, [status, session, router]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setlogging(true);
            const res = await signIn('credentials', { email, password, redirect: false });
            setlogging(false);
            if (res?.error) {
                setError(res.error)
                setPassword('');
                return
            } 
            else {
                setSuccess(true);
                setError('')
            }
            
        } catch (error) {
            console.log(error)
            setlogging(false);
        }
    };

    return (
        <section className='max-w-md mx-auto text-center'>
            <h1 className='text-4xl'>Login</h1>
            <form onSubmit={handleSubmit} className='mt-8 flex flex-col space-y-4'>
                <input
                    type="email"
                    className="input-custom"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={logging}
                    required
                />
                <input
                    type="password"
                    className="input-custom"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={logging}
                    required
                />
                <button type="submit" disabled={logging}>
                Login
                </button>
                <div className='text-center my-4 text-gray-500'>
                    Dont have an account yet?{' '}
                    <Link className='underline' href="/register">Register</Link>
                </div>
                {success && (
                    <div className='text-center mt-3'>
                        Login success!
                    </div>
                )}
                {error !== '' && <div className='text-center my-2 text-red-400'>
                   {error}
                </div>}
            </form>
        </section>
    )
}

export default LoginPage