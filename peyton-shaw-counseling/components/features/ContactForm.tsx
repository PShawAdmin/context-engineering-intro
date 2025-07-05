'use client'

import { useState } from 'react';
import {Form, Input, Textarea, Button} from '@heroui/react';
import {Card, CardHeader, CardBody} from '@heroui/card';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^[\d\s()+-]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        setErrors({});
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Unable to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-900">Send a Message</h2>
      </CardHeader>
      <CardBody>
        <Form 
          onSubmit={handleSubmit}
          validationBehavior="aria"
          className="space-y-4"
        >
          <Input
            label="Name"
            placeholder="Your full name"
            value={formData.name}
            onValueChange={handleChange('name')}
            isRequired
            isInvalid={!!errors.name}
            errorMessage={errors.name}
            variant="bordered"
            isDisabled={isSubmitting}
          />

          <Input
            type="email"
            label="Email"
            placeholder="your@email.com"
            value={formData.email}
            onValueChange={handleChange('email')}
            isRequired
            isInvalid={!!errors.email}
            errorMessage={errors.email}
            variant="bordered"
            isDisabled={isSubmitting}
          />

          <Input
            type="tel"
            label="Phone (optional)"
            placeholder="(XXX) XXX-XXXX"
            value={formData.phone}
            onValueChange={handleChange('phone')}
            isInvalid={!!errors.phone}
            errorMessage={errors.phone}
            variant="bordered"
            isDisabled={isSubmitting}
          />

          <Textarea
            label="Message"
            placeholder="Tell me how I can help you..."
            value={formData.message}
            onValueChange={handleChange('message')}
            isRequired
            isInvalid={!!errors.message}
            errorMessage={errors.message}
            variant="bordered"
            minRows={4}
            isDisabled={isSubmitting}
          />

          {submitStatus !== 'idle' && (
            <div 
              className={`p-4 rounded-lg ${
                submitStatus === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {statusMessage}
            </div>
          )}

          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full bg-nude-clay hover:bg-nude-warm text-text-charcoal font-medium shadow-soft hover:shadow-clay transition-all duration-300"
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>

          <p className="text-sm text-gray-500 text-center mt-4">
            By submitting this form, you agree to our privacy policy. 
            We&apos;ll only use your information to respond to your inquiry.
          </p>
        </Form>
      </CardBody>
    </Card>
  );
}