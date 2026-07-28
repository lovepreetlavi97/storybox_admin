'use client';

import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { adminService } from '@/services';
import { ISettings } from '@/types';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [appTitle, setAppTitle] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [facebook, setFacebook] = useState('');
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [supportText, setSupportText] = useState('');

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await adminService.getSettings();
        if (res.success && res.data) {
          const s = res.data;
          setAppTitle(s.appTitle || 'StoryHub');
          setContactEmail(s.contactEmail || 'support@storyhub.com');
          setFacebook(s.socialLinks?.facebook || '');
          setYoutube(s.socialLinks?.youtube || '');
          setInstagram(s.socialLinks?.instagram || '');
          setLinkedin(s.socialLinks?.linkedin || '');
          setTwitter(s.socialLinks?.twitter || '');
          setSupportText(s.supportText || '');
        } else {
          setError(res.error || 'Failed to fetch platform configurations');
        }
      } catch (err: any) {
        setError(err.message || 'Connecting to server failed');
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    const payload = {
      appTitle,
      contactEmail,
      socialLinks: {
        facebook,
        youtube,
        instagram,
        linkedin,
        twitter
      },
      supportText
    };

    try {
      const res = await adminService.updateSettings(payload);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError(res.error || 'Failed to save changes');
      }
    } catch (err: any) {
      setError(err.message || 'Updating configurations failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[40vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-rose-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Platform Settings</h1>
        <p className="text-zinc-400 mt-1">Configure global meta metadata, contact links, and brand text</p>
      </div>

      {success && (
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-400 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 shrink-0" />
          <span>Platform settings updated successfully!</span>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-4 text-sm text-rose-400 flex items-center gap-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Brand/Support Text */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-4">
          <h2 className="text-lg font-bold text-white mb-2 border-b border-zinc-800 pb-3">
            Footer Brand / Copyright Text
          </h2>

          <div>
            <textarea
              placeholder="e.g. StoryHub. All rights reserved. Stories that stay."
              rows={4}
              className="w-full rounded-lg bg-zinc-800 border border-zinc-700 px-4 py-3 text-white placeholder-zinc-550 focus:outline-none focus:border-rose-500 transition-colors text-sm resize-none"
              value={supportText}
              onChange={(e) => setSupportText(e.target.value)}
              disabled={submitting}
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 rounded-lg bg-rose-500 px-6 py-3 font-semibold text-white hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all cursor-pointer text-sm disabled:opacity-50"
          >
            {submitting ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Save className="h-4.5 w-4.5" />
                Save Platform Configuration
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
