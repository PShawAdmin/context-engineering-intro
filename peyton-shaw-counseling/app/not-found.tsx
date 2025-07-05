import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {Button} from '@heroui/button';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or no longer exists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                href="/"
                color="primary"
                size="lg"
              >
                Go to Homepage
              </Button>
              <Button
                as={Link}
                href="/contact"
                variant="bordered"
                size="lg"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}