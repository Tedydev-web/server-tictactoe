import axios from 'axios';

// Types
interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RefreshTokenRequest {
    refreshToken: string;
}

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    // Add other response fields as needed
}

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://103.147.186.84:3000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

class AuthService {
    private baseUrl: string = '/auth';

    async login(data: LoginRequest): Promise<AuthResponse> {
        try {
            const response = await fetch('http://103.147.186.84:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return response.json();
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async register(data: RegisterRequest): Promise<AuthResponse> {
        try {
            const response = await fetch('http://103.147.186.84:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return response.json();
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
        try {
            const response = await fetch('http://103.147.186.84:3000/auth/refresh-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return response.json();
        } catch (error) {
            throw this.handleError(error);
        }
    }

    private handleError(error: any): Error {
        if (axios.isAxiosError(error)) {
            return new Error(error.response?.data?.message || 'An error occurred');
        }
        return error;
    }
}

// Export singleton instance
export const authService = new AuthService();
