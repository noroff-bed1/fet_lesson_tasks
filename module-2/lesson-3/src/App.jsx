import { useState, useCallback } from 'react';
import './App.css'
 
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
function validate(fields) {
  const errs = {};
  if (!fields.name.trim())               errs.name        = 'Name is required.';
  if (!fields.email.trim())              errs.email       = 'Email is required.';
  else if (!EMAIL_RE.test(fields.email)) errs.email       = 'Enter a valid email address.';
  if (!fields.password)                  errs.password    = 'Password is required.';
  else if (fields.password.length < 8)   errs.password    = 'Password must be at least 8 characters.';
  if (fields.preferences.length === 0)   errs.preferences = 'Select at least one preference.';
  return errs;
}
 
const INITIAL = { name: '', email: '', password: '', preferences: [], newsletter: false };
const PREF_OPTIONS = ['News', 'Updates', 'Offers'];
 
function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span id={`${id}-error`} className="error" role="alert" aria-live="polite">
          {error}
        </span>
      )}
    </div>
  );
}
 
function Summary({ data, onDismiss }) {
  return (
    <div className="summary" role="region" aria-label="Submission summary">
      <h2>Registration received</h2>
      <dl>
        <dt>Name</dt>        <dd>{data.name}</dd>
        <dt>Email</dt>       <dd>{data.email}</dd>
        <dt>Password</dt>    <dd>{'•'.repeat(data.password.length)}</dd>
        <dt>Preferences</dt> <dd>{data.preferences.map((p) => p).join(', ')}</dd>
        <dt>Newsletter</dt>  <dd>{data.newsletter ? 'Subscribed' : 'Not subscribed'}</dd>
      </dl>
      <button className="btn-secondary" onClick={onDismiss}>Register another</button>
    </div>
  );
}
 
export default function App() {
  const [fields,    setFields]    = useState(INITIAL);
  const [touched,   setTouched]   = useState({});
  const [submitted, setSubmitted] = useState(null);
 
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'preferences') {
      setFields((prev) => ({
        ...prev,
        preferences: checked
          ? [...prev.preferences, value]
          : prev.preferences.filter((p) => p !== value),
      }));
    } else if (type === 'checkbox') {
      setFields((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFields((prev) => ({ ...prev, [name]: value }));
    }
  }, []);
 
  const handleBlur = useCallback((e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  }, []);
 
  const errors = validate(fields);
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([k]) => touched[k])
  );
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, preferences: true });
    if (Object.keys(errors).length === 0) {
      setSubmitted({ ...fields });
      setFields(INITIAL);
      setTouched({});
    }
  };
 
  if (submitted) {
    return (
      <main className="container">
        <Summary data={submitted} onDismiss={() => setSubmitted(null)} />
      </main>
    );
  }
 
  return (
    <main className="container">
      <header className="form-header">
        <h1>Create account</h1>
      </header>
 
      <form onSubmit={handleSubmit} noValidate aria-label="Registration form">
 
        <Field id="name" label="Full name" error={visibleErrors.name}>
          <input
            id="name" name="name" type="text" autoComplete="name"
            value={fields.name} onChange={handleChange} onBlur={handleBlur}
            aria-describedby={visibleErrors.name ? 'name-error' : undefined}
            aria-invalid={!!visibleErrors.name}
          />
        </Field>
 
        <Field id="email" label="Email address" error={visibleErrors.email}>
          <input
            id="email" name="email" type="email" autoComplete="email"
            value={fields.email} onChange={handleChange} onBlur={handleBlur}
            aria-describedby={visibleErrors.email ? 'email-error' : undefined}
            aria-invalid={!!visibleErrors.email}
          />
        </Field>
 
        <Field id="password" label="Password" error={visibleErrors.password}>
          <input
            id="password" name="password" type="password" autoComplete="new-password"
            value={fields.password} onChange={handleChange} onBlur={handleBlur}
            aria-describedby={visibleErrors.password ? 'password-error' : undefined}
            aria-invalid={!!visibleErrors.password}
          />
          <span className="hint">At least 8 characters</span>
        </Field>
 
        <fieldset className={visibleErrors.preferences ? 'has-error' : ''}>
          <legend>
            Preferences
            {visibleErrors.preferences && (
              <span id="preferences-error" className="error" role="alert" aria-live="polite">
                {visibleErrors.preferences}
              </span>
            )}
          </legend>
          {PREF_OPTIONS.map((pref) => (
            <label key={pref} className="checkbox-label">
              <input
                type="checkbox" name="preferences" value={pref}
                checked={fields.preferences.includes(pref)}
                onChange={handleChange}
                onBlur={() => setTouched((p) => ({ ...p, preferences: true }))}
                aria-describedby={visibleErrors.preferences ? 'preferences-error' : undefined}
              />
              {pref}
            </label>
          ))}
        </fieldset>
 
        <label className="checkbox-label newsletter">
          <input
            type="checkbox" name="newsletter"
            checked={fields.newsletter} onChange={handleChange}
          />
          Subscribe to newsletter
        </label>
 
        <button type="submit" className="btn-primary">Create account</button>
      </form>
    </main>
  );
}