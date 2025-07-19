# BSCScan Integration Setup

This document explains how to set up and use the BSCScan integration to display wallet activity in your SmartSentinels Hub.

## Overview

The wallet activity feature fetches transaction data from BSCScan API and displays:
- Regular BNB transactions (sent/received)
- BEP-20 token transfers
- Transaction details with timestamps
- Direct links to view transactions on BSCScan

## Setup Instructions

### 1. Get BSCScan API Key

1. Visit [https://bscscan.com/apis](https://bscscan.com/apis)
2. Sign up for a free account if you don't have one
3. Navigate to "API-KEYs" in your account dashboard
4. Create a new API key
5. Copy the API key

### 2. Configure Environment Variable

1. Open your `.env.local` file in the project root
2. Replace `YourAPIKeyHere` with your actual BSCScan API key:
   ```
   NEXT_PUBLIC_BSCSCAN_API_KEY=ABC123DEF456GHI789JKL012MNO345PQR678
   ```
3. Save the file

### 3. Restart Development Server

After adding the API key, restart your development server:
```bash
npm run dev
```

## Features

### Transaction Display
- **Regular Transactions**: Shows BNB transfers with amounts, addresses, and timestamps
- **Token Transfers**: Displays BEP-20 token transfers with proper decimal formatting
- **Transaction Type**: Clearly indicates if transaction was sent or received
- **BSCScan Links**: Direct links to view full transaction details on BSCScan

### User Interface
- **Tabbed Interface**: Switch between regular transactions and token transfers
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Shows loading spinner while fetching data
- **Error Handling**: Displays error messages and retry options

### Data Formatting
- **Addresses**: Shortened format (first 6 and last 4 characters)
- **Amounts**: Properly formatted with appropriate decimal places
- **Timestamps**: Human-readable date and time format
- **Transaction Hashes**: Shortened format with links to BSCScan

## API Limitations

### Free Tier Limits
- 5 calls per second
- 100,000 calls per day
- If you need higher limits, consider upgrading to a paid plan

### Rate Limiting
The component includes error handling for rate limiting and will display appropriate messages if limits are exceeded.

## Troubleshooting

### Common Issues

1. **"Failed to fetch wallet activity"**
   - Check if your API key is correctly set in `.env.local`
   - Verify the API key is valid on BSCScan
   - Check if you've exceeded rate limits

2. **"No transactions found"**
   - This is normal for new wallets with no transaction history
   - Verify the wallet address is correct

3. **Loading indefinitely**
   - Check browser console for error messages
   - Verify internet connection
   - Check if BSCScan API is operational

### Testing

To test the integration:
1. Connect a wallet that has some transaction history
2. Navigate to "Wallet Activity" section
3. You should see transactions loading within a few seconds

## File Structure

```
src/
├── utils/
│   └── bscScanApi.ts          # BSCScan API utility functions
├── component/
│   └── common/
│       └── WalletActivity.tsx  # Main wallet activity component
└── component/homes/home-one/
    └── SmartSentinelsHub.tsx   # Integration point
```

## API Endpoints Used

1. **Normal Transactions**: `https://api.bscscan.com/api?module=account&action=txlist`
2. **Token Transfers**: `https://api.bscscan.com/api?module=account&action=tokentx`
3. **Account Balance**: `https://api.bscscan.com/api?module=account&action=balance`

## Future Enhancements

Potential improvements that could be added:
- Pagination for large transaction histories
- Filtering by date range or transaction type
- Export functionality (CSV, JSON)
- Real-time updates using WebSockets
- Integration with other blockchain explorers
- Transaction categorization and tagging

## Security Notes

- API keys are exposed in client-side code (this is normal for BSCScan)
- Never store private keys or sensitive wallet information
- BSCScan API keys are free and safe to use in frontend applications
