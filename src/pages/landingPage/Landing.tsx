import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Target, Zap, Rocket, TrendingUp, Database, Cpu, Globe2, ArrowRight, CheckCircle2, Award, Clock, MapPin, Phone, Mail, ExternalLink, Brain, Shield, Users, BarChart3, FileText, Settings, Navigation, Star, Sparkles, Ship, Compass, Waves, Anchor } from 'lucide-react';
import slide1 from '/assets/slide1.jpg';
import slide2 from '/assets/slide2.jpg';
import slide3 from '/assets/slide3.jpg';

const Landing = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    // Auto-rotate slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const slides = [
    {
      title: "WELCOME TO HULL INSIGHT",
      description: "FASTER RENDERING OF RETURNS/ REPORTS AND DEFECTS BY SHIPS AND REFITTING AGENCIES. FACILITATE STATISTICAL ANALYSIS HITUS, COMMANDS AND NHQ.",
      image: slide1
    },
    {
      title: "WELCOME TO HULL INSIGHT",
      description: "FASTER RENDERING OF RETURNS/ REPORTS AND DEFECTS BY SHIPS AND REFITTING AGENCIES. FACILITATE STATISTICAL ANALYSIS HITUS, COMMANDS AND NHQ.",
      image: slide2
    },
    {
      title: "WELCOME TO HULL INSIGHT",
      description: "FASTER RENDERING OF RETURNS/ REPORTS AND DEFECTS BY SHIPS AND REFITTING AGENCIES. FACILITATE STATISTICAL ANALYSIS HITUS, COMMANDS AND NHQ.",
      image: slide3
    }
  ];

  const services = [
    { title: "AI Intelligence", icon: <Brain className="w-8 h-8" /> },
    { title: "Quantum Analytics", icon: <Cpu className="w-8 h-8" /> },
    { title: "Neural Networks", icon: <Database className="w-8 h-8" /> },
    { title: "Smart Systems", icon: <Zap className="w-8 h-8" /> },
    { title: "Advanced Security", icon: <Shield className="w-8 h-8" /> },
    { title: "Global Operations", icon: <Globe2 className="w-8 h-8" /> }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Futuristic Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 backdrop-blur-xl border-b border-[#00809D]/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-[#00809D] via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-[#00809D]/50 transition-all duration-300 group-hover:scale-110">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#00809D]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-2xl font-black text-white tracking-wide">HULL INSIGHT</h1>
                <p className="text-sm text-cyan-300 font-medium">Advanced Naval Intelligence Platform</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              <a href="#home" className="px-6 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group">
                <span className="flex items-center space-x-2">
                  <Target className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Home</span>
                </span>
              </a>
              <a href="#about" className="px-6 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group">
                <span className="flex items-center space-x-2">
                  <Database className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>About</span>
                </span>
              </a>
              <a href="#services" className="px-6 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group">
                <span className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Services</span>
                </span>
              </a>
              <a href="#contact" className="px-6 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group">
                <span className="flex items-center space-x-2">
                  <Globe2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span>Contact</span>
                </span>
              </a>
            </nav>

            {/* Login Button */}
            <Button 
              onClick={handleLoginClick}
              className="bg-gradient-to-r from-[#00809D] via-cyan-500 to-blue-600 hover:from-[#00809D]/90 hover:via-cyan-400 hover:to-blue-500 text-white px-8 py-3 rounded-2xl font-bold shadow-2xl hover:shadow-[#00809D]/50 transition-all duration-300 transform hover:scale-105 group"
            >
              <span className="flex items-center space-x-3">
                <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Access Portal</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Futuristic Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
            >
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-gray-900/60 to-black/80" />
            </div>
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#00809D]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Status Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#00809D]/20 to-cyan-500/20 backdrop-blur-xl border border-[#00809D]/30 text-white text-sm font-bold mb-8 group">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 animate-pulse group-hover:scale-125 transition-transform duration-300"></div>
              <Cpu className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Advanced Naval Intelligence Platform
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                {slides[currentSlide].title}
              </span>
            </h1>

            {/* Description */}
            <p className="text-2xl md:text-3xl text-gray-300 mb-16 leading-relaxed max-w-4xl mx-auto font-light">
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Button 
                onClick={handleLoginClick}
                className="bg-gradient-to-r from-[#00809D] via-cyan-500 to-blue-600 hover:from-[#00809D]/90 hover:via-cyan-400 hover:to-blue-500 text-white px-10 py-5 text-xl rounded-3xl shadow-2xl hover:shadow-[#00809D]/50 transition-all duration-300 transform hover:scale-110 font-bold group"
              >
                <span className="flex items-center space-x-3">
                  <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Access Intelligence Portal</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
            </div>

            {/* Advanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-[#00809D]/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00809D] to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">500+</div>
                <div className="text-lg text-cyan-300 font-semibold">Active Vessels</div>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-[#00809D]/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00809D] to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">24/7</div>
                <div className="text-lg text-cyan-300 font-semibold">AI Monitoring</div>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-[#00809D]/50 transition-all duration-300 group">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00809D] to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">99.9%</div>
                <div className="text-lg text-cyan-300 font-semibold">Precision Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-gradient-to-r from-[#00809D] to-cyan-500 scale-125 shadow-lg shadow-[#00809D]/50' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 right-12 hidden lg:block">
          <div className="flex flex-col items-center space-y-3 text-white/60 group cursor-pointer">
            <span className="text-sm font-semibold group-hover:text-white transition-colors duration-300">Explore</span>
            <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center group-hover:border-[#00809D] transition-colors duration-300">
              <div className="w-2 h-4 bg-gradient-to-b from-[#00809D] to-cyan-500 rounded-full mt-2 animate-bounce group-hover:from-cyan-500 group-hover:to-[#00809D] transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Futuristic Features Section */}
      <section className="py-32 bg-gradient-to-b from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00809D]/5 via-transparent to-cyan-500/5"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#00809D]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#00809D]/20 to-cyan-500/20 backdrop-blur-xl border border-[#00809D]/30 text-white text-sm font-bold mb-8 group">
              <Cpu className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Advanced Capabilities
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
              Next-Generation Naval
              <span className="block bg-gradient-to-r from-[#00809D] via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Intelligence Systems
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
              Revolutionary AI-powered solutions designed to transform naval operations and enhance fleet management efficiency through cutting-edge technology
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-[#00809D]/20 transition-all duration-500 hover:-translate-y-4 border border-white/20 hover:border-[#00809D]/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00809D]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00809D] via-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-black text-white mb-6 group-hover:text-cyan-300 transition-colors duration-300">
                  AI-Powered Analytics
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                  Advanced machine learning algorithms provide comprehensive hull maintenance planning with predictive modeling and real-time intelligence for optimal vessel performance.
                </p>
                
                <div className="flex items-center text-cyan-400 font-bold text-lg group-hover:translate-x-3 transition-transform duration-300">
                  <span>Explore Technology</span>
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:scale-125 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-[#00809D]/20 transition-all duration-500 hover:-translate-y-4 border border-white/20 hover:border-[#00809D]/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00809D]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00809D] via-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-black text-white mb-6 group-hover:text-cyan-300 transition-colors duration-300">
                  Quantum Processing
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                  Revolutionary quantum computing solutions including AI-powered defect detection, automated reporting systems, and real-time monitoring capabilities for naval operations.
                </p>
                
                <div className="flex items-center text-cyan-400 font-bold text-lg group-hover:translate-x-3 transition-transform duration-300">
                  <span>Discover Innovation</span>
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:scale-125 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-[#00809D]/20 transition-all duration-500 hover:-translate-y-4 border border-white/20 hover:border-[#00809D]/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00809D]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#00809D] via-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                  <Database className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-black text-white mb-6 group-hover:text-cyan-300 transition-colors duration-300">
                  Neural Networks
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                  Advanced neural network systems with comprehensive tracking, resource allocation, and milestone management for efficient naval maintenance operations.
                </p>
                
                <div className="flex items-center text-cyan-400 font-bold text-lg group-hover:translate-x-3 transition-transform duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:scale-125 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300809D' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Section Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#00809D]/20 to-cyan-500/20 backdrop-blur-xl border border-[#00809D]/30 text-[#00809D] text-sm font-bold">
                <Database className="w-4 h-4 mr-2" />
                Platform Intelligence
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Revolutionary Naval
                <span className="block text-[#00809D]">Management System</span>
              </h2>

              {/* Description */}
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Hull Insight is an <span className="font-semibold text-[#00809D]">integrative software tool</span> aimed at effective life cycle management and paperless return and reports. The application ensures easy availability of all routine returns rendered by ship staff and survey rendered by repair yards across all stakeholders over the Naval Unified Domain.
                </p>
                
                <p>
                  Further, the <span className="font-semibold text-[#00809D]">single repository concept</span> envisaged is aimed at ensuring an institutional memory for informed decision making. At DNA, we solicit constructive feedback and suggestions to further enhance the applicability of the portal towards reliable life cycle management of Hull and associated systems.
                </p>
              </div>

              {/* Feature List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "AI Life Cycle Management", icon: <Brain className="w-4 h-4" /> },
                  { name: "Digital Intelligence Reports", icon: <Cpu className="w-4 h-4" /> },
                  { name: "Quantum Unified Domain", icon: <Database className="w-4 h-4" /> },
                  { name: "Neural Memory Systems", icon: <Zap className="w-4 h-4" /> }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#00809D]/20 transition-colors duration-300 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#00809D]/10 to-cyan-500/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-[#00809D] transition-colors duration-300">{feature.name}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleLoginClick}
                  className="bg-gradient-to-r from-[#00809D] via-cyan-500 to-blue-600 hover:from-[#00809D]/90 hover:via-cyan-400 hover:to-blue-500 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group font-semibold"
                >
                  <span className="flex items-center space-x-2">
                    <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Launch Portal</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
                
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-[#00809D] via-cyan-500 to-blue-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">AI Intelligence</h3>
                  <p className="text-white/80 text-sm">Advanced Naval Management System</p>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00809D]/10 to-cyan-500/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#00809D]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">AI Vessels</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00809D]/10 to-cyan-500/10 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-[#00809D]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600">AI Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Services Section */}
      <section id="services" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00809D]/5 via-transparent to-[#00809D]/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#00809D]/10 text-[#00809D] text-sm font-medium mb-6">
              <Settings className="w-4 h-4 mr-2" />
              Our Services
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Naval
              <span className="block text-[#00809D]">Management Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology solutions designed to streamline naval operations and enhance fleet management efficiency
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-gray-100"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-[#00809D] to-[#00809D]/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                      {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#00809D] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Comprehensive naval vessel management with advanced tracking systems, maintenance scheduling, and operational analytics for enhanced fleet efficiency.
                  </p>
                  
                  {/* Action Link */}
                  <div className="flex items-center text-[#00809D] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00809D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-[#00809D] to-[#00809D]/90 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-50">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='white' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Naval Operations?
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join hundreds of naval organizations already using Hull Insight to streamline their operations and enhance efficiency.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleLoginClick}
                  className="bg-white text-[#00809D] hover:bg-gray-50 px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group font-semibold"
                >
                  <span className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Get Started Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#00809D]/20 to-cyan-500/20 backdrop-blur-xl border border-[#00809D]/30 text-[#00809D] text-sm font-bold mb-6">
              <Globe2 className="w-4 h-4 mr-2" />
              Connect with Intelligence
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
              <span className="block text-[#00809D]">Contact Our Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about Hull Insight? Our team is here to help you get the most out of our naval management platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00809D]/10 to-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-[#00809D]" />
                    </div>
            <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Office Address</h4>
                      <p className="text-gray-600">Directorate of Naval Architecture</p>
                    <p className="text-gray-600">Room No 200, Talkatora Stadium Annexe</p>
                    <p className="text-gray-600">New Delhi - 110 004</p>
                  </div>
                </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00809D]/10 to-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-[#00809D]" />
                    </div>
                  <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600">NHQ-DNA-HULLINSIGHT</p>
                    <p className="text-gray-600">PAX: 6063, 6099</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00809D]/10 to-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Cpu className="w-6 h-6 text-[#00809D]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <Button 
                        variant="outline" 
                        className="text-[#00809D] border-[#00809D] hover:bg-[#00809D] hover:text-white rounded-xl px-6 py-2"
                      >
                        Send Email
                  </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats & Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#00809D] to-[#00809D]/90 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Platform Statistics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-sm text-white/80">Active Vessels</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-sm text-white/80">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">99.9%</div>
                    <div className="text-sm text-white/80">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">71K+</div>
                    <div className="text-sm text-white/80">Visitors</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Button 
                    onClick={handleLoginClick}
                    className="w-full bg-[#00809D] hover:bg-[#00809D]/90 text-white rounded-xl py-3 font-semibold"
                  >
                    Access Hull Insight
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-[#00809D] text-[#00809D] hover:bg-[#00809D] hover:text-white rounded-xl py-3 font-semibold"
                  >
                    Download Documentation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00809D] via-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">HULL INSIGHT</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Advanced naval management system designed to streamline operations and enhance fleet management efficiency for the Indian Navy.
              </p>
              <div className="flex space-x-4">
                <Button 
                  onClick={handleLoginClick}
                  className="bg-[#00809D] hover:bg-[#00809D]/90 text-white rounded-xl px-6 py-2"
                >
                  Login
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 rounded-xl px-6 py-2"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>Directorate of Naval Architecture</p>
                <p>New Delhi - 110 004</p>
                <p>PAX: 6063, 6099</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Hull Insight.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Last Updated: 08/09/2025</span>
                <span>•</span>
                <span>Visitors: 50,298</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;