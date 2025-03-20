import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import dotenv from 'dotenv';
import Email from '../models/emailModel.js';

dotenv.config();

const imap = new Imap({
  user: process.env.IMAP_USER,
  password: process.env.IMAP_PASS,
  host: process.env.IMAP_HOST,
  port: process.env.IMAP_PORT,
  tls: true,
  tlsOptions: { rejectUnauthorized: false },
  connTimeout: 60000,   // 30 seconds
  authTimeout: 60000 ,   // 30 seconds
//   keepalive: {
//     interval: 30000, // Every 30 seconds
//     idleInterval: 600000, // 5 minutes
//     forceNoop: true
//   }
});

const fetchEmails = () => {
  imap.once('ready', () => {
    console.log('IMAP connection established. Fetching emails...');

    imap.openBox('INBOX', true, (err, box) => {
      if (err) {
        console.error('Error opening inbox:', err);
        return;
      }
      console.log(`Total Messages in Inbox: ${box.messages.total}`);

      // Fetch emails from the last 30 days
      const sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - 30);

      const formattedDate = `${String(sinceDate.getDate()).padStart(2, '0')}-${sinceDate.toLocaleString('en-US', { month: 'short' })}-${sinceDate.getFullYear()}`;
      console.log(`Formatted IMAP Date: ${formattedDate}`);

      const searchCriteria = [['SINCE', formattedDate]];
      
      imap.search(searchCriteria, (err, results) => {
        if (err) {
          console.error('Search error:', err);
          return;
        }

        if (!results || results.length === 0) {
          console.log('No emails found in the last 30 days.');
          imap.end();
          return;
        }

        console.log(`Found ${results.length} emails`);

        const fetchOptions = { bodies: '', markSeen: false };
        const fetchStream = imap.fetch(results, fetchOptions);

        // fetchStream.on('message', (msg) => {
        //   msg.on('body', (stream) => {
        //     simpleParser(stream, async(err, parsed) => {
        //       if (err) {
        //         console.error('Error parsing email:', err);
        //         return;
        //       }
        //       //console.log(`From: ${parsed.from.text}`);
        //       //console.log(`Subject: ${parsed.subject}`);
        //       //console.log(`Date: ${parsed.date}`);
        //       //console.log('----------------------------------');

        //       msg.on('body', async (stream) => {
        //         try {
        //           const parsed = await simpleParser(stream);

        //           console.log('Attempting to save email:', { 
        //             from: parsed.from.text, 
        //             subject: parsed.subject, 
        //             date: parsed.date 
        //           });
              
        //           const email = new Email({
        //             from: parsed.from.text,
        //             subject: parsed.subject,
        //             date: parsed.date,
        //             body: parsed.text,
        //           });
              
        //           await email.save();
        //           console.log('Email saved to MongoDB:', parsed.subject);
        //         } catch (error) {
        //           console.error('Error saving or parsing email:', error);
        //         }
        //       });
              

            //});
          //});
        //});

        fetchStream.on('message', (msg) => {
            msg.on('body', (stream) => {
              simpleParser(stream, async (err, parsed) => {
                if (err) {
                  console.error('Error parsing email:', err);
                  return;
                }
                
                console.log('Attempting to save email:', {
                  from: parsed.from.text,
                  subject: parsed.subject,
                  date: parsed.date,
                });
          
                try {
                  const email = new Email({
                    from: parsed.from.text,
                    subject: parsed.subject,
                    date: parsed.date,
                    body: parsed.text,
                  });
          
                  await email.save();
                  console.log('Email saved to MongoDB:', parsed.subject);
                } catch (error) {
                  console.error('Error saving email to MongoDB:', error);
                }
              });
            });
          });
          

        fetchStream.once('error', (err) => console.error('Fetch error:', err));
        fetchStream.once('end', () => {
          console.log('Done fetching emails.');
          imap.end();
        });
      });
    });
  });

  imap.once('error', (err) => console.error('IMAP Error:', err));
  imap.once('end', () => console.log('IMAP connection ended.'));

  imap.connect();
};

export default fetchEmails;
