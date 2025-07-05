// Test script to verify SendGrid configuration
// Run with: node scripts/test-email.js

require('dotenv').config({ path: '.env.local' });

async function testSendGrid() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;

  if (!apiKey) {
    console.error('❌ SENDGRID_API_KEY is not set in .env.local');
    return;
  }

  if (!contactEmail) {
    console.error('❌ CONTACT_EMAIL is not set in .env.local');
    return;
  }

  console.log('✅ Environment variables loaded:');
  console.log(`   - SENDGRID_API_KEY: ${apiKey.substring(0, 10)}...`);
  console.log(`   - CONTACT_EMAIL: ${contactEmail}`);

  // Test SendGrid API key validity
  try {
    console.log('\n🔄 Testing SendGrid API key...');
    
    const response = await fetch('https://api.sendgrid.com/v3/scopes', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ SendGrid API key is valid!');
      console.log('   Scopes:', data.scopes.join(', '));
    } else {
      console.error('❌ SendGrid API key is invalid:', response.status, response.statusText);
      const error = await response.text();
      console.error('   Error:', error);
    }
  } catch (error) {
    console.error('❌ Failed to connect to SendGrid:', error.message);
  }

  // Test email sending (optional - uncomment to send a test email)
  /*
  try {
    console.log('\n🔄 Sending test email...');
    
    const emailData = {
      personalizations: [{
        to: [{ email: contactEmail }],
      }],
      from: {
        email: 'no-reply@peytonshawcounseling.com',
        name: 'Peyton Shaw Counseling',
      },
      subject: 'Test Email from Contact Form',
      content: [{
        type: 'text/plain',
        value: 'This is a test email to verify SendGrid configuration.',
      }],
    };

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
    } else {
      console.error('❌ Failed to send test email:', response.status);
      const error = await response.text();
      console.error('   Error:', error);
    }
  } catch (error) {
    console.error('❌ Failed to send test email:', error.message);
  }
  */

  console.log('\n📝 Next steps:');
  console.log('1. Make sure to verify your sender domain in SendGrid');
  console.log('2. Add no-reply@peytonshawcounseling.com as a verified sender');
  console.log('3. Ensure your API key has "Mail Send" permissions');
  console.log('\nTo send a test email, uncomment the test email section in this script.');
}

testSendGrid();