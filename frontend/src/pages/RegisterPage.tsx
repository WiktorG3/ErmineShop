import RegisterForm from "../components/RegisterForm"

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md">
                <div className="rounded-xl bg-white px-6 py-8 shadow-lg">
                    <div className="space-y-6">
                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
                        </div>
                        <RegisterForm />
                        <div className="space-y-4">
                            <p className="text-center text-sm text-gray-500">
                                By clicking "Sign up", you agree to our{" "}
                                <a href="/terms" className="text-blue-600 hover:text-blue-500">
                                    terms of service
                                </a>{" "}
                                and{" "}
                                <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                                    privacy policy
                                </a>
                                .
                            </p>
                            <p className="text-center text-sm text-gray-500">
                                Already have an account?{" "}
                                <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                    Log in
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

