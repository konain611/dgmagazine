"use client"

import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  companyName: string;
  interests: string[];
  comments: string;
}

export default function AdvertisePage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    companyName: '',
    interests: [],
    comments: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestOptions = [
    'DG Magazine',
    'DG Cloud',
    'DG Academy'
  ];

  // Reuse the same handleChange and handleSubmit logic
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (name === 'interests' && type === 'checkbox') {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          interests: [...prev.interests, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          interests: prev.interests.filter((i) => i !== value),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/advertise', {  // Changed endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert('Advertise form submitted successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          streetAddress: '',
          city: '',
          state: '',
          zipCode: '',
          companyName: '',
          interests: [],
          comments: '',
        });
      } else {
        alert('Error: ' + result.message);
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
                Advertise With Us
            </h1>
            <div className="px-4 md:px-20">
                <h2 className="text-2xl font-bold mb-4 text-center">WE CAN HELP YOU STAND OUT IN A CROWD</h2>

                <p className="mb-4">
                    Right from inception, DG Magazine has made a mark for itself in the cybersecurity world. With its fourth volume in print, the magazine has already penetrated the market and invites rave reviews from all quarters. The printed version reaches several people in key positions: business leaders, CISOs, government functionaries, decision makers and educationists.
                </p>

                <p className="mb-4">
                    With that advantage on our side, we can connect you to highly educated professionals who influence decisions at all the right places. If you advertise your products or service through our magazine, you will get results. Positive results.
                </p>

                <p className="mb-4">
                    For advertisers, it is a comforting thought that our audience come from different backgrounds and they have different reasons to read our magazine. But a few things are common to all of them. They have a spirit to acquire knowledge and they want to experience the world of cybersecurity. Above all, they want to know what impact do cyber attacks have on our lives and how we can combat the workings of hackers.
                </p>

                <p className="mb-4">
                    To help you reach our audience, DG Magazine has plans that can move your products on an upward curve. We offer versatile options ranging from sponsored content to targeted banners and much more.
                </p>

                <p className="mb-4">
                    Contact us on <span className="font-medium">dgmagazine.diginfo.net</span> to place your promotional material on the right path.
                </p>

                <div className="p-6 bg-white rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-xl font-medium text-gray-700">First Name*</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-[#003366] focus:ring-[#003366] focus:bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-xl font-medium text-gray-700">Last Name*</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-[#003366] focus:ring-[#003366] focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="phone" className="block text-xl font-medium text-gray-700">Phone Number*</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
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
                            <label htmlFor="streetAddress" className="block text-xl font-medium text-gray-700">Street Address</label>
                            <input
                                type="text"
                                id="streetAddress"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleChange}
                                className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-[#003366] focus:ring-[#003366] focus:bg-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-xl font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-[#003366] focus:ring-[#003366] focus:bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-xl font-medium text-gray-700">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-[#003366] focus:ring-[#003366] focus:bg-white"
                                />
                            </div>

                            <div>
                                <label htmlFor="zipCode" className="block text-xl font-medium text-gray-700">ZIP Code</label>
                                <input
                                    type="text"
                                    id="zipCode"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-[#003366] focus:ring-[#003366] focus:bg-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="companyName" className="block text-xl font-medium text-gray-700">Company Name</label>
                            <input
                                type="text"
                                id="companyName"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="mt-1 p-3 block w-full rounded-md border-2 border-gray-300 bg-gray-50 shadow-sm focus:border-[#003366] focus:ring-[#003366] focus:bg-white"
                            />
                        </div>

                        <div className="my-10">
                            <p className="block text-xl font-medium text-gray-700 mb-2">Interests (Select all that apply)</p>
                            <div className="space-y-2">
                                {interestOptions.map((interest) => (
                                    <div key={interest} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={interest}
                                            name="interests"
                                            value={interest}
                                            checked={formData.interests.includes(interest)}
                                            onChange={handleChange}
                                            className="h-5 w-5 rounded border-2 border-gray-300 text-[#003366] focus:ring-[#003366]"
                                        />
                                        <label htmlFor={interest} className="ml-2 text-xl text-gray-700">
                                            {interest}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="comments" className="block text-xl font-medium text-gray-700">Questions/Comments (Optional)</label>
                            <textarea
                                id="comments"
                                name="comments"
                                rows={5}
                                value={formData.comments}
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
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}