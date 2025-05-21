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
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'Only English letters allowed. Example: Pavel Wild';
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
        if (!value.trim()) {
          error = 'Message is required.';
        } else if (!/^[A-Za-z0-9\s.,!?'"():;@#&$%*+\-=/\\\n\r]+$/.test(value)) {
          error = 'Only English letters and common symbols allowed in message.';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => { //Узнать что туда ввели при необходимости — отформатировать 
    const { name, value } = e.target;
    let maskedValue = value;

    if (name === 'phone') {
      maskedValue = value
        .replace(/\D/g, '')
        .replace(/^7?/, '7') //ввел 8 или 9 всё равно ставим 7
        .slice(0, 11); // ограничивает длину

      let formatted = '+7 ';
      if (maskedValue.length > 1) {
        formatted += `(${maskedValue.slice(1, 4)}`; //введено больше 1 цифры,  добавляем скобку и первые 3 цифры
      }
      if (maskedValue.length >= 4) {
        formatted += `) ${maskedValue.slice(4, 7)}`; //закрываем скобку и добавляем ещё 3 цифры
      }
      if (maskedValue.length >= 7) {
        formatted += `-${maskedValue.slice(7, 9)}`; //ставим дефис и 2 цифры
      }
      if (maskedValue.length >= 9) {
        formatted += `-${maskedValue.slice(9, 11)}`; //ещё дефис и последние 2 цифры
      }
      maskedValue = formatted;
    }

    setFormData(prev => ({ ...prev, [name]: maskedValue })); // ... копия всех полей, переразписывем поля

    const error = validateField(name, maskedValue); // вызываем функция для поля 
    setErrors(prev => ({ ...prev, [name]: error })); // то же самое что и сетфромдата
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //чтобы страница не перезагружалась при отправке формы.
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors); // чтобы можно было отобразить под полем 
    if (Object.keys(newErrors).length === 0) {
      setIsModalOpen(true); // если ошибок нет открываем окно спасибо за регистрацию
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
              value={formData.username} //то для того, чтобы контролировать и отслеживать текущее значение поля чтобы ошибку отобразить в реал времени
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
