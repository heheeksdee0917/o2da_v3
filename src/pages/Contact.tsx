// src/pages/Contact.tsx
import { useState } from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import React from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const email = 'info@o2dacpla.com';

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
    <div data-theme="light" className="min-h-screen bg-white">
      <div className="max-w-[2340px] mx-auto px-4 md:px-8 pt-32 pb-32">

        {/* Header */}
        <div className="mb-24">
          <h1 className="text-5xl font-light tracking-wide text-black/90 mb-4">Get In Touch</h1>
          <p className="text-base font-light text-black/80 leading-relaxed">
            We'd love to hear from you. Whether you have a question about our projects or want to discuss your next architectural vision, we're here to help.
          </p>
        </div>

        {/* 2-column layout */}
        <div className="flex flex-col md:flex-row md:gap-12">

          {/* Left — 20% */}
          <div className="md:w-[20%] shrink-0 mb-12 md:mb-0">
            <p className="text-sm font-light text-black/60 uppercase tracking-wide mb-2">Email</p>
            <a
              href={`mailto:${email}`}
              className="text-base font-light text-black hover:text-black/60 transition-colors block mb-8"
            >
              {email}
            </a>

            <p className="text-sm font-light text-black/60 uppercase tracking-wide mb-4">Follow Us</p>
            <div className="flex flex-col gap-4">
              <a
                href="https://www.facebook.com/o2DesignAtelier"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black/60 hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} strokeWidth={1.5} />
                <span className="text-sm font-light">Facebook</span>
              </a>
              <a
                href="https://instagram.com/o2designatelier"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black/60 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} strokeWidth={1.5} />
                <span className="text-sm font-light">Instagram</span>
              </a>
              <a
                href="https://linkedin.com/company/o2da-cpla"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black/60 hover:text-black transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} strokeWidth={1.5} />
                <span className="text-sm font-light">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right — 80% */}
          <div className="md:w-[80%] min-w-0">
            <form onSubmit={handleSubmit} className="space-y-0">

              {/* Name */}
              <div className="py-6 border-b border-black/5">
                <label htmlFor="name" className="block text-xs font-light uppercase tracking-wide text-black/60 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-xl font-light text-black placeholder:text-black/60 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              {/* Phone */}
              <div className="py-6 border-b border-black/5">
                <label htmlFor="phone" className="block text-xs font-light uppercase tracking-wide text-black/60 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent text-xl font-light text-black placeholder:text-black/60 focus:outline-none"
                  placeholder="Your phone number"
                />
              </div>

              {/* Email */}
              <div className="py-6 border-b border-black/5">
                <label htmlFor="email" className="block text-xs font-light uppercase tracking-wide text-black/60 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-xl font-light text-black placeholder:text-black/60 focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message */}
              <div className="py-6 border-b border-black/5">
                <label htmlFor="message" className="block text-xs font-light uppercase tracking-wide text-black/60 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-transparent text-xl font-light text-black placeholder:text-black/60 focus:outline-none resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit */}
              <div className="pt-8 flex items-center gap-6">
                <button
                  type="submit"
                  className="py-3 px-8 bg-black text-white text-sm font-light uppercase tracking-wide hover:bg-black/80 transition-colors"
                >
                  Send Message
                </button>
                <p className="text-xs font-light text-black/30">
                  This will open your email client with the message pre-filled
                </p>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}