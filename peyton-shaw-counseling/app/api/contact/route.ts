import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, formatContactEmail } from '@/lib/email';
import { ContactFormData } from '@/lib/types';

// Rate limiting: Store request counts by IP
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  requestCounts.forEach((data, ip) => {
    if (now > data.resetTime) {
      requestCounts.delete(ip);
    }
  });
}, 60000); // Clean up every minute

function getRateLimitInfo(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const limit = 5; // 5 requests per hour
  const window = 3600000; // 1 hour in milliseconds
  
  const record = requestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + window });
    return { allowed: true, remaining: limit - 1 };
  }
  
  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: limit - record.count };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    const { allowed, remaining } = getRateLimitInfo(ip);
    
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(Date.now() + 3600000).toISOString(),
          }
        }
      );
    }
    
    // Parse request body
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    // Validate phone format if provided
    if (body.phone && !/^[\d\s()+-]*$/.test(body.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }
    
    // Sanitize input
    const sanitizedData = {
      name: body.name.trim().slice(0, 100),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim().slice(0, 20),
      message: body.message.trim().slice(0, 1000),
    };
    
    // Check for spam patterns
    const spamPatterns = [
      /\b(viagra|cialis|loans?|credit|casino|lottery|winner)\b/i,
      /\b(click here|buy now|limited time|act now)\b/i,
      /(https?:\/\/[^\s]+){3,}/i, // Multiple URLs
    ];
    
    const messageToCheck = `${sanitizedData.name} ${sanitizedData.message}`;
    const isSpam = spamPatterns.some(pattern => pattern.test(messageToCheck));
    
    if (isSpam) {
      // Silently accept but don't send (to avoid alerting spammers)
      return NextResponse.json(
        { success: true },
        { 
          status: 200,
          headers: {
            'X-RateLimit-Remaining': remaining.toString(),
          }
        }
      );
    }
    
    // Get contact email from environment
    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      console.error('CONTACT_EMAIL not configured');
      return NextResponse.json(
        { error: 'Contact form is not properly configured' },
        { status: 500 }
      );
    }
    
    // Format email content
    const emailHtml = formatContactEmail(sanitizedData);
    
    // Send email
    try {
      await sendEmail({
        to: contactEmail,
        subject: `New Contact Form Submission from ${sanitizedData.name}`,
        html: emailHtml,
        text: `
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
${sanitizedData.phone ? `Phone: ${sanitizedData.phone}` : ''}

Message:
${sanitizedData.message}
        `.trim(),
        replyTo: sanitizedData.email,
      });
      
      // Send auto-reply to the user
      try {
        await sendEmail({
          to: sanitizedData.email,
          subject: 'Thank you for contacting Peyton Shaw Counseling',
          html: `
            <h2>Thank you for reaching out!</h2>
            <p>I've received your message and will get back to you within 24-48 hours.</p>
            <p>If you need immediate assistance or are experiencing a mental health emergency, please call 911 or go to your nearest emergency room.</p>
            <p>Best regards,<br>Peyton Shaw<br>Peyton Shaw Counseling</p>
          `,
          text: `Thank you for reaching out!\n\nI've received your message and will get back to you within 24-48 hours.\n\nIf you need immediate assistance or are experiencing a mental health emergency, please call 911 or go to your nearest emergency room.\n\nBest regards,\nPeyton Shaw\nPeyton Shaw Counseling`,
        });
      } catch (autoReplyError) {
        // Log but don't fail if auto-reply fails
        console.error('Failed to send auto-reply:', autoReplyError);
      }
      
      return NextResponse.json(
        { success: true },
        { 
          status: 200,
          headers: {
            'X-RateLimit-Remaining': remaining.toString(),
          }
        }
      );
    } catch (emailError: any) {
      console.error('Email send failed:', emailError);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}