'use client'
import Navbar from '@/components/landing/navbar';
import {use} from "react"

const page = ({ params }: { params: Promise<{ contractId: string }> }) => {
    const { contractId } = use(params);
  return (
    <div>
      <Navbar />
      <div>Review Page for Contract: {contractId}</div>
    </div>
  )
}

export default page