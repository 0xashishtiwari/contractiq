
import Navbar from '@/components/landing/navbar';
import { prisma } from '@/lib/prisma';

import { notFound } from 'next/navigation';
import ClauseCard from './ClauseCard';
import StatCard from './StatCasd';

import {submitFinalReview} from "@/app/actions/submitFinalReview";
import {toast} from 'sonner'
import SubmitReviewButton from './submit-review-button';

export default async function ReviewPage({ params }: { params: Promise<{ contractId: string }> }) {
  const { contractId } = await params;


   async function handleSubmi() {
    try {
      const result = await submitFinalReview(contractId);
      console.log(result.message);
      // Optionally, you can add a success notification here
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting final review:", error);
      // Optionally, you can add an error notification here
      toast.error("Failed to submit review. Please try again.");
    }
  }

  
  const contract = await prisma.contract.findUnique({
    where: { id: contractId },
    include: {
      clauses: {
        orderBy: { number: 'asc' },
      }
    },
  });

  if (!contract) {
    notFound();
  }

  const stats = {
    total: contract.clauses.length,
    high: contract.clauses.filter(
      (c) => c.riskLevel === "HIGH"
    ).length,
    medium: contract.clauses.filter(
      (c) => c.riskLevel === "MEDIUM"
    ).length,
    low: contract.clauses.filter(
      (c) => c.riskLevel === "LOW"
    ).length,
  };

 

  return (
    <>
      <div>
        <Navbar />
        <div className="container mx-auto max-w-7xl px-4 py-10">
          {/* Header */}
          <div className="glass-card glow-border mb-8 rounded-[2rem] border border-border/60 p-8">
            <h1 className="text-3xl font-semibold">Contract Review</h1>

            <p className="mt-2 text-muted-foreground">{contract.fileName}</p>
          </div>

          {/* Stats */}
          <div className="mb-10 grid gap-4 md:grid-cols-4">
            <StatCard value={stats.total} label="Total Clauses" color="text-primary" />
            <StatCard value={stats.high} label="High Risk" color="text-red-400" />
            <StatCard value={stats.medium} label="Medium Risk" color="text-amber-400" />
            <StatCard value={stats.low} label="Low Risk" color="text-emerald-400" />
          </div>

          {/* Review progress bar */}
          <div className="glass-card glow-border mb-10 rounded-[2rem] border border-border/60 p-6">
            <h2 className="mb-4 text-xl font-semibold">Review Progress</h2>
            <div className="w-full rounded-full bg-border/30">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${(contract.clauses.filter((c) => c.reviewStatus === "APPROVED").length / contract.clauses.length) * 100}%` }} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {contract.clauses.filter((c) => c.reviewStatus === "APPROVED").length} of {contract.clauses.length} clauses approved
            </p>

          </div>

          {/* Clauses */}

          <div>
            {contract!.clauses.map((clause) => (
              <ClauseCard key={clause.id} clause={clause} />
            ))}
          </div>

          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div className="glass-card glow-border rounded-full border border-border/60 p-2 shadow-2xl backdrop-blur-xl">
             <SubmitReviewButton contractId={contractId} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

