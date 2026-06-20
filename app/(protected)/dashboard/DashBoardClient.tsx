"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/navbar";

import {
    Upload,
    FileText,
    Clock3,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type Contract = {
    id: string;
    fileName: string;
    filePath: string;
    userId: string;
    status: string;
    extractedText: string | null;
    reviewTokenId: string | null;
    finalSummary: string | null;
    report: unknown;
    createdAt: Date;
    updatedAt: Date;
};

interface DashboardClientProps {
    contracts: Contract[];
}



const DashBoardClient = ({ contracts }: DashboardClientProps) => {

    const totalContracts = contracts.length;

    const underReview = contracts.filter(
        (contract) => contract.status === "UNDER_REVIEW"
    ).length;

    const completed = contracts.filter(
        (contract) => contract.status === "COMPLETED"
    ).length;

    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 hero-grid opacity-40" />
            <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-32 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

            <Navbar />

            <main className="section-container relative py-10">
                {/* Header */}
                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-xl">
                            ContractIQ Dashboard
                        </div>

                        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
                            Manage Your Contracts
                        </h1>

                        <p className="mt-3 text-muted-foreground">
                            Track contract reviews, monitor AI analysis, and generate final
                            reports.
                        </p>
                    </div>

                    <Button asChild size="lg" className="rounded-full px-6">
                        <Link href="dashboard/upload">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Contract
                        </Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="glass-card glow-border border-border/60 bg-background/75">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Total Contracts
                                    </p>
                                    <h2 className="mt-2 text-4xl font-bold">
                                        {totalContracts}
                                    </h2>
                                </div>

                                <FileText className="h-10 w-10 text-primary" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card glow-border border-border/60 bg-background/75">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Under Review
                                    </p>
                                    <h2 className="mt-2 text-4xl font-bold text-amber-400">
                                        {underReview}
                                    </h2>
                                </div>

                                <Clock3 className="h-10 w-10 text-amber-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card glow-border border-border/60 bg-background/75">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Completed
                                    </p>
                                    <h2 className="mt-2 text-4xl font-bold text-emerald-400">
                                        {completed}
                                    </h2>
                                </div>

                                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contracts */}
                <Card className="glass-card glow-border mt-10 border-border/60 bg-background/75">
                    <CardHeader>
                        <CardTitle className="text-xl">
                            Recent Contracts
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        {contracts.length === 0 ? (
                            <div className="py-12 text-center text-muted-foreground">
                                No contracts found. Upload your first contract.
                            </div>
                        ) : (
                            contracts.map((contract, index) => (
                                <motion.div
                                    key={contract.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.08,
                                    }}
                                    className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur-sm md:flex-row md:items-center md:justify-between"
                                >
                                    <div>
                                        <h3 className="font-semibold">
                                            {contract.fileName}
                                        </h3>

                                        <p className="mt-1 text-sm text-muted-foreground">
                                            Uploaded{" "}
                                            {new Date(contract.createdAt).toLocaleDateString()}
                                        </p>

                                        <span
                                            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${contract.status === "COMPLETED"
                                                    ? "bg-emerald-500/10 text-emerald-400"
                                                    : contract.status === "UNDER_REVIEW"
                                                        ? "bg-amber-500/10 text-amber-400"
                                                        : "bg-sky-500/10 text-sky-400"
                                                }`}
                                        >
                                            {contract.status.replaceAll("_", " ")}
                                        </span>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="rounded-full"
                                        >
                                            <Link
                                                href={`/dashboard/contracts/${contract.id}/review`}
                                            >
                                                Review
                                            </Link>
                                        </Button>

                                        <Button
                                            asChild
                                            className="rounded-full"
                                        >
                                            <Link
                                                href={`/dashboard/contracts/${contract.id}/summary`}
                                            >
                                                Summary
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default DashBoardClient;