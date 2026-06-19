"use client";

import { Button } from "@/components/ui/button";
import { submitFinalReview } from "@/app/actions/submitFinalReview";
import { toast } from 'sonner';
export default function SubmitReviewButton({
    contractId,
}: {
    contractId: string;
}) {
    async function handleSubmit() {

        try {
            const result = await submitFinalReview(contractId);
            console.log(result.message);
            // Optionally, you can add a success notification here
            if (result.success) {
                toast.success("Review submitted successfully!");
            }
        } catch (error) {
            console.error("Error submitting final review:", error);
            // Optionally, you can add an error notification here
            toast.error("Failed to submit review. Please try again.");
        }

    }

    return (
        <Button onClick={handleSubmit}>
            Submit Review
        </Button>
    );
}