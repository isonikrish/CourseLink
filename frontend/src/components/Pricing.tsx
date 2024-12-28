import { IndianRupee } from "lucide-react";

function Pricing() {
  return (
    <div className="px-10 py-2">
      <h2 className="text-center text-4xl font-bold mb-6">Pricing</h2>
      <p className="text-center text-lg mb-10 max-w-3xl mx-auto">
        Whether you're just starting or looking to expand your offerings, our
        free plan gives you access to powerful tools to grow your tutoring or
        teaching career. No hidden fees, just great opportunities.
      </p>

      <div className="rounded-xl backdrop-blur-md lg:flex lg:flex-nowrap justify-center">
        <div className="w-full p-2 lg:max-w-md lg:flex-shrink-0 lg:py-6 lg:pr-6 mt-8">
          <div className="fancyGlass h-full rounded-xl py-10 text-center border border-base-300 sssssssssssssslg:flex lg:flex-col lg:justify-center lg:py-16">
            <div className="mx-auto max-w-xs px-8">
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight flex items-center">
                  <IndianRupee />0
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide ">
                  /month
                </span>
              </p>
              <a
                rel="noopener noreferrer"
                className="mt-8 flex flex-shrink-0 justify-center"

              >
                <button className="btn">
                  Get Started
                </button>
              </a>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Get started with our free plan, no credit card required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
