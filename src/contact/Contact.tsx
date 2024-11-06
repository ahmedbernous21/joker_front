import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

const schema = z.object({
  fullName: z.string().min(5, "Veuillez entrer votre nom complet"),
  email: z.string().email("Veuillez entrer une adresse e-mail valide"),
  phoneNumber: z
    .string()
    .regex(
      /^(?:\+?213|0)(?:5|6|7)(?:[0-9] ?){8}$/,
      "Veuillez entrer un numéro de téléphone valide",
    )
    .min(1, "Veuillez entrer votre numéro de téléphone"),
  message: z.string().min(1, "Veuillez entrer un message"),
});

type ContactFormData = z.infer<typeof schema>;

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log(data);
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f9f9f9]">
        <div className="mx-10 -mt-40 max-w-md text-center md:mx-auto">
          <h1 className="text-2xl font-bold">Votre message a été envoyé</h1>
          <p className="mb-10 mt-4 text-gray-500 md:mb-8">
            Merci de nous avoir contacté, nous vous répondrons bientôt !
          </p>
          <img
            src="msgSent.svg"
            alt="Message Sent"
            className="mx-auto mb-4 h-40 w-40"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-screen items-center justify-center bg-[#f9f9f9] px-4 py-8">
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-lg lg:flex-row">
        <div className="relative w-full space-y-8 bg-[#DB3F40] p-8 text-white lg:w-1/3 lg:space-y-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#DB3F40] to-[#c12d2d] opacity-90"></div>

          <div className="relative z-10">
            <h2 className="-mt-10 text-4xl font-bold tracking-wide">
              Get in Touch
            </h2>

            <div className="mt-6 space-y-2">
              <p className="text-lg font-semibold">Visit Us</p>
              <p className="text-md leading-relaxed">
                Come say hello at our office
              </p>
              <p className="text-lg font-semibold">Azzaba, Skikda, Algeria</p>
            </div>

            <div className="mt-8 space-y-2">
              <p className="text-lg font-semibold">Chat to Us</p>
              <p className="text-md leading-relaxed">
                Our friendly team is here to help you.
              </p>
            </div>

            <div className="mt-8 space-y-2">
              <p className="text-lg font-semibold">Call Us</p>
              <p className="text-md leading-relaxed">
                Saturday-Friday from 8am to 6pm
              </p>
              <p className="text-lg font-semibold">0697093606</p>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-6">
              <a
                href="#"
                aria-label="Facebook"
                className="transform text-[white] transition-transform hover:scale-110 hover:text-gray-200"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="transform text-white transition-transform hover:scale-110 hover:text-gray-200"
              >
                <FaInstagram size={28} />
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                className="transform text-white transition-transform hover:scale-110 hover:text-gray-200"
              >
                <FaSquareXTwitter size={28} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="transform text-white transition-transform hover:scale-110 hover:text-gray-200"
              >
                <FaLinkedin size={28} />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full p-8 lg:w-2/3">
          <h2 className="mb-6 text-3xl font-semibold">Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="mb-2 block text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Ahmed Benali"
                {...register("fullName")}
                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#DB3F40] ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="jokergraphics@gmail.com"
                {...register("email")}
                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#DB3F40] ${errors.email ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="mb-2 block text-gray-700">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                placeholder="0698459897"
                type="text"
                {...register("phoneNumber")}
                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#DB3F40] ${errors.phoneNumber ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                placeholder="Dites-nous en quoi nous pouvons vous aider..."
                {...register("message")}
                className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#DB3F40] ${errors.message ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="rounded-lg bg-[#09223A] px-6 py-2 text-white transition duration-300 hover:opacity-80"
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
