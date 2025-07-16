'use client';

import Link from 'next/link';

export default function HomeHero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-400 text-white px-4 py-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
         Society Management
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-8 text-indigo-100">
        Manage your residential community with ease – from tenant approvals to flat assignments, all in one place.
      </p>
      <Link href="/signup">
        <span className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-indigo-100 transition">
          Get Started
        </span>
      </Link>

      <div className="mt-12">
        <img
          src="/home.gif"
          alt="Society illustration"
          className="w-full max-w-md"
        />
      </div>
    </section>
  );
}
