import React, { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SecondaryButton from "@/Components/SecondaryButton";
import Github from "@/Components/Icons/Github";
import Google from "@/Components/Icons/Google";
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';

export default function Login({ status, canResetPassword, google_client_id, google_redirect_url }:
{
    status?: string,
    canResetPassword: boolean,
    google_client_id: string,
    google_redirect_url: string
}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in"/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className="flex flex-col gap-4">
                <SecondaryButton onClick={() => {
                    location.href = route('social-login.redirect', 'github')
                }} className="flex justify-center" disabled={processing}>
                    <Github width={100} className="h-4 w-4"/> &nbsp; Login with GitHub
                </SecondaryButton>
                <SecondaryButton onClick={() => {
                    location.href = route('social-login.redirect', 'google')
                }} className="flex justify-center" disabled={processing}>
                    <Google width={100} className="h-4 w-4"/> &nbsp; Login with Google
                </SecondaryButton>
            </div>
        </GuestLayout>
    );
}
