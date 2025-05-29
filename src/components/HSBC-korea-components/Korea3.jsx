import React from "react";

const Korea3 = () => {
  return (
    <div className="bg-white text-gray-800 p-8 max-w-6xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light mb-4">Who we are</h1>
        <p className="mb-4">
          HSBC operates a bank and a securities company. We draw upon our extensive global
          network and deep market expertise to offer financial solutions to local corporates,
          multinationals, and financial institutions.
        </p>
        <p className="mb-4">
          Corporate and Institutional Banking is the core of our business in Korea which
          provides tailored solutions to cater our customers’ varying financial needs.
        </p>
        <p>
          We offer FX, trade finance, cash management, M&A services, custody, and trustee
          services, as well as the brokerage and sale of financial investment products including
          equities, bonds and derivatives.
        </p>
      </div>

      {/* Our Businesses */}
      <div>
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Our businesses</h2>

        {/* BANK Section */}
        <div>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">BANK</h3>

          <div className="mb-4">
            <h4 className="text-lg font-semibold">Banking</h4>
            <p>
              HSBC’s Banking unit is responsible for the overall management of relationships with
              our corporate and institutional clients. Based on global expertise coupled with local
              knowledge, we offer innovative and integrated financial solutions to our clients
              that draw on Corporate and Institutional Banking’s comprehensive suite of products.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold">Markets & Securities Services</h4>
            <p className="mb-2">
              Markets & Securities Services helps clients across HSBC global businesses to unlock
              investment and financing opportunities, access financial markets and liquidity,
              manage risk and transact across borders.
            </p>
            <p className="mb-2">
              Markets Korea is at the heart of industry development through product innovation and
              market advocacy in the Korean financial sector. Our knowledge of the local markets,
              coupled with HSBC’s global reach, enables us to provide a comprehensive and bespoke
              service across every major asset class for our Corporate and Institutional clients.
            </p>
            <p>
              Securities Services Korea is an industry leader in custody and trustee businesses
              facilitating both in-bound and out-bound international investment flows. We offer
              Treasury & Cash Management, Securities Lending, and Foreign Exchange aligned to our
              global, regional and domestic platforms.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold">Global Payments Solutions</h4>
            <p>
              HSBC GPS provides financial institutions and companies with a comprehensive suite of
              innovative solutions and products to help them do business every day. GPS helps
              clients to move their cash, have visibility and invest through HSBC’s proprietary
              systems, HSBCnet and HSBC Connect.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Global Trade Solutions</h4>
            <p>
              GTS Korea provides trade finance services to our clients throughout the trade cycle,
              from the tender process and issuance of payment orders to shipment and sales
              fulfilment. We offer products for working capital optimization, international trade
              growth, trade risk management, supplier finance management and sales finance
              management.
            </p>
          </div>
        </div>

        {/* SECURITIES Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">SECURITIES</h3>

          <div className="mb-4">
            <h4 className="text-lg font-semibold">Investment Banking</h4>
            <p>
              HSBC’s Global Banking – Capital Financing and Investment Banking Coverage in Korea
              provides clients with a variety of integrated funding and strategic solutions. Our
              capabilities span M&A advisory, equity capital markets and debt capital markets.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Markets</h4>
            <p>
              Markets offers cash equity, fixed income sales, securities brokerage services and
              market research for corporate and financial institution clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Korea3;
