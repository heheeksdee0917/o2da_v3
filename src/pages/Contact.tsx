// src/pages/Contact.tsx
import { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import React from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const phone = '+603 6420 6345';
  const email = 'info@o2dacpla.com';
  const address = `No 9-1, Block A, Zenith Corporate Park, Jalan SS7/26, Kelana Jaya, 47301 Petaling Jaya, Selangor Darul Ehsan, Malaysia`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = `Contact Form: Message from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0A` +
                 `Phone: ${formData.phone || 'Not provided'}%0D%0A` +
                 `Email: ${formData.email}%0D%0A%0D%0A` +
                 `Message:%0D%0A${formData.message}`;
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <div data-theme="light" className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-8 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-6 uppercase tracking-wide">
            Get In Touch
          </h1>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our projects or want to discuss your next architectural vision, we're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-light mb-8 uppercase tracking-wide">
                Contact Information
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone size={24} className="text-black/40 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-black/40 mb-1">Phone</p>
                    <a 
                      href={`tel:${phone.replace(/\s/g, '')}`} 
                      className="text-lg hover:text-black/60 transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail size={24} className="text-black/40 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-black/40 mb-1">Email</p>
                    <a 
                      href={`mailto:${email}`} 
                      className="text-lg hover:text-black/60 transition-colors break-all"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin size={24} className="text-black/40 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-black/40 mb-1">Office</p>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg hover:text-black/60 transition-colors"
                    >
                      {address}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-8 border-t border-black/10">
              <p className="text-xs uppercase tracking-wide text-black/40 mb-4">Follow Us</p>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/o2DesignAtelier" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 border border-black/10 hover:border-black/30 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} strokeWidth={1.5} />
                </a>
                <a 
                  href="https://instagram.com/o2designatelier" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 border border-black/10 hover:border-black/30 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} strokeWidth={1.5} />
                </a>
                <a 
                  href="https://linkedin.com/company/o2da-cpla" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 border border-black/10 hover:border-black/30 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-light mb-8 uppercase tracking-wide">
              Send Us A Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wide text-black/40 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-wide text-black/40 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors"
                  placeholder="Your phone number"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-wide text-black/40 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs uppercase tracking-wide text-black/40 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-black text-white hover:bg-black/80 transition-colors uppercase tracking-wide text-sm font-medium"
              >
                Send Message
              </button>

              <p className="text-xs text-black/40 text-center">
                This will open your email client with the message pre-filled
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}