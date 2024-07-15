"use client"
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';

const RegisterPage = () => {
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatinguser, setcreatingUser] = useState(false);
    const [usercreated, setUserCreated] = useState(false);
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        const resUserExists = await fetch('/api/userExist', {
            method: 'POST',
            body: JSON.stringify({email}),
            headers: {'Content-Type': 'application/json'}
        })
        setcreatingUser(false);
        const { user } = await resUserExists.json()
        if (user) {
            setError('User already exists')
            return
        }

        const res = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({fullname, phone, email, password}),
            headers: {'Content-Type': 'application/json'}
        })
        const result = await res.json();
        setcreatingUser(false);
      if (res.ok) {
        setUserCreated(true);
        setError('');
        e.target.reset();
      } else {
        setError(result.error || 'Registration failed');
      }

    };

    return (
        <section className='max-w-md mx-auto text-center'>
            <h1 className='text-4xl'>Register</h1>
            <form onSubmit={handleSubmit} className='mt-8 flex flex-col space-y-4'>
                <input
                    type="text"
                    className="input-custom"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    disabled={creatinguser}
                    required
                />
                <input
                    type="text"
                    className="input-custom"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={creatinguser}
                    required
                />
                <input
                    type="email"
                    className="input-custom"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={creatinguser}
                    required
                />
                <input
                    type="password"
                    className="input-custom"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={creatinguser}
                    required
                />
                <button type="submit" disabled={creatinguser}>
                Register
                </button>
                <div className='text-center my-4 text-gray-500'>
                    Existing account?{' '}
                    <Link className='underline' href="/login">Login</Link>
                </div>
                {error !== '' && <div className='text-center my-2 text-red-400'>
                   {error}
                </div>}
                {usercreated && (
                    <div className='mt-3'>
                        User created!
                    </div>
                )}
            </form>
        </section>
    )
}

export default RegisterPage