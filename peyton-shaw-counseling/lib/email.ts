interface EmailData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

class EmailError extends Error {
  constructor(message: string, public provider?: string) {
    super(message);
    this.name = 'EmailError';
  }
}

/**
 * Send email using SendGrid
 */
async function sendWithSendGrid(data: EmailData): Promise<EmailResponse> {
  const apiKey = process.env.SENDGRID_API_KEY;
  
  if (!apiKey) {
    throw new EmailError('SendGrid API key not configured', 'sendgrid');
  }

  const emailData = {
    personalizations: [
      {
        to: [{ email: data.to }],
      },
    ],
    from: {
      email: 'no-reply@peytonshawcounseling.com',
      name: 'Peyton Shaw Counseling',
    },
    subject: data.subject,
    content: [
      {
        type: data.html ? 'text/html' : 'text/plain',
        value: data.html || data.text || '',
      },
    ],
    reply_to: data.replyTo ? { email: data.replyTo } : undefined,
  };

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new EmailError(`SendGrid error: ${response.status} - ${error}`, 'sendgrid');
    }

    return {
      success: true,
      messageId: response.headers.get('x-message-id') || undefined,
    };
  } catch (error) {
    if (error instanceof EmailError) {
      throw error;
    }
    throw new EmailError(`Failed to send email: ${error}`, 'sendgrid');
  }
}

/**
 * Send email using Resend (alternative to SendGrid)
 */
async function sendWithResend(data: EmailData): Promise<EmailResponse> {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    throw new EmailError('Resend API key not configured', 'resend');
  }

  const emailData = {
    from: 'Peyton Shaw Counseling <no-reply@peytonshawcounseling.com>',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
    reply_to: data.replyTo,
  };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new EmailError(`Resend error: ${error.message || response.statusText}`, 'resend');
    }

    const result = await response.json();
    
    return {
      success: true,
      messageId: result.id,
    };
  } catch (error) {
    if (error instanceof EmailError) {
      throw error;
    }
    throw new EmailError(`Failed to send email: ${error}`, 'resend');
  }
}

/**
 * Main email sending function that tries configured providers
 */
export async function sendEmail(data: EmailData): Promise<EmailResponse> {
  // Validate email data
  if (!data.to || !data.subject || (!data.text && !data.html)) {
    throw new EmailError('Missing required email fields');
  }

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.to)) {
    throw new EmailError('Invalid recipient email address');
  }

  if (data.replyTo && !emailRegex.test(data.replyTo)) {
    throw new EmailError('Invalid reply-to email address');
  }

  // Try SendGrid first if configured
  if (process.env.SENDGRID_API_KEY) {
    try {
      return await sendWithSendGrid(data);
    } catch (error) {
      console.error('SendGrid failed:', error);
      // Fall through to try Resend if available
    }
  }

  // Try Resend if configured
  if (process.env.RESEND_API_KEY) {
    try {
      return await sendWithResend(data);
    } catch (error) {
      console.error('Resend failed:', error);
      throw error;
    }
  }

  // No email service configured
  throw new EmailError('No email service configured. Please set SENDGRID_API_KEY or RESEND_API_KEY');
}

/**
 * Format contact form email HTML
 */
export function formatContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #0ea5e9;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: #f9fafb;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 0 0 5px 5px;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: bold;
            color: #4b5563;
          }
          .value {
            margin-top: 5px;
            padding: 10px;
            background-color: white;
            border: 1px solid #e5e7eb;
            border-radius: 3px;
          }
          .message {
            white-space: pre-wrap;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${escapeHtml(data.name)}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${escapeHtml(data.email)}</div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${escapeHtml(data.phone)}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Message:</div>
            <div class="value message">${escapeHtml(data.message)}</div>
          </div>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            This email was sent from the contact form on peytonshawcounseling.com
          </p>
        </div>
      </body>
    </html>
  `;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}