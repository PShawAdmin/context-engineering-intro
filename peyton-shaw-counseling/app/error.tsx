'use client'

import { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {Button} from '@heroui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We&apos;re sorry, but something unexpected happened. Please try again or contact us if the problem persists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={reset}
                color="primary"
                size="lg"
              >
                Try Again
              </Button>
              <Button
                as={Link}
                href="/"
                variant="bordered"
                size="lg"
              >
                Go to Homepage
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}