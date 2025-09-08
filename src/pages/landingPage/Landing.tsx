import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Anchor, Waves, Ship, Compass, Users, BarChart3, FileText, Settings, Navigation, Star, Zap, Sparkles, ArrowRight, CheckCircle, Award, Clock, Globe, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
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
    { title: "Navy", icon: <Ship className="w-8 h-8" /> },
    { title: "Navy", icon: <Anchor className="w-8 h-8" /> },
    { title: "Navy", icon: <Compass className="w-8 h-8" /> },
    { title: "Navy", icon: <Waves className="w-8 h-8" /> },
    { title: "Navy", icon: <Shield className="w-8 h-8" /> },
    { title: "Navy", icon: <Navigation className="w-8 h-8" /> }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00809D] to-[#00809D]/80 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HULL INSIGHT</h1>
                <p className="text-xs text-gray-500 font-medium">Naval Management System</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <a href="#home" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#00809D] hover:bg-gray-50 rounded-lg transition-all duration-200">Home</a>
              <a href="#about" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#00809D] hover:bg-gray-50 rounded-lg transition-all duration-200">About</a>
              <a href="#services" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#00809D] hover:bg-gray-50 rounded-lg transition-all duration-200">Services</a>
              <a href="#contact" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#00809D] hover:bg-gray-50 rounded-lg transition-all duration-200">Contact</a>
            </nav>

            {/* Login Button */}
            <Button 
              onClick={handleLoginClick}
              className="bg-gradient-to-r from-[#00809D] to-[#00809D]/90 hover:from-[#00809D]/90 hover:to-[#00809D]/80 text-white px-6 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <span>Login</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Parallax Effect */}
        <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Naval Excellence Platform
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                {slides[currentSlide].title}
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
              {slides[currentSlide].description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    onClick={handleLoginClick}
                className="bg-gradient-to-r from-[#00809D] to-[#00809D]/90 hover:from-[#00809D]/90 hover:to-[#00809D]/80 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                <span className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Access System</span>
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
                </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-gray-300">Vessels Managed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-300">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-gray-300">Uptime</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <div className="flex flex-col items-center space-y-2 text-white/60">
            <span className="text-xs font-medium">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#00809D]/10 text-[#00809D] text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Core Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Naval Management
              <span className="block text-[#00809D]">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions designed to streamline naval operations and enhance fleet management efficiency
            </p>
        </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00809D]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00809D] to-[#00809D]/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#00809D] transition-colors duration-300">
                  Design Approach
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our systematic approach ensures comprehensive hull maintenance planning with integrated data analytics and predictive modeling for optimal vessel performance.
                </p>
                
                <div className="flex items-center text-[#00809D] font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
                </div>
              </div>

            {/* Feature 2 */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00809D]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00809D] to-[#00809D]/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#00809D] transition-colors duration-300">
                  Innovative Solutions
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  Cutting-edge technology solutions including AI-powered defect detection, automated reporting systems, and real-time monitoring capabilities for naval operations.
                </p>
                
                <div className="flex items-center text-[#00809D] font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                    </div>
                  </div>

            {/* Feature 3 */}
            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00809D]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00809D] to-[#00809D]/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#00809D] transition-colors duration-300">
                  Project Management
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  Streamlined project workflows with comprehensive tracking, resource allocation, and milestone management for efficient naval maintenance operations.
                </p>
                
                <div className="flex items-center text-[#00809D] font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
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
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#00809D]/10 text-[#00809D] text-sm font-medium">
                <FileText className="w-4 h-4 mr-2" />
                About Our Platform
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
                  "Life Cycle Management",
                  "Paperless Reports", 
                  "Unified Domain",
                  "Institutional Memory"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#00809D]/20 transition-colors duration-300">
                    <div className="w-8 h-8 bg-[#00809D]/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-[#00809D]" />
                </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleLoginClick}
                  className="bg-gradient-to-r from-[#00809D] to-[#00809D]/90 hover:from-[#00809D]/90 hover:to-[#00809D]/80 text-white px-8 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group font-semibold"
                >
                  <span className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
                
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-[#00809D] to-[#00809D]/80 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Ship className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Naval Excellence</h3>
                  <p className="text-white/80 text-sm">Advanced Hull Management System</p>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#00809D]/10 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-[#00809D]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Vessels</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#00809D]/10 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#00809D]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#00809D]/10 text-[#00809D] text-sm font-medium mb-6">
              <Phone className="w-4 h-4 mr-2" />
              Get in Touch
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
                    <div className="w-12 h-12 bg-[#00809D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#00809D]" />
                    </div>
            <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Office Address</h4>
                      <p className="text-gray-600">Directorate of Naval Architecture</p>
                    <p className="text-gray-600">Room No 200, Talkatora Stadium Annexe</p>
                    <p className="text-gray-600">New Delhi - 110 004</p>
                  </div>
                </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#00809D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#00809D]" />
                    </div>
                  <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                      <p className="text-gray-600">NHQ-DNA-HULLINSIGHT</p>
                    <p className="text-gray-600">PAX: 6063, 6099</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#00809D]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#00809D]" />
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
                <div className="w-10 h-10 bg-[#00809D] rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
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
                © 2025 Hull Insight. All Rights Reserved with BISAG-N. Developed and maintained by BISAG-N & Ilizien.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>Last Updated: 06/09/2025</span>
                <span>•</span>
                <span>Visitors: 71,298</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;