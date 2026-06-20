import { Clause, Contract } from '@/generated/prisma/client';

type contactWithClause = Contract & {
  clauses: Clause[];
}

export const buildSummaryPrompt = (contract: contactWithClause) => {
  const highRisk = contract.clauses.filter(clause => clause.riskLevel === 'HIGH');
  const mediumRisk = contract.clauses.filter(clause => clause.riskLevel === 'MEDIUM');
  const lowRisk = contract.clauses.filter(clause => clause.riskLevel === 'LOW');

  const approved = contract.clauses.filter(clause => clause.reviewStatus === 'APPROVED');
  const rejected = contract.clauses.filter(clause => clause.reviewStatus === 'REJECTED');
  const pending = contract.clauses.filter(clause => clause.reviewStatus === 'PENDING');


  let prompt = `
    Contract Name : ${contract.fileName};

    Statistics:
    - Total Clauses: ${contract.clauses.length}
    - High Risk Clauses: ${highRisk.length}
    - Medium Risk Clauses: ${mediumRisk.length}
    - Low Risk Clauses: ${lowRisk.length}

    Review Status:
    - Approved Clauses: ${approved.length}
    - Rejected Clauses: ${rejected.length}
    - Pending Clauses: ${pending.length}

    Clause Review :
  `
    for (const clause of contract.clauses){
        prompt += `

        -----------------------------------------
        Text : ${clause.content}

        Risk Explanation : ${clause.riskExplanation}

        Risk Level : ${clause.riskLevel ?? 'No risk level assigned'}

        Review Status : ${clause.reviewStatus ?? 'No review status'}

        Ambiguity Explanation : ${clause.ambiguousTerms ?? 'No ambiguity detected'}

        Recommendation : ${clause.recommendations ?? 'No recommendation provided'}

        Reviewer Comment : ${clause.reviewNote ?? 'No comment provided'}


        `
    }
    return prompt;
};

