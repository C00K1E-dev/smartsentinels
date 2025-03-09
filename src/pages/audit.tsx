import { useState } from 'react';
import Head from 'next/head';
import { jsPDF } from 'jspdf'; // Import jsPDF
import styles from '../styles/Audit.module.css';

const Audit: React.FC = () => {
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setResponse('Processing your code...');

    try {
      const res = await fetch('http://localhost:5000/process-code', { // Updated port to 5000
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const text = await res.text(); // Get the response text
      console.log('Response text:', text); // Log the response text

      try {
        const data = JSON.parse(text); // Parse the response text as JSON
        console.log('Parsed data:', data); // Log the parsed data

        if (data.reply) {
          setResponse(data.reply);
          setShowDownloadButton(true);
        } else {
          setResponse('An error occurred. Please try again.');
        }
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError);
        setResponse('Failed to parse server response. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to connect to the server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const responseText = response;

    const marginLeft = 10;
    const marginTop = 20;
    const maxLineWidth = 180;
    const pageHeight = doc.internal.pageSize.height;
    let yPosition = marginTop;
    const lines = doc.splitTextToSize(responseText, maxLineWidth);

    // Add background image
    const backgroundImage = '/background-image.png'; // Correct path to your background image
    const hologramImage = '/hologram-image.png'; // Correct path to your hologram image

    doc.addImage(backgroundImage, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255); // Set text color to white
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    yPosition += 10;

    doc.setFont('times', 'normal');
    for (let i = 0; i < lines.length; i++) {
      if (yPosition + 10 > pageHeight) {
        doc.addPage();
        doc.addImage(backgroundImage, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);
        yPosition = marginTop;
      }

      doc.text(lines[i], marginLeft, yPosition);
      yPosition += 10;
    }

    // Add hologram image
    doc.addImage(hologramImage, 'PNG', 150, 250, 50, 50); // Adjust the position and size as needed

    doc.save('audit_report.pdf');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Audit</title>
      </Head>
      <h2 className={styles.title}>Smart Contract Audit</h2>
      <form id="contract-form" className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="smart-contract" className={styles.label}>Paste your smart contract code here:</label>
        <textarea
          id="smart-contract"
          name="smart-contract"
          rows={10}
          cols={50}
          className={styles.textarea}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        ></textarea>
        <button type="submit" id="submit-button" className={styles.button} disabled={!code.trim()}>
          {isLoading ? 'Submitting...' : 'Submit Code'}
        </button>
      </form>

      <div id="response-section" className={styles.responseSection} style={{ display: response ? 'block' : 'none' }}>
        <h3 className={styles.label}>Smart Sentinel's Response:</h3>
        <pre id="response-content" className={styles.responseContent}>{response}</pre>
        {showDownloadButton && (
          <button id="download-pdf" className={styles.button} onClick={handleDownloadPDF}>
            Download PDF Report
          </button>
        )}
      </div>
    </div>
  );
};

export default Audit;