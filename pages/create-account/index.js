'use client'
import React, { useState } from 'react'
import {addUserToFirestore, createEmailAndPassword } from '../api/database';

export default function Index() {

  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  return (
    <div className = 'block w-1/3 m-auto mt-9 p-2' >
        <h1 className='text-center text-lg font-bold mb-2 m-auto'>Signin</h1>
        <from>
            <label className='w-full'>Username</label>
            <input type="text" placeholder="Username" className='p-2 w-full rounded-md mt-1 bg-zinc-200' onChange={(e)=>{
              setUsername(e.target.value);
            }}/>
            <label className='w-full'>Email</label>
            <input type="email" placeholder="Email" className='p-2 w-full rounded-md mt-1 bg-zinc-200' onChange={(e)=>{
              setEmail(e.target.value);
            }}/>
            <label className='w-full'>Password</label>
            <input type="password" placeholder="Password" className='p-2 w-full rounded-md mt-1 bg-zinc-200' onChange={(e)=>{
              setPassword(e.target.value);
            }}/>
            <button className='mt-2 w-full bg-green-400 rounded-md p-1 text-white font-bold hover:bg-green-500' 
            onClick={async()=>{
              await createEmailAndPassword(email, password);
              await addUserToFirestore(username,email,password);
            }}>Signup</button>
        </from>
    </div>
  )
}
