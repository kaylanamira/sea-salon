"use client"
import React from 'react'
import { useState } from 'react';

const RegisterPage = () => {
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatinguser, setcreatingUser] = useState(true);
    const [usercreated, setUserCreated] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({fullname, phone, email, password}),
            headers: {'Content-Type': 'application/json'}
        })
        setcreatingUser(false);
        setUserCreated(true);
    };

    return (
        <section className='max-w-md mx-auto text-center'>
            <h1 className='text-4xl'>Register</h1>
            {usercreated && (
                <div className='mt-3'>
                    User created!
                </div>
            )}
            <form onSubmit={handleSubmit} className='mt-8 flex flex-col space-y-4'>
                <input
                    type="text"
                    className="input-custom"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="input-custom"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="input-custom"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="input-custom"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" >
                Register
                </button>
            </form>
        </section>
    )
}

export default RegisterPage