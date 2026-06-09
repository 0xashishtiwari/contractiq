import { resend } from "@/lib/resend";

export const sendEmail = async (
  contractWithUser: any,
  report: any,
    reviewLink: string
) => {
  try {
    await resend.emails.send({
      from: "ContractIQ <onboarding@resend.dev>",
      to: contractWithUser.user.email,

      subject: "Contract Review Ready",

      html: `
        <h2>Contract Analysis Complete</h2>

        <p>Hello ${contractWithUser.user.name},</p>

        <p>
          Your contract has been analyzed and is ready for review.
        </p>

        <h3>Summary</h3>

        <ul>
          <li>
            Total Clauses:
            ${report.summary.totalClauses}
          </li>

          <li>
            High Risk Clauses:
            ${report.summary.highRisk}
          </li>

          <li>
            Medium Risk Clauses:
            ${report.summary.mediumRisk}
          </li>

          <li>
            Low Risk Clauses:
            ${report.summary.lowRisk}
          </li>
        </ul>

        <p>
          Click below to review the contract:
        </p>

        <a href="${reviewLink}">
          Review Contract
        </a>

        <br /><br />

        <p>
          Thank you,<br/>
          ContractIQ
        </p>
      `,
    });

    console.log(
      `Review email sent to ${contractWithUser.user.email}`
    );
  } catch (error) {
    console.error("Error sending email", error);
    throw error;
  }
};