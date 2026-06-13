import { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type ModalType = 'volunteer' | 'donate' | 'partner' | 'chapter' | null;

interface FormState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const COUNTIES = [
  'Antrim','Armagh','Carlow','Cavan','Clare','Cork','Derry','Donegal','Down','Dublin',
  'Fermanagh','Galway','Kerry','Kildare','Kilkenny','Laois','Leitrim','Limerick',
  'Longford','Louth','Mayo','Meath','Monaghan','Offaly','Roscommon','Sligo',
  'Tipperary','Tyrone','Waterford','Westmeath','Wexford','Wicklow','Nationwide',
];

// ── Volunteer Form ─────────────────────────────────────────────────────────────
function VolunteerForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', county:'Dublin', skills:'', availability:'', message:'' });
  const [state, setState] = useState<FormState>({ loading:false, success:false, error:null });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ loading:true, success:false, error:null });
    const { error } = await supabase.from('volunteer_registrations').insert({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      county: form.county,
      skills: form.skills.trim() || null,
      availability: form.availability || null,
      message: form.message.trim() || null,
    });
    setState({ loading:false, success:!error, error: error ? 'Something went wrong. Please try again.' : null });
  };

  if (state.success) return <SuccessScreen title="Application Received!" message="Thank you for volunteering with Safe Streets Ireland. Our team will be in touch soon." onClose={onClose} />;

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full Name" required>
          <input className="form-input" placeholder="Your name" value={form.name} onChange={set('name')} required />
        </Field>
        <Field label="Email Address" required>
          <input type="email" className="form-input" placeholder="you@email.com" value={form.email} onChange={set('email')} required />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone (optional)">
          <input className="form-input" placeholder="+353 ..." value={form.phone} onChange={set('phone')} />
        </Field>
        <Field label="Your County" required>
          <select className="form-input" value={form.county} onChange={set('county')}>
            {COUNTIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Skills & Experience">
        <textarea className="form-input resize-none" rows={2} placeholder="e.g. youth work, coaching, counselling, admin..." value={form.skills} onChange={set('skills')} />
      </Field>
      <Field label="Availability">
        <select className="form-input" value={form.availability} onChange={set('availability')}>
          <option value="">Select availability</option>
          <option value="few-hours-week">A few hours per week</option>
          <option value="weekends">Weekends only</option>
          <option value="occasional">Occasionally / events only</option>
          <option value="full-time">Full time commitment</option>
        </select>
      </Field>
      <Field label="Anything else you'd like us to know?">
        <textarea className="form-input resize-none" rows={3} placeholder="Tell us more about yourself and your motivation..." value={form.message} onChange={set('message')} />
      </Field>
      {state.error && <ErrorAlert message={state.error} />}
      <SubmitButton loading={state.loading} label="Submit Volunteer Application" />
    </form>
  );
}

// ── Donate Form ────────────────────────────────────────────────────────────────
const AMOUNTS = [10, 25, 50, 100, 250];

function DonateForm({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState('');
  const [form, setForm] = useState({ name:'', email:'' });
  const [state, setState] = useState<FormState>({ loading:false, success:false, error:null });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const finalAmount = custom ? parseInt(custom, 10) : amount;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 1) {
      setState(s => ({ ...s, error: 'Please enter a valid donation amount.' }));
      return;
    }
    if (!form.email.trim()) {
      setState(s => ({ ...s, error: 'Please enter your email address.' }));
      return;
    }
    setState({ loading:true, success:false, error:null });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            mode: 'payment',
            amount_cents: finalAmount * 100,
            guest_email: form.email.trim().toLowerCase(),
            guest_name: form.name.trim() || undefined,
            success_url: `${window.location.origin}/thank-you`,
            cancel_url: `${window.location.origin}/cancel`,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Checkout session failed — please try again.');
      if (!data.url) throw new Error('No checkout URL returned — please try again.');
      window.location.href = data.url;
    } catch (err: any) {
      setState({ loading:false, success:false, error: err.message || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Amount selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Select Amount (€)</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {AMOUNTS.map(a => (
            <button
              key={a}
              type="button"
              onClick={() => { setAmount(a); setCustom(''); }}
              className={`px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all ${
                amount === a && !custom
                  ? 'bg-orange-500 border-orange-500 text-white'
                  : 'border-gray-200 text-gray-700 hover:border-orange-400'
              }`}
            >
              €{a}
            </button>
          ))}
        </div>
        <input
          type="number"
          min="1"
          placeholder="Enter custom amount..."
          value={custom}
          onChange={e => { setCustom(e.target.value); setAmount(0); }}
          className="form-input"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Your Name (optional)">
          <input className="form-input" placeholder="Your name" value={form.name} onChange={set('name')} />
        </Field>
        <Field label="Email Address" required>
          <input type="email" className="form-input" placeholder="you@email.com" value={form.email} onChange={set('email')} required />
        </Field>
      </div>
      {state.error && <ErrorAlert message={state.error} />}
      <SubmitButton loading={state.loading} label={`Donate €${finalAmount || '—'} Now`} />
      <p className="text-center text-xs text-gray-400">You'll be redirected to Stripe's secure checkout. Your data is protected.</p>
    </form>
  );
}

// ── Partner Form ───────────────────────────────────────────────────────────────
function PartnerForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ org_name:'', contact_name:'', email:'', phone:'', org_type:'other', message:'' });
  const [state, setState] = useState<FormState>({ loading:false, success:false, error:null });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ loading:true, success:false, error:null });
    const { error } = await supabase.from('partner_applications').insert({
      org_name: form.org_name.trim(),
      contact_name: form.contact_name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      org_type: form.org_type as 'business'|'school'|'sports'|'council'|'charity'|'faith'|'other',
      message: form.message.trim() || null,
    });
    setState({ loading:false, success:!error, error: error ? 'Something went wrong. Please try again.' : null });
  };

  if (state.success) return <SuccessScreen title="Partnership Request Received!" message="Thank you for your interest in partnering with Safe Streets Ireland. Our partnerships team will be in touch within 5 working days." onClose={onClose} />;

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Organisation Name" required>
        <input className="form-input" placeholder="Your organisation's name" value={form.org_name} onChange={set('org_name')} required />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Contact Person" required>
          <input className="form-input" placeholder="Your name" value={form.contact_name} onChange={set('contact_name')} required />
        </Field>
        <Field label="Organisation Type" required>
          <select className="form-input" value={form.org_type} onChange={set('org_type')}>
            <option value="business">Business / Corporate</option>
            <option value="school">School / College</option>
            <option value="sports">Sports Club</option>
            <option value="council">Local Council / Government</option>
            <option value="charity">Charity / NGO</option>
            <option value="faith">Faith Organisation</option>
            <option value="other">Other</option>
          </select>
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email Address" required>
          <input type="email" className="form-input" placeholder="contact@org.ie" value={form.email} onChange={set('email')} required />
        </Field>
        <Field label="Phone (optional)">
          <input className="form-input" placeholder="+353 ..." value={form.phone} onChange={set('phone')} />
        </Field>
      </div>
      <Field label="How would you like to partner with us?">
        <textarea className="form-input resize-none" rows={3} placeholder="Describe how your organisation can contribute to the campaign..." value={form.message} onChange={set('message')} />
      </Field>
      {state.error && <ErrorAlert message={state.error} />}
      <SubmitButton loading={state.loading} label="Submit Partnership Application" />
    </form>
  );
}

// ── Chapter Form ───────────────────────────────────────────────────────────────
function ChapterForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', area:'', county:'Dublin', message:'' });
  const [state, setState] = useState<FormState>({ loading:false, success:false, error:null });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState({ loading:true, success:false, error:null });
    const { error } = await supabase.from('chapter_requests').insert({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      area: form.area.trim(),
      county: form.county,
      message: form.message.trim() || null,
    });
    setState({ loading:false, success:!error, error: error ? 'Something went wrong. Please try again.' : null });
  };

  if (state.success) return <SuccessScreen title="Chapter Request Received!" message="Excellent! Thank you for stepping up to lead change in your community. Our team will contact you within 48 hours." onClose={onClose} />;

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Your Name" required>
          <input className="form-input" placeholder="Your full name" value={form.name} onChange={set('name')} required />
        </Field>
        <Field label="Email Address" required>
          <input type="email" className="form-input" placeholder="you@email.com" value={form.email} onChange={set('email')} required />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Phone (optional)">
          <input className="form-input" placeholder="+353 ..." value={form.phone} onChange={set('phone')} />
        </Field>
        <Field label="Your County" required>
          <select className="form-input" value={form.county} onChange={set('county')}>
            {COUNTIES.filter(c => c !== 'Nationwide').map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Town / Area" required>
        <input className="form-input" placeholder="e.g. Tallaght, Knocknaheeny, Limerick City..." value={form.area} onChange={set('area')} required />
      </Field>
      <Field label="Why do you want to start a chapter?">
        <textarea className="form-input resize-none" rows={3} placeholder="Tell us about your community and your motivation for starting a chapter..." value={form.message} onChange={set('message')} />
      </Field>
      {state.error && <ErrorAlert message={state.error} />}
      <SubmitButton loading={state.loading} label="Submit Chapter Request" />
    </form>
  );
}

// ── Shared UI helpers ──────────────────────────────────────────────────────────
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}{required && <span className="text-orange-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      {message}
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full btn-primary flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : label}
    </button>
  );
}

function SuccessScreen({ title, message, onClose }: { title: string; message: string; onClose: () => void }) {
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
        <CheckCircle className="w-8 h-8 text-green-500" />
      </div>
      <h3 className="text-2xl font-extrabold text-charcoal mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-8 max-w-sm mx-auto">{message}</p>
      <button onClick={onClose} className="btn-primary">Done</button>
    </div>
  );
}

// ── Modal wrapper ──────────────────────────────────────────────────────────────
const MODAL_TITLES: Record<NonNullable<ModalType>, string> = {
  volunteer: 'Become a Volunteer',
  donate:    'Make a Donation',
  partner:   'Partner With Us',
  chapter:   'Start a Chapter',
};

function Modal({ type, onClose }: { type: NonNullable<ModalType>; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl p-8">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl font-extrabold text-charcoal">{MODAL_TITLES[type]}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        {type === 'volunteer' && <VolunteerForm onClose={onClose} />}
        {type === 'donate'    && <DonateForm    onClose={onClose} />}
        {type === 'partner'   && <PartnerForm   onClose={onClose} />}
        {type === 'chapter'   && <ChapterForm   onClose={onClose} />}
      </div>
    </div>
  );
}

export { Modal };
export type { ModalType };
