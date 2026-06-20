import { resend } from "@/lib/resend";
import {Contract , Clause , User} from '@/generated/prisma/client'

type contactWithClause = Contract & {
    clauses: Clause[];
    user : User;
}

export const sendSummaryEmail = async (
    contract: contactWithClause
 
) => {
  try {

    const dashBoardUrl = `${process.env.FRONTEND_URL}` +
    `/dashboard/contracts/${contract.id}/summary`;


    await resend.emails.send({
      from: "ContractIQ <onboarding@resend.dev>",
      to: contract.user.email,

      subject: "Your Contract Summary is Ready",

      html: `
        <h2>Contract Analysis Complete</h2>

        <p>Hello ${contract.user.name},</p>

        <p>
            Your contract has been analyzed and the summary is ready for review.
        </p>

        <h3>Summary</h3>

        <p>
            Click below to view the summary of your contract:
        </p>

        <a href="${dashBoardUrl}">
            View Contract Summary
        </a>
        
        <br /><br />

        <p>
            Thank you,<br/>
            ContractIQ
        </p>
      `,
    });

    console.log(
      `Review email sent to ${contract.user.email}`
    );
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
};