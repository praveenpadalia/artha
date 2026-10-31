    // Comprehensive Indian Stock Master Directory for Instant Auto-Lookup
    const INDIAN_STOCK_DIRECTORY = {
      // NIFTY 50 & Heavyweights
      'RELIANCE': { name: 'Reliance Industries Ltd.', divYield: 0.8, exchange: 'NSE' },
      'TCS': { name: 'Tata Consultancy Services Ltd.', divYield: 2.1, exchange: 'NSE' },
      'HDFCBANK': { name: 'HDFC Bank Ltd.', divYield: 1.1, exchange: 'NSE' },
      'ICICIBANK': { name: 'ICICI Bank Ltd.', divYield: 0.9, exchange: 'NSE' },
      'INFY': { name: 'Infosys Limited', divYield: 2.4, exchange: 'NSE' },
      'BHARTIARTL': { name: 'Bharti Airtel Ltd.', divYield: 0.6, exchange: 'NSE' },
      'ITC': { name: 'ITC Limited', divYield: 3.2, exchange: 'NSE' },
      'SBIN': { name: 'State Bank of India', divYield: 1.7, exchange: 'NSE' },
      'LT': { name: 'Larsen & Toubro Ltd.', divYield: 0.9, exchange: 'NSE' },
      'HINDUNILVR': { name: 'Hindustan Unilever Ltd.', divYield: 1.6, exchange: 'NSE' },
      'TATAMOTORS': { name: 'Tata Motors Ltd.', divYield: 0.8, exchange: 'NSE' },
      'BAJFINANCE': { name: 'Bajaj Finance Ltd.', divYield: 0.5, exchange: 'NSE' },
      'MARUTI': { name: 'Maruti Suzuki India Ltd.', divYield: 1.1, exchange: 'NSE' },
      'HCLTECH': { name: 'HCL Technologies Ltd.', divYield: 2.8, exchange: 'NSE' },
      'KOTAKBANK': { name: 'Kotak Mahindra Bank Ltd.', divYield: 0.6, exchange: 'NSE' },
      'AXISBANK': { name: 'Axis Bank Ltd.', divYield: 0.1, exchange: 'NSE' },
      'SUNPHARMA': { name: 'Sun Pharmaceutical Industries Ltd.', divYield: 0.7, exchange: 'NSE' },
      'TITAN': { name: 'Titan Company Ltd.', divYield: 0.3, exchange: 'NSE' },
      'ASIANPAINT': { name: 'Asian Paints Ltd.', divYield: 1.2, exchange: 'NSE' },
      'NTPC': { name: 'NTPC Limited', divYield: 1.9, exchange: 'NSE' },
      'TATAPOWER': { name: 'Tata Power Company Ltd.', divYield: 0.5, exchange: 'NSE' },
      'TATASTEEL': { name: 'Tata Steel Ltd.', divYield: 2.4, exchange: 'NSE' },
      'ONGC': { name: 'Oil & Natural Gas Corporation Ltd.', divYield: 4.6, exchange: 'NSE' },
      'POWERGRID': { name: 'Power Grid Corporation of India Ltd.', divYield: 3.4, exchange: 'NSE' },
      'COALINDIA': { name: 'Coal India Ltd.', divYield: 5.5, exchange: 'NSE' },
      'ADANIENT': { name: 'Adani Enterprises Ltd.', divYield: 0.1, exchange: 'NSE' },
      'ADANIPORTS': { name: 'Adani Ports and Special Economic Zone Ltd.', divYield: 0.4, exchange: 'NSE' },
      'ADANIPOWER': { name: 'Adani Power Ltd.', divYield: 0.0, exchange: 'NSE' },
      'ADANIGREEN': { name: 'Adani Green Energy Ltd.', divYield: 0.0, exchange: 'NSE' },
      'BAJAJFINSV': { name: 'Bajaj Finserv Ltd.', divYield: 0.2, exchange: 'NSE' },
      'NESTLEIND': { name: 'Nestle India Ltd.', divYield: 1.3, exchange: 'NSE' },
      'ULTRACEMCO': { name: 'UltraTech Cement Ltd.', divYield: 0.6, exchange: 'NSE' },
      'WIPRO': { name: 'Wipro Limited', divYield: 0.2, exchange: 'NSE' },
      'JSWSTEEL': { name: 'JSW Steel Ltd.', divYield: 0.7, exchange: 'NSE' },
      'M&M': { name: 'Mahindra & Mahindra Ltd.', divYield: 0.7, exchange: 'NSE' },
      'TECHM': { name: 'Tech Mahindra Ltd.', divYield: 1.8, exchange: 'NSE' },
      'GRASIM': { name: 'Grasim Industries Ltd.', divYield: 0.7, exchange: 'NSE' },
      'CIPLA': { name: 'Cipla Limited', divYield: 0.9, exchange: 'NSE' },
      'DRREDDY': { name: 'Dr. Reddy’s Laboratories Ltd.', divYield: 0.8, exchange: 'NSE' },
      'EICHERMOT': { name: 'Eicher Motors Ltd.', divYield: 1.1, exchange: 'NSE' },
      'BPCL': { name: 'Bharat Petroleum Corporation Ltd.', divYield: 4.8, exchange: 'NSE' },
      'HEROMOTOCO': { name: 'Hero MotoCorp Ltd.', divYield: 2.7, exchange: 'NSE' },
      'BRITANNIA': { name: 'Britannia Industries Ltd.', divYield: 1.4, exchange: 'NSE' },
      'HINDALCO': { name: 'Hindalco Industries Ltd.', divYield: 0.5, exchange: 'NSE' },
      'APOLLOHOSP': { name: 'Apollo Hospitals Enterprise Ltd.', divYield: 0.2, exchange: 'NSE' },
      'DIVISLAB': { name: 'Divi’s Laboratories Ltd.', divYield: 0.5, exchange: 'NSE' },
      'TATACONSUM': { name: 'Tata Consumer Products Ltd.', divYield: 0.8, exchange: 'NSE' },
      'LTIM': { name: 'LTIMindtree Ltd.', divYield: 1.1, exchange: 'NSE' },
      'SHRIRAMFIN': { name: 'Shriram Finance Ltd.', divYield: 1.4, exchange: 'NSE' },
      'SBILIFE': { name: 'SBI Life Insurance Co. Ltd.', divYield: 0.2, exchange: 'NSE' },
      'HDFCLIFE': { name: 'HDFC Life Insurance Co. Ltd.', divYield: 0.3, exchange: 'NSE' },
      'BAJAJ-AUTO': { name: 'Bajaj Auto Ltd.', divYield: 1.2, exchange: 'NSE' },
      // PSU & Railways
      'IRFC': { name: 'Indian Railway Finance Corporation Ltd.', divYield: 1.0, exchange: 'NSE' },
      'RVNL': { name: 'Rail Vikas Nigam Ltd.', divYield: 0.5, exchange: 'NSE' },
      'IRCTC': { name: 'Indian Railway Catering and Tourism Corp.', divYield: 0.8, exchange: 'NSE' },
      'RAILTEL': { name: 'RailTel Corporation of India Ltd.', divYield: 0.6, exchange: 'NSE' },
      'RITES': { name: 'RITES Limited', divYield: 4.2, exchange: 'NSE' },
      'TITAGARH': { name: 'Titagarh Rail Systems Ltd.', divYield: 0.1, exchange: 'NSE' },
      'JUPITERWAG': { name: 'Jupiter Wagons Ltd.', divYield: 0.2, exchange: 'NSE' },
      // Defense & Aerospace
      'HAL': { name: 'Hindustan Aeronautics Ltd.', divYield: 0.8, exchange: 'NSE' },
      'BEL': { name: 'Bharat Electronics Ltd.', divYield: 0.8, exchange: 'NSE' },
      'BDL': { name: 'Bharat Dynamics Ltd.', divYield: 0.8, exchange: 'NSE' },
      'MAZDOCK': { name: 'Mazagon Dock Shipbuilders Ltd.', divYield: 0.6, exchange: 'NSE' },
      'COCHINSHIP': { name: 'Cochin Shipyard Ltd.', divYield: 0.6, exchange: 'NSE' },
      'GRSE': { name: 'Garden Reach Shipbuilders & Engineers', divYield: 0.5, exchange: 'NSE' },
      // Power & Renewable Energy
      'IREDA': { name: 'Indian Renewable Energy Development Agency', divYield: 0.0, exchange: 'NSE' },
      'SUZLON': { name: 'Suzlon Energy Ltd.', divYield: 0.0, exchange: 'NSE' },
      'NHPC': { name: 'NHPC Limited', divYield: 2.1, exchange: 'NSE' },
      'SJVN': { name: 'SJVN Limited', divYield: 1.6, exchange: 'NSE' },
      'JSWENERGY': { name: 'JSW Energy Ltd.', divYield: 0.3, exchange: 'NSE' },
      'BHEL': { name: 'Bharat Heavy Electricals Ltd.', divYield: 0.4, exchange: 'NSE' },
      'TATAINVEST': { name: 'Tata Investment Corporation Ltd.', divYield: 0.4, exchange: 'NSE' },
      // Banking & NBFCs
      'PNB': { name: 'Punjab National Bank', divYield: 1.4, exchange: 'NSE' },
      'BANKBARODA': { name: 'Bank of Baroda', divYield: 3.1, exchange: 'NSE' },
      'CANBK': { name: 'Canara Bank', divYield: 3.2, exchange: 'NSE' },
      'IDFCFIRSTB': { name: 'IDFC FIRST Bank Ltd.', divYield: 0.0, exchange: 'NSE' },
      'FEDERALBNK': { name: 'Federal Bank Ltd.', divYield: 0.6, exchange: 'NSE' },
      'UNIONBANK': { name: 'Union Bank of India', divYield: 3.1, exchange: 'NSE' },
      'INDIANB': { name: 'Indian Bank', divYield: 2.2, exchange: 'NSE' },
      'JIOFIN': { name: 'Jio Financial Services Ltd.', divYield: 0.0, exchange: 'NSE' },
      'CHOLAFIN': { name: 'Cholamandalam Investment & Finance', divYield: 0.2, exchange: 'NSE' },
      'MUTHOOTFIN': { name: 'Muthoot Finance Ltd.', divYield: 1.2, exchange: 'NSE' },
      'REC': { name: 'REC Limited', divYield: 3.1, exchange: 'NSE' },
      'PFC': { name: 'Power Finance Corporation Ltd.', divYield: 2.8, exchange: 'NSE' },
      // Retail & Consumer
      'DMART': { name: 'Avenue Supermarts Ltd. (DMART)', divYield: 0.0, exchange: 'NSE' },
      'TRENT': { name: 'Trent Limited', divYield: 0.1, exchange: 'NSE' },
      'VBL': { name: 'Varun Beverages Ltd.', divYield: 0.3, exchange: 'NSE' },
      'PIDILITIND': { name: 'Pidilite Industries Ltd.', divYield: 0.5, exchange: 'NSE' },
      'HAVELLS': { name: 'Havells India Ltd.', divYield: 0.5, exchange: 'NSE' },
      'POLYCAB': { name: 'Polycab India Ltd.', divYield: 0.4, exchange: 'NSE' },
      'VOLTAS': { name: 'Voltas Limited', divYield: 0.3, exchange: 'NSE' },
      'DIXON': { name: 'Dixon Technologies (India) Ltd.', divYield: 0.1, exchange: 'NSE' },
      'BATAINDIA': { name: 'Bata India Ltd.', divYield: 1.0, exchange: 'NSE' },
      // New Age & Tech
      'ZOMATO': { name: 'Zomato Limited', divYield: 0.0, exchange: 'NSE' },
      'PAYTM': { name: 'One 97 Communications Ltd. (Paytm)', divYield: 0.0, exchange: 'NSE' },
      'NYKAA': { name: 'FSN E-Commerce Ventures Ltd. (Nykaa)', divYield: 0.0, exchange: 'NSE' },
      'POLICYBZR': { name: 'PB Fintech Ltd. (PolicyBazaar)', divYield: 0.0, exchange: 'NSE' },
      'DELHIVERY': { name: 'Delhivery Limited', divYield: 0.0, exchange: 'NSE' },
      'KPITTECH': { name: 'KPIT Technologies Ltd.', divYield: 0.3, exchange: 'NSE' },
      'PERSISTENT': { name: 'Persistent Systems Ltd.', divYield: 0.9, exchange: 'NSE' },
      'COFORGE': { name: 'Coforge Limited', divYield: 1.0, exchange: 'NSE' },
      'TATATECH': { name: 'Tata Technologies Ltd.', divYield: 0.0, exchange: 'NSE' },
      // Commodities & Metals
      'VEDL': { name: 'Vedanta Limited', divYield: 6.2, exchange: 'NSE' },
      'NMDC': { name: 'NMDC Limited', divYield: 2.5, exchange: 'NSE' },
      'HINDZINC': { name: 'Hindustan Zinc Ltd.', divYield: 4.2, exchange: 'NSE' },
      'SAIL': { name: 'Steel Authority of India Ltd.', divYield: 1.8, exchange: 'NSE' },
      'JINDALSTEL': { name: 'Jindal Steel & Power Ltd.', divYield: 0.3, exchange: 'NSE' },
      'NATIONALUM': { name: 'National Aluminium Co. Ltd.', divYield: 2.6, exchange: 'NSE' },
      // Exchanges & Platforms
      'BSE': { name: 'BSE Limited', divYield: 0.5, exchange: 'BSE' },
      'MCX': { name: 'Multi Commodity Exchange of India Ltd.', divYield: 0.4, exchange: 'NSE' },
      'CDSL': { name: 'Central Depository Services (India) Ltd.', divYield: 1.3, exchange: 'NSE' },
      'CAMS': { name: 'Computer Age Management Services Ltd.', divYield: 1.1, exchange: 'NSE' },
      // Auto Ancillary
      'MOTHERSON': { name: 'Samvardhana Motherson International', divYield: 0.4, exchange: 'NSE' },
      'BOSCHLTD': { name: 'Bosch Limited', divYield: 1.1, exchange: 'NSE' },
      'BHARATFORG': { name: 'Bharat Forge Ltd.', divYield: 0.4, exchange: 'NSE' },
      'TVSMOTOR': { name: 'TVS Motor Company Ltd.', divYield: 0.3, exchange: 'NSE' },
      'MRF': { name: 'MRF Limited', divYield: 0.2, exchange: 'NSE' },
      'BALKRISIND': { name: 'Balkrishna Industries Ltd.', divYield: 0.6, exchange: 'NSE' },
      // Healthcare & Pharma
      'MANKIND': { name: 'Mankind Pharma Ltd.', divYield: 0.0, exchange: 'NSE' },
      'TORNTPHARM': { name: 'Torrent Pharmaceuticals Ltd.', divYield: 0.9, exchange: 'NSE' },
      'LUPIN': { name: 'Lupin Limited', divYield: 0.4, exchange: 'NSE' },
      'AUROPHARMA': { name: 'Aurobindo Pharma Ltd.', divYield: 0.3, exchange: 'NSE' },
      'ALKEM': { name: 'Alkem Laboratories Ltd.', divYield: 0.7, exchange: 'NSE' },
      'MAXHEALTH': { name: 'Max Healthcare Institute Ltd.', divYield: 0.1, exchange: 'NSE' },
      // Other Popular Retail Stocks
      'KALYANKJIL': { name: 'Kalyan Jewellers India Ltd.', divYield: 0.2, exchange: 'NSE' },
      'HUDCO': { name: 'Housing & Urban Development Corp.', divYield: 1.7, exchange: 'NSE' },
      'PRESTIGE': { name: 'Prestige Estates Projects Ltd.', divYield: 0.1, exchange: 'NSE' },
      'DLF': { name: 'DLF Limited', divYield: 0.6, exchange: 'NSE' },
      'GODREJPROP': { name: 'Godrej Properties Ltd.', divYield: 0.0, exchange: 'NSE' },
      'OBEROIRLTY': { name: 'Oberoi Realty Ltd.', divYield: 0.4, exchange: 'NSE' },
      'YESBANK': { name: 'Yes Bank Ltd.', divYield: 0.0, exchange: 'NSE' },
      'IDEA': { name: 'Vodafone Idea Ltd.', divYield: 0.0, exchange: 'NSE' },
      'ABCAPITAL': { name: 'Aditya Birla Capital Ltd.', divYield: 0.0, exchange: 'NSE' },
      'EXIDEIND': { name: 'Exide Industries Ltd.', divYield: 0.4, exchange: 'NSE' },
      'AMBUJACEM': { name: 'Ambuja Cements Ltd.', divYield: 0.4, exchange: 'NSE' },
      'ACC': { name: 'ACC Limited', divYield: 0.3, exchange: 'NSE' },
      'INDHOTEL': { name: 'The Indian Hotels Company Ltd.', divYield: 0.2, exchange: 'NSE' },
      'PAGEIND': { name: 'Page Industries Ltd.', divYield: 0.8, exchange: 'NSE' },
      'ASTRAL': { name: 'Astral Limited', divYield: 0.2, exchange: 'NSE' },
      'PETRONET': { name: 'Petronet LNG Ltd.', divYield: 3.1, exchange: 'NSE' },
      'IGL': { name: 'Indraprastha Gas Ltd.', divYield: 3.8, exchange: 'NSE' },
      'MGL': { name: 'Mahanagar Gas Ltd.', divYield: 2.0, exchange: 'NSE' },
      'GUJGASLTD': { name: 'Gujarat Gas Ltd.', divYield: 1.2, exchange: 'NSE' }
    };


        // Comprehensive Popular Indian Mutual Fund Directory for Instant 0ms Matching & Fallback
    const POPULAR_MF_DIRECTORY = {
      '122639': { name: 'Parag Parikh Flexi Cap Fund - Direct Plan - Growth', nav: 78.85 },
      '147285': { name: 'Parag Parikh Tax Saver Fund - Direct Plan - Growth', nav: 32.40 },
      '118834': { name: 'Mirae Asset Large Cap Fund - Direct Plan - Growth', nav: 114.60 },
      '147318': { name: 'Mirae Asset Midcap Fund - Direct Plan - Growth', nav: 38.90 },
      '118825': { name: 'Mirae Asset Great Consumer Fund - Direct Plan - Growth', nav: 88.50 },
      '125497': { name: 'Nippon India Small Cap Fund - Direct Growth', nav: 148.90 },
      '120739': { name: 'Nippon India Growth Fund - Direct Plan - Growth', nav: 3850.00 },
      '120722': { name: 'Nippon India Multi Cap Fund - Direct Plan - Growth', nav: 285.00 },
      '120720': { name: 'Nippon India Large Cap Fund - Direct Plan - Growth', nav: 84.50 },
      '120503': { name: 'Axis Bluechip Fund - Direct Plan - Growth', nav: 58.20 },
      '125354': { name: 'Axis Small Cap Fund - Direct Plan - Growth', nav: 105.00 },
      '120466': { name: 'Axis Midcap Fund - Direct Plan - Growth', nav: 108.00 },
      '120492': { name: 'Axis ELSS Tax Saver Fund - Direct Plan - Growth', nav: 98.00 },
      '119598': { name: 'SBI Bluechip Fund - Direct Plan - Growth', nav: 86.40 },
      '125494': { name: 'SBI Small Cap Fund - Direct Plan - Growth', nav: 178.00 },
      '119597': { name: 'SBI Contra Fund - Direct Plan - Growth', nav: 410.00 },
      '119596': { name: 'SBI Magnum Midcap Fund - Direct Plan - Growth', nav: 225.00 },
      '119599': { name: 'SBI Focused Equity Fund - Direct Plan - Growth', nav: 320.00 },
      '120716': { name: 'UTI Nifty 50 Index Fund - Direct Plan - Growth', nav: 172.50 },
      '120718': { name: 'UTI Nifty Next 50 Index Fund - Direct Plan - Growth', nav: 78.00 },
      '120703': { name: 'UTI Flexi Cap Fund - Direct Plan - Growth', nav: 310.00 },
      '120465': { name: 'HDFC Top 100 Fund - Direct Plan - Growth', nav: 1050.00 },
      '120505': { name: 'HDFC Mid-Cap Opportunities Fund - Direct Plan - Growth', nav: 185.00 },
      '118968': { name: 'HDFC Balanced Advantage Fund - Direct Plan - Growth', nav: 520.00 },
      '118955': { name: 'HDFC Flexi Cap Fund - Direct Plan - Growth', nav: 1950.00 },
      '120531': { name: 'HDFC Index Fund - S&P BSE SENSEX Plan - Direct - Growth', nav: 720.00 },
      '118989': { name: 'ICICI Prudential Bluechip Fund - Direct Plan - Growth', nav: 108.50 },
      '120586': { name: 'ICICI Prudential Value Discovery Fund - Direct Plan - Growth', nav: 430.00 },
      '120588': { name: 'ICICI Prudential Smallcap Fund - Direct Plan - Growth', nav: 82.00 },
      '120743': { name: 'ICICI Prudential Nifty 50 Index Fund - Direct Plan - Growth', nav: 260.00 },
      '120828': { name: 'Quant Small Cap Fund - Direct Plan - Growth', nav: 265.00 },
      '120847': { name: 'Quant Active Fund - Direct Plan - Growth', nav: 640.00 },
      '120844': { name: 'Quant Mid Cap Fund - Direct Plan - Growth', nav: 240.00 },
      '120823': { name: 'Quant Flexi Cap Fund - Direct Plan - Growth', nav: 105.00 },
      '120839': { name: 'Quant Infrastructure Fund - Direct Plan - Growth', nav: 42.00 },
      '145552': { name: 'Motilal Oswal Midcap Fund - Direct Plan - Growth', nav: 98.40 },
      '147743': { name: 'Motilal Oswal Large and Midcap Fund - Direct Plan - Growth', nav: 42.00 },
      '145556': { name: 'Motilal Oswal Nasdaq 100 FOF - Direct Plan - Growth', nav: 38.00 },
      '119062': { name: 'Kotak Emerging Equity Fund - Direct Plan - Growth', nav: 128.00 },
      '119065': { name: 'Kotak Small Cap Fund - Direct Plan - Growth', nav: 285.00 },
      '119063': { name: 'Kotak Flexicap Fund - Direct Plan - Growth', nav: 82.00 },
      '135781': { name: 'Tata Digital India Fund - Direct Plan - Growth', nav: 54.00 },
      '145112': { name: 'Tata Small Cap Fund - Direct Plan - Growth', nav: 42.50 },
      '147879': { name: 'Bandhan Small Cap Fund - Direct Plan - Growth', nav: 44.00 },
      '118778': { name: 'Canara Robeco Emerging Equities - Direct Plan - Growth', nav: 240.00 },
      '146193': { name: 'Canara Robeco Small Cap Fund - Direct Plan - Growth', nav: 41.00 },
      '119232': { name: 'DSP Midcap Fund - Direct Plan - Growth', nav: 138.00 },
      '119239': { name: 'DSP Small Cap Fund - Direct Plan - Growth', nav: 175.00 }
    };


    // Initial Seed Data with AMFI Scheme Codes and Yield / Interest Rates
    const DEFAULT_DATA = {
      banks: [
        { id: 'b1', name: 'HDFC Bank', type: 'Savings Account', balance: 145000, interestRate: 3.5 },
        { id: 'b2', name: 'State Bank of India', type: 'Salary Account', balance: 52000, interestRate: 3.0 },
        { id: 'b3', name: 'ICICI Bank', type: 'Fixed Deposit (FD)', balance: 250000, interestRate: 7.1, tenure: '24 Months', endDate: '2027-10-15', maturityAmount: 287450 },
        { id: 'b4', name: 'Post Office RD', type: 'Recurring Deposit (RD)', balance: 120000, monthlyDeposit: 5000, interestRate: 7.0, tenure: '24 Months', endDate: '2027-11-20', maturityAmount: 129214 }
      ],
      stocks: [
        { id: 's1', symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', exchange: 'NSE', qty: 25, buyPrice: 1350.00, currentPrice: 1410.50, divYield: 0.8, lastSync: 'Sample' },
        { id: 's2', symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE', qty: 15, buyPrice: 3800.00, currentPrice: 4120.00, divYield: 2.1, lastSync: 'Sample' },
        { id: 's3', symbol: 'INFY', name: 'Infosys Limited', exchange: 'BSE', qty: 50, buyPrice: 1720.00, currentPrice: 1850.25, divYield: 2.4, lastSync: 'Sample' }
      ],
      funds: [
        { id: 'f1', schemeCode: '122639', name: 'Parag Parikh Flexi Cap Fund - Direct Plan - Growth', units: 1420.55, buyNav: 62.40, currentNav: 78.85, navDate: 'Latest' },
        { id: 'f2', schemeCode: '118834', name: 'Mirae Asset Large Cap Fund - Direct Plan - Growth', units: 850.12, buyNav: 98.20, currentNav: 114.60, navDate: 'Latest' },
        { id: 'f3', schemeCode: '125497', name: 'Nippon India Small Cap Fund - Direct Growth', units: 450.00, buyNav: 120.50, currentNav: 148.90, navDate: 'Latest' }
      ],
      targets: {
        cash: 20,
        stocks: 40,
        mf: 40
      }
    };

    // State
    let activeTab = 'banks';
    let currentScreen = 'portfolio';
    let appData = loadData();
    let isSyncing = false;
    let donutChartInstance = null;
    let searchQuery = '';

    function loadData() {
      try {
        const saved = localStorage.getItem('artha_data_v6') || localStorage.getItem('dhantrack_data_v5');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (!parsed.targets) parsed.targets = { cash: 20, stocks: 40, mf: 40 };
          return parsed;
        }
      } catch (e) {
        console.warn('Storage not accessible', e);
      }
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }

