"use client"

import { useState, FormEvent } from 'react';

interface FormData {
    namee: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        namee: '',
        email: '',
        subject: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/contact', {  // Changed to contact endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (res.ok) {
                alert('Contact form submitted successfully!');
                setFormData({
                    namee: '',
                    email: '',
                    subject: '',
                    message: '',
                });
            } else {
                alert('Error: ' + (result.message || 'Something went wrong'));
            }
        } catch (error) {
            alert('Something went wrong!');
            console.error(error);
        }

        setIsSubmitting(false);
    };
    
    return (
        <div className="bg-white text-gray-900">
            <h1 className="text-3xl font-bold text-center mb-6 bg-white py-4 px-6 shadow-md rounded-lg border-b-4 border-[#003366]">
                Contact Us
            </h1>
            <div className="px-4 md:px-20">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="namee" className="block text-xl font-medium text-gray-700">Name*</label>
                                <input
                                    type="text"
                                    id="namee"
                                    name="namee"
                                    value={formData.namee}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-[#003366] focus:ring-[#003366] focus:bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xl font-medium text-gray-700">Email*</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-[#003366] focus:ring-[#003366] focus:bg-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-xl font-medium text-gray-700">Subject*</label>
                            <input
                                type="text"  // Changed from "tel" to "text" since this is a subject field
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-[#003366] focus:ring-[#003366] focus:bg-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-xl font-medium text-gray-700">Message*</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={formData.message}
                                required
                                onChange={handleChange}
                                className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-[#003366] focus:ring-[#003366] focus:bg-white"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-[#003366] py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white hover:bg-[#FF9102] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Message'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}