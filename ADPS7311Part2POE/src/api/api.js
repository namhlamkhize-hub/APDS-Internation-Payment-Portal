const BASE_URL = import.meta.env.VITE_API_URL || 'https://apds-internation-payment-portal.onrender.com';

export async function loginUser({ username, password }) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
  return res.json();
}

export async function registerUser({ fullName, idNumber, accountNumber, username, password }) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, idNumber, accountNumber, username, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Registration failed');
  return res.json();
}

export async function submitPayment({ amount, currency, provider, recipientAccount, swiftCode }) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/api/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      amount: parseFloat(amount),
      currency: currency.split(' ')[0],
      provider,
      accountInfo: recipientAccount,
      swiftCode: swiftCode.toUpperCase(),
    }),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Payment failed');
  return res.json();
}

export async function getAllPayments() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/api/payments/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch payments');
  return res.json();
}

export async function verifyPayment(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/api/payments/${id}/verify`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to verify payment');
  return res.json();
}