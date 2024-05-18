/**
 * v0 by Vercel.
 * @see https://v0.dev/t/XhNYwJIUqC2
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button';

export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-md space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple Pricing
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get started with our simple pricing. No hidden fees.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">6 months</h3>
                <p className="text-gray-500">
                  Advertise your opportunity across multiple sites
                </p>
              </div>
              <div className="flex items-baseline justify-center space-x-2">
                <span className="text-4xl font-bold">$10</span>
                <span className="text-gray-500">/position</span>
              </div>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}