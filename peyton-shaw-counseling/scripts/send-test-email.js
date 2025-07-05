// Script to send a test email via SendGrid
// Run with: node scripts/send-test-email.js

require('dotenv').config({ path: '.env.local' });

async function sendTestEmail() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey || !contactEmail) {
    console.error('❌ Missing required environment variables');
    return;
  }

  console.log('🔄 Sending test email...');
  console.log(`   To: ${contactEmail}`);
  console.log(`   From: no-reply@peytonshawcounseling.com`);
  
  const emailData = {
    personalizations: [{
      to: [{ email: contactEmail }],
    }],
    from: {
      email: 'no-reply@peytonshawcounseling.com',
      name: 'Peyton Shaw Counseling',
    },
    subject: 'Test Email - Contact Form Working! 🎉',
    content: [{
      type: 'text/html',
      value: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5B99E5;">Test Email Successful!</h2>
          <p>This test email confirms that your SendGrid integration is working correctly.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #4AA274; margin-top: 0;">✅ Configuration Status</h3>
            <ul style="color: #374151;">
              <li>SendGrid API Key: Valid</li>
              <li>From Email: no-reply@peytonshawcounseling.com</li>
              <li>To Email: ${contactEmail}</li>
              <li>Contact Form: Ready to receive submissions</li>
            </ul>
          </div>
          
          <p style="color: #6b7280;">When someone submits the contact form on your website, you'll receive a nicely formatted email with their information.</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #9ca3af; font-size: 12px;">
            This is an automated test email from your Peyton Shaw Counseling website.
          </p>
        </div>
      `,
    }],
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

    if (response.ok || response.status === 202) {
      console.log('✅ Test email sent successfully!');
      console.log(`   Check ${contactEmail} for the test email.`);
      console.log('\n🎉 Your contact form is ready to receive submissions!');
    } else {
      console.error('❌ Failed to send test email:', response.status);
      const error = await response.text();
      console.error('   Error:', error);
      
      if (response.status === 403) {
        console.log('\n⚠️  Possible issues:');
        console.log('   - Sender email not verified in SendGrid');
        console.log('   - Domain authentication not completed');
        console.log('   - API key lacks mail send permissions');
      }
    }
  } catch (error) {
    console.error('❌ Failed to send test email:', error.message);
  }
}

sendTestEmail();