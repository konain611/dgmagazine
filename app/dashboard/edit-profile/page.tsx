'use client';

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '@/components/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Eye, EyeOff } from 'lucide-react';

interface ProfileData {
  username: string;
  email: string;
  company?: string;
  country?: string;
  pictureUrl?: string | null;
}

type ProfileField = keyof Omit<ProfileData, 'pictureUrl'>;

export default function ProfilePage() {
  const { token, loading: authLoading } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileData>({ username: '', email: '' });
  const [profileLoading, setProfileLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1️⃣ Only redirect after auth has initialized
  useEffect(() => {
    if (!authLoading && !token) {
      router.push('/sign-up');
    }
  }, [authLoading, token, router]);

  // 2️⃣ Fetch profile, then ALWAYS clear profileLoading in .then()
  useEffect(() => {
    if (!token) return;
    setProfileLoading(true);

    axios
      .get<{ user: ProfileData }>('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setProfile(data.user);
        setPreviewUrl(data.user.pictureUrl ?? null);
      })
      .catch(() => {
        setMessage({ type: 'error', text: 'Failed to load profile.' });
      })
      .then(() => {
        // second .then runs whether success or catch
        setProfileLoading(false);
      });
  }, [token]);

  if (profileLoading) return <LoadingSpinner />;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      return setMessage({ type: 'error', text: 'Only image files are allowed.' });
    }
    if (file.size > 10 * 1024 * 1024) {
      return setMessage({ type: 'error', text: 'Image size must be under 10 MB.' });
    }
    setAvatarFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setRemoved(false);
    setMessage(null);
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setPreviewUrl(null);
    setRemoved(true);
    setMessage(null);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!profile.username.trim()) errs.username = 'Username is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate() || !token) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      let pictureUrl: string | null = profile.pictureUrl ?? null;

      if (avatarFile) {
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        const uploadRes = await axios.post<{ url: string }>('/api/user/avatar', formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        });
        pictureUrl = uploadRes.data.url;
      } else if (removed) {
        pictureUrl = null;
      }

      await axios.patch(
        '/api/user/profile',
        { ...profile, password: password || undefined, pictureUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage({ type: 'success', text: 'Profile updated successfully.' });
      setPassword('');
      setRemoved(false);
    } catch (err) {
      const error = err as unknown as { response?: { data?: { error?: string } }; message?: string };
      console.error('Profile update error:', error);
      const errMsg = error.response?.data?.error || error.message || 'Update failed. Please try again later.';
      setMessage({ type: 'error', text: errMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-md text-gray-800">
      <h1 className="text-3xl font-semibold mb-6">Edit Profile</h1>

      {message && (
        <div className={`mb-4 p-3 rounded text-sm font-medium ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {(['username', 'company', 'country'] as ProfileField[]).map(field => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize mb-1">{field}</label>
            <input
              name={field}
              type="text"
              value={profile[field] ?? ''}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#003366]"
            />
            {errors[field] && <p className="text-red-600 text-sm mt-1">{errors[field]}</p>}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={profile.email}
            disabled
            className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={isSubmitting}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#003366]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(s => !s)}
            className="absolute right-3 top-9 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Profile Picture</label>
          <div className="flex items-center gap-4">
            {previewUrl ? (
              <div className="relative">
                <Image
                  src={previewUrl}
                  alt="Profile preview"
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-full object-cover border"
                />
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  disabled={isSubmitting}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                No image
              </div>
            )}

            <div className="flex-1">
              <label
                htmlFor="file-upload"
                className="cursor-pointer inline-block border border-dashed border-gray-400 px-4 py-2 rounded text-sm text-gray-600 hover:border-[#003366] hover:text-[#003366]"
              >
                {previewUrl ? 'Change Image' : 'Upload Image'}
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatar}
                disabled={isSubmitting}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, or GIF (max 10 MB)</p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 bg-[#003366] hover:bg-[#FF9102] transition-colors text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
