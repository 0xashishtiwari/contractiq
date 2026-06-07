"use client";

import { Upload, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/navbar";

const ContractUploadPage = () => {
  return (
    <>
      <Navbar />

      <section className="relative overflow-hidden py-10">
        <div className="pointer-events-none absolute inset-0 opacity-40 hero-grid" />
        <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-32 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="section-container relative max-w-2xl">
          <Card className="glass-card glow-border overflow-hidden rounded-[2rem] border-border/60 bg-background/75">
            <CardContent className="p-6 md:p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-xl">
                    ContractIQ
                  </div>

                  <h1 className="text-2xl font-semibold tracking-tight md:text-4xl">
                    Upload Contract
                  </h1>

                  <p className="mt-3 text-sm text-muted-foreground">
                    Upload a PDF and receive an AI-powered legal review.
                  </p>
                </div>

                <label className="group flex cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-border/60 bg-background/50 p-8 text-center transition-all hover:bg-background/70">
                  <Upload className="mb-3 size-8 text-primary" />

                  <p className="font-medium text-foreground">
                    Drop your PDF here
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    or click to browse
                  </p>

                  <p className="mt-3 text-xs text-muted-foreground">
                    PDF only • Max 25 MB
                  </p>

                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                  />
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/70 px-4 py-3">
                  <FileText className="size-5 text-primary" />

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      No file selected
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Upload a contract to begin analysis
                    </p>
                  </div>
                </div>

                <Button className="w-full rounded-full">
                  Analyze Contract
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default ContractUploadPage;