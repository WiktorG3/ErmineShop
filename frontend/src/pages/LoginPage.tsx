import LoginForm from "../components/LoginForm"

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-md">
                <div className="rounded-xl bg-white px-6 py-8 shadow-lg">
                    <div className="space-y-6">
                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold text-gray-900">Log in to your account</h1>
                        </div>
                        <LoginForm />
                        <p className="text-center text-sm text-gray-500">
                            Don't have an account?{" "}
                            <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

