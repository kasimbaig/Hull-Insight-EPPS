import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Target, Zap, Rocket, TrendingUp, Database, Cpu, Globe2, ArrowRight, CheckCircle2, Award, Clock, MapPin, Phone, Mail, ExternalLink, Brain, Shield, Users, BarChart3, FileText, Settings, Navigation, Star, Sparkles, Ship, Compass, Waves, Anchor, CheckCircle, Play } from 'lucide-react';
import slide1 from '/assets/slide1.jpg';
import slide2 from '/assets/slide2.jpg';
import slide3 from '/assets/slide3.jpg';

const Landing = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setIsVisible(true);
    // Auto-rotate slides
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for active navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate('/');
  };

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
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
              <button 
                onClick={() => handleNavClick('home')}
                className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                  activeSection === 'home' 
                    ? 'text-white bg-gradient-to-r from-[#00809D] to-cyan-500 shadow-lg shadow-[#00809D]/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Target className={`w-4 h-4 transition-transform duration-300 ${
                    activeSection === 'home' ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span>Home</span>
                </span>
              </button>
              <button 
                onClick={() => handleNavClick('about')}
                className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                  activeSection === 'about' 
                    ? 'text-white bg-gradient-to-r from-[#00809D] to-cyan-500 shadow-lg shadow-[#00809D]/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Database className={`w-4 h-4 transition-transform duration-300 ${
                    activeSection === 'about' ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span>About</span>
                </span>
              </button>
              <button 
                onClick={() => handleNavClick('services')}
                className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                  activeSection === 'services' 
                    ? 'text-white bg-gradient-to-r from-[#00809D] to-cyan-500 shadow-lg shadow-[#00809D]/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Cpu className={`w-4 h-4 transition-transform duration-300 ${
                    activeSection === 'services' ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span>Services</span>
                </span>
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 group ${
                  activeSection === 'contact' 
                    ? 'text-white bg-gradient-to-r from-[#00809D] to-cyan-500 shadow-lg shadow-[#00809D]/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Globe2 className={`w-4 h-4 transition-transform duration-300 ${
                    activeSection === 'contact' ? 'scale-110' : 'group-hover:scale-110'
                  }`} />
                  <span>Contact</span>
                </span>
              </button>
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
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-[#00809D]/50 transition-all duration-300 group">
               
                <div className="text-2xl font-black text-white mb-2">500+</div>
                <div className="text-lg text-cyan-300 font-semibold">Active Vessels</div>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-[#00809D]/50 transition-all duration-300 group">
               
                <div className="text-2xl font-black text-white mb-2">24/7</div>
                <div className="text-lg text-cyan-300 font-semibold">AI Monitoring</div>
              </div>
              
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-[#00809D]/50 transition-all duration-300 group">
               
                <div className="text-2xl font-black text-white mb-2">99.9%</div>
                <div className="text-lg text-cyan-300 font-semibold">Precision Rate</div>
                </div>
              </div> */}
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


            </div>

            {/* Right Visual - Slide1 Image */}
            <div className="relative">
              <div className="relative group">
                {/* Decorative Border with Gradient */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#00809D] via-cyan-500 to-blue-600 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00809D] via-cyan-500 to-blue-600 rounded-xl opacity-40 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                {/* Main Image */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src={slide1} 
                    alt="Hull Insight" 
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
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
                <li><button onClick={() => handleNavClick('home')} className="text-gray-400 hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => handleNavClick('about')} className="text-gray-400 hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => handleNavClick('services')} className="text-gray-400 hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => handleNavClick('contact')} className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
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
                © 2025 Hull Insight. All rights reserved.
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