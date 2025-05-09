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

export default function WritePage() {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    // Handle checkbox input (interests)
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
      // Handle other input types (text, email, etc.)
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
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert('Form submitted successfully!');
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
    <div className="bg-white">
      <h1 className="text-3xl font-bold text-center mb-10 bg-white py-4 px-6 shadow-md rounded-lg border-b-4 border-[#003366]">
        Write For Us
      </h1>
      <div className="px-4 md:px-20">
        <div className="space-y-4 mb-8">
          <p>
            We&apos;re always looking for good writers. If you&apos;ve the knack to create concise, easy-to-understand and readable content then we would love to hear from you. Your narrative should aim to bring a fresh perspective on cybersecurity, making people aware of the need to be conscious about this aspect of life.
          </p>
          <p>
            But writing for DG Magazine isn&apos;t an easy undertaking. It takes effort. Every piece that you produce will speak quality. And we will push you to get there. Once there, you will get feedback and reviews from our peers and advisors and you will work closely with our editor to move on to the next level.
          </p>
          <p>
            The work has rewards. Attractive ones. Thousands of people from different areas of life will read your work, and you&apos;ll learn a lot in the process, particularly about the topic you will write on. Of course, you will also get a handsome package that will liberate you of many stresses of life.
          </p>
          <p>
            Send in samples of your previous work together with a short write-up to convince us that you can also dilate on cybersecurity. We place a premium on original content and we have zero tolerance for plagiarized material. So, please ensure that your writings conform to these basic standards.
          </p>
          <p>
            Write to us at <span className="font-medium">info@diginfo.net</span> and tell us if you can be a part of our outfit.
          </p>
        </div>

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
                  className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366]"
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
                  className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366]"
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
                  className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366]"
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
                  className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366]"
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
                className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366]"
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
                  className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366]"
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
                  className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366]"
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
                  className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366]"
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
                className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366]"
              />
            </div>

            <div>
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
                      className="h-4 w-4 rounded border-gray-300 text-[#003366] focus:ring-[#003366]"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003366] focus:ring-[#003366]"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#003366] py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#FF9102] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
