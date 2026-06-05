'use client'
import React from 'react'
import SignUpForm from '@/components/forms/sign-up-form';
import Navbar from '@/components/landing/navbar';

const SignUpPage = () => {
  return (
    <div>
      <Navbar/>
      <SignUpForm />
    </div>
  )
}

export default SignUpPage