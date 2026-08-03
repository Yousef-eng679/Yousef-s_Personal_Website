'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Shield, Loader2, AlertCircle, CheckCircle2, Mail } from 'lucide-react';

function MagicLinkForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    if (searchParams.get('error') === 'unauthorized') {
      setError('Access Denied: Your email address is not authorized for administrative access.');
    }
  }, [searchParams]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Verify email against authorized admin profile
      const { data: profile } = await supabase.from('profile').select('email').single();
      const allowedEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || profile?.email;

      if (allowedEmail && email.trim().toLowerCase() !== allowedEmail.trim().toLowerCase()) {
        throw new Error('Access Denied: This email address is not registered as an administrator.');
      }

      // 2. Request Magic Link
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/ctrl-y0us3f`,
        },
      });

      if (authError) {
        throw authError;
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send login link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card max-w-md w-full p-8 rounded-3xl border border-white/10 bg-surface/80 backdrop-blur-md">
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="w-16 h-16 bg-accent-purple/20 rounded-2xl flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-accent-purple" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Secure Access</h1>
        <p className="text-slate-400 text-sm">Enter your authorized admin email to receive a magic sign-in link</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {isSubmitted ? (
        <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Check Your Inbox</h2>
          <p className="text-sm text-slate-300">
            We've sent a magic sign-in link to <span className="font-bold text-white">{email}</span>. Click the link in the email to log in.
          </p>
        </div>
      ) : (
        <form onSubmit={handleMagicLink} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-surface-low/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent text-white transition-all text-sm"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 mt-2 bg-accent-purple hover:bg-accent-purple/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending Link...
              </>
            ) : (
              'Send Magic Link'
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function MagicLinkLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-slate-400">Loading...</div>}>
        <MagicLinkForm />
      </Suspense>
    </div>
  );
}
