import SignupForm from '@/components/form/SignupForm';
import Navbar from '@/components/layout/Navbar';

export default function Signup() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center px-4">
        <SignupForm />
      </div>
    </>
  );
}
