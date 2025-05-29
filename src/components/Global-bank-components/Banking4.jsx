import { Download } from 'lucide-react';

export default function Banking4() {
  return (
    <section className="p-4 sm:p-6 mx-4 sm:mx-8 lg:mx-16 xl:mx-[95px] max-w-[1800px] ">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 border-l-[3px] sm:border-l-4 border-red-600 pl-2 sm:pl-3">
        Useful Information
      </h2>

      <div className="bg-gray-100 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-800">
        {/* Row 1 */}
        <div className="flex items-start gap-2 p-2 hover:bg-gray-200 transition-colors rounded">
          <Download size={16} className="mt-0.5 shrink-0" />
          <span className="hover:underline cursor-pointer truncate">
            Funds Transfer SmartForm
          </span>
        </div>
        
        {[
          'T&C and Agreement',
          'Phishing Warning',
          'Service Cutoff Time for Electronic Fund Transfer',
          'Interest Rate',
          'Registration of Insured Financial Products (PDF, 100KB)',
          'Tariff Table',
          'Electronic Banking Dispute Settlement',
          'Loan interest rate (corporate)'
        ].map((item, index) => (
          <div 
            key={index}
            className="flex justify-between items-center p-2 hover:bg-gray-200 transition-colors rounded cursor-pointer group"
          >
            <span className="hover:underline truncate pr-2">
              {item}
            </span>
            <span className="text-red-600 transition-transform group-hover:translate-x-1">
              ›
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}