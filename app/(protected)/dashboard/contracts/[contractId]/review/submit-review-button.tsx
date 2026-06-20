"use client";

import { Button } from "@/components/ui/button";
import { submitFinalReview } from "@/app/actions/submitFinalReview";
import { toast } from 'sonner';
import {useRouter  , usePathname} from 'next/navigation'
import { useState } from "react";
export default function SubmitReviewButton({
    contractId,
}: {
    contractId: string;
}) {

    const router = useRouter();
    const[isSubmitting, setIsSubmitting] = useState(false);
    const pathname = usePathname();
    
    async function handleSubmit() {


        try {
            setIsSubmitting(true);
            const result = await submitFinalReview(contractId);
            console.log(result.message);
            // Optionally, you can add a success notification here
            if (result.success) {
                toast.success("Review submitted successfully!");
            }
            // Refresh the page to reflect the updated status
            router.replace(pathname.replace("/review", "/summary"));
        } catch (error) {
            console.error("Error submitting final review:", error);
            // Optionally, you can add an error notification here
            toast.error("Failed to submit review. Please try again.");
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
       <Button
      onClick={handleSubmit}
      disabled={isSubmitting}
    >
      {isSubmitting ? "Generating Summary..." : "Submit Review"}
    </Button>
    );
}