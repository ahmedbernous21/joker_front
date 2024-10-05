import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

const schema = z.object({
  fullName: z.string().min(5, 'Veuillez entrer votre nom complet'),
  email: z.string().email('Veuillez entrer une adresse e-mail valide'),
  phoneNumber: z.string()
  .regex(
    /^(?:\+?213|0)(?:5|6|7)(?:[0-9] ?){8}$/,
    "Veuillez entrer un numéro de téléphone valide"
  ) 
  .min(1, "Veuillez entrer votre numéro de téléphone"),
  message: z.string().min(1, 'Veuillez entrer un message')
});

type ContactFormData = z.infer<typeof schema>;

const ContactForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(schema)
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log(data);
    setFormSubmitted(true); 
  };

  if (formSubmitted) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f9f9f9]">
        <div className="text-center max-w-md mx-10 md:mx-auto -mt-40">
          
          <h1 className="text-2xl font-bold">Votre message a été envoyé</h1>
          <p className="text-gray-500 mt-4 mb-10 md:mb-8">Merci de nous avoir contacté, nous vous répondrons bientôt !</p>
          <img src='msgSent.svg' alt="Message Sent" className="mx-auto mb-4 w-40 h-40" />

        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full min-h-screen bg-[#f9f9f9] py-8 px-4">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-5xl">
        
<div className="w-full lg:w-1/3 bg-[#DB3F40] text-white p-8 space-y-8 lg:space-y-10 relative">
  
  <div className="absolute inset-0 bg-gradient-to-b from-[#DB3F40] to-[#c12d2d] opacity-90"></div>
  
  <div className="relative z-10">
    
    <h2 className="text-4xl font-bold tracking-wide -mt-10">Get in Touch</h2>
    
    <div className="mt-6 space-y-2">
      <p className="text-lg font-semibold">Visit Us</p>
      <p className="text-md leading-relaxed">Come say hello at our office</p>
      <p className="text-lg font-semibold">Bouira, Algerie, AN 2039</p>
    </div>

    <div className="mt-8 space-y-2">
      <p className="text-lg font-semibold">Chat to Us</p>
      <p className="text-md leading-relaxed">Our friendly team is here to help you.</p>
    </div>

    <div className="mt-8 space-y-2">
      <p className="text-lg font-semibold">Call Us</p>
      <p className="text-md leading-relaxed">Mon-Fri from 8am to 5pm</p>
      <p className="text-lg font-semibold">0597934897</p>
    </div>

    <div className="flex space-x-6 mt-12 items-center justify-center">
      <a href="#" aria-label="Facebook" className="text-[white] hover:text-gray-200 transition-transform transform hover:scale-110">
        <FaFacebook size={28} />
      </a>
      <a href="#" aria-label="Instagram" className="text-white hover:text-gray-200 transition-transform transform hover:scale-110">
        <FaInstagram size={28} />
      </a>
      <a href="#" aria-label="X (Twitter)" className="text-white hover:text-gray-200 transition-transform transform hover:scale-110">
        <FaSquareXTwitter size={28} />
      </a>
      <a href="#" aria-label="LinkedIn" className="text-white hover:text-gray-200 transition-transform transform hover:scale-110">
        <FaLinkedin size={28} />
      </a>
    </div>

  </div>
</div>


        <div className="w-full lg:w-2/3 p-8">
          <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder='Ahmed Benali'
                {...register('fullName')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB3F40] ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                id="email"
                type="email"
                placeholder='jokergraphics@gmail.com'
                {...register('email')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB3F40] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">Phone Number</label>
              <input
                id="phoneNumber"
                placeholder='0698459897'
                type="text"
                {...register('phoneNumber')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB3F40] ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                placeholder='Dites-nous en quoi nous pouvons vous aider...'
                {...register('message')}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DB3F40] ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              className="bg-[#09223A] text-white py-2 px-6 rounded-lg hover:opacity-80 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
