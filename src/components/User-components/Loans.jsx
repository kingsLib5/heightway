import React from "react";
import LoanApplication from "../Forms/LoanApplication";
import LoanHistoryTable from "../User-components/LoanHistoryTable";

const Loan = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Page Title */}
      <h2 className="text-3xl font-semibold text-[#B91C1C] mb-6">Loans</h2>

      {/* Loan Application Section */}
      <section className="mb-8">
        <div className="flex items-center mb-4">
          <h4 className="text-2xl font-semibold text-[#B91C1C] mr-2">
            Apply for a New Loan
          </h4>
        </div>
        <p className="text-gray-600 mb-4">
          Use this form to apply for a loan. Ensure your information is accurate.
        </p>
        <LoanApplication />
      </section>

      {/* Loan History Section */}
      <section>
        <div className="flex items-center mb-4">
          <h4 className="text-2xl font-semibold text-[#B91C1C] mr-2">
            Loan History
          </h4>
        </div>
        <p className="text-gray-600 mb-4">
          Review your previous and active loan applications below.
        </p>
        <LoanHistoryTable />
      </section>
    </div>
  );
};

export default Loan;
