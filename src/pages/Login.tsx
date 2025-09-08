import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Ship, Eye, EyeOff, Lock, User, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { loginUser } from '@/services/apiService';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    loginname: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.loginname.trim()) {
      newErrors.loginname = 'Login name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Prepare login payload
      const loginPayload = {
        loginname: formData.loginname,
        password: formData.password
      };

      console.log('Attempting login with:', loginPayload);

      // Call the login API
      const response = await loginUser(loginPayload);
      
      console.log('Login successful:', response.data);

      // Store remember me preference
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }

      // Extract user data from API response
      const userData = {
        id: response.data.user?.id || '1',
        username: response.data.user?.username || formData.loginname,
        email: response.data.user?.email || `${formData.loginname}@navy.mil`,
        firstName: response.data.user?.first_name || 'Naval',
        lastName: response.data.user?.last_name || 'Officer',
        role: response.data.user?.role || 'Administrator',
        permissions: response.data.user?.permissions || ['all']
      };

      // Update the stored auth data to include user information
      const updatedAuthData = {
        ...response.data,
        user: userData
      };
      localStorage.setItem('authData', JSON.stringify(updatedAuthData));

      // Update auth context
      login(userData);

      // Navigate to dashboard
      navigate('/dashboards');
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle login error
      const errorMessage = error.response?.data?.message || 
      error.response?.data?.detail || 
      error.message || 
      'Login failed. Please check your credentials.';
      
      setErrors({
        general: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00809D]/10 via-white to-[#00809D]/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[#00809D]">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#00809D] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#00809D] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#00809D] rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00809D] to-[#00809D]/70 bg-clip-text text-transparent mb-3">
            Hull Insight
          </h1>
          <p className="text-gray-600 text-lg font-medium">Naval Management System</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 rounded-2xl overflow-hidden backdrop-blur-sm bg-white/95">
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Error Message */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-sm font-medium shadow-sm">
                  {errors.general}
                </div>
              )}

              {/* Login Name Field */}
              <div className="space-y-2">
                <label htmlFor="loginname" className="block text-sm font-medium text-gray-700">
                  Login Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400 group-focus-within:text-[#00809D] transition-colors duration-200" />
                  </div>
                  <InputText
                    id="loginname"
                    value={formData.loginname}
                    onChange={(e) => handleInputChange('loginname', e.target.value)}
                    placeholder="Enter your login name"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg transition-all duration-200 ${
                      errors.loginname 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-[#00809D] focus:ring-2 focus:ring-[#00809D]/10 hover:border-gray-300'
                    }`}
                    disabled={loading}
                  />
                </div>
                {errors.loginname && (
                  <p className="text-red-600 text-sm">{errors.loginname}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-[#00809D] transition-colors duration-200" />
                  </div>
                  <InputText
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg transition-all duration-200 ${
                      errors.password 
                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100' 
                        : 'border-gray-200 focus:border-[#00809D] focus:ring-2 focus:ring-[#00809D]/10 hover:border-gray-300'
                    }`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#00809D] transition-colors duration-200"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                label={loading ? 'Signing in...' : 'Sign In'}
                loading={loading}
                className="w-full bg-[#00809D] hover:bg-[#00809D]/90 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading}
              />
            </form>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 Hull Insight. All rights reserved.
          </p>
        </div>

        <Toast />
      </div>
    </div>
  );
}
