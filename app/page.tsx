import { BirthDataForm } from '@/components/forms/BirthDataForm';
import { Logo } from '@/components/ui/Logo';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Logo & Header */}
        <div className="mb-12">
          <Logo />
        </div>

        {/* Form */}
        <BirthDataForm />

        {/* Footer */}
        <div className="mt-8 text-center text-white/60 text-sm">
          <p>Powered by Advanced AI Astrological Analysis</p>
        </div>
      </div>
    </div>
  );
}
