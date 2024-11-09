"use client"
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function VerifyEmail() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState<string>('Verifying your email...');
    const searchParams = useSearchParams();

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');

            if (!token) {
                setStatus('error');
                setMessage('Verification token is missing');
                return;
            }

            try {
                const response = await fetch(`api/auth/verify-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();
                console.log("Verify email ressssss",data)
                if (data.success !== true) {
                    throw new Error(data.error.message || 'Verification failed');
                }

                setStatus('success');
                setMessage('Email verified successfully! You can now login to your account.');
            } catch (error) {
                setStatus('error');
                setMessage(error instanceof Error ? error.message : 'Email verification failed');
            }
        };

        verifyEmail();
    }, [searchParams]);

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Email Verification</h1>
                <div className={`text-center ${
                    status === 'error' ? 'text-red-600' :
                    status === 'success' ? 'text-green-600' :
                    'text-gray-600'
                }`}>
                    {message}
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmail />
      </Suspense>
    );
  }