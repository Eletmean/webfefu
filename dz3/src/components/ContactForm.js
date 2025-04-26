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
          error = 'Name is required. Example: Pavel Wild';
        } else if (!/^[A-Za-zА-Яа-яЁё\s]+$/.test(value)) {
          error = 'Only letters allowed. Example: Pavel Wild';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone is required. Example: +7 (912) 345-67-89';
        } else if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value)) {
          error = 'Format: +7 (912) 345-67-89';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required.';
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
          error = 'Email must use Latin letters only. Example: name@mail.com';
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
    let maskedValue = value;

    if (name === 'phone') {
      // Маска для телефона: +7 (___) ___-__-__
      maskedValue = value
        .replace(/\D/g, '')             
        .replace(/^7?/, '7')            
        .slice(0, 11);                  

      let formatted = '+7 ';
      if (maskedValue.length > 1) {
        formatted += `(${maskedValue.slice(1, 4)}`;
      }
      if (maskedValue.length >= 4) {
        formatted += `) ${maskedValue.slice(4, 7)}`;
      }
      if (maskedValue.length >= 7) {
        formatted += `-${maskedValue.slice(7, 9)}`;
      }
      if (maskedValue.length >= 9) {
        formatted += `-${maskedValue.slice(9, 11)}`;
      }
      maskedValue = formatted;
    }

    setFormData(prev => ({ ...prev, [name]: maskedValue }));

    const error = validateField(name, maskedValue);
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
              placeholder="+7 (___) ___-__-__"
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
          <h2>Thank you for filling out the form!</h2>
        </Modal>
      )}
    </>
  );
}

export default ContactForm;
