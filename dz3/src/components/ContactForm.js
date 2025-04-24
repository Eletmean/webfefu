import React, { useState } from 'react';

import Modal from './Modal';

import '../styles/ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'username':
        if (!value.trim()) {
          error = 'Name is required. Example: JPavel Wild';
        } else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(value)) {
          error = 'Only letters allowed. Example: Pavel Wild';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone is required. Example: 89123456789';
        } else if (!/^\d{11}$/.test(value)) {
          error = 'Phone must be exactly 11 digits. Example: 89123456789';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required. Example: name@mail.com';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Invalid email. Example: name@mail.com';
        }
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required.';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Живая валидация
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <textarea
            name="message"
            rows="5"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>

        <div className="form-group">
          <button type="submit">CONTACT US</button>
        </div>
      </form>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2>Спасибо, что заполнили форму!</h2>
        </Modal>
      )}
    </>
  );
}

export default ContactForm;
