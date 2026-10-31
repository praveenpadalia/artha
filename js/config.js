    // Comprehensive Indian Stock Master Directory for Instant Auto-Lookup (500+ Top Listed Equities)
    const INDIAN_STOCK_DIRECTORY = {
  // High-volume Power & Industrial
  'CGPOWER': { name: 'CG Power and Industrial Solutions Ltd.', divYield: 0.2, exchange: 'NSE' },
  '500093': { name: 'CG Power and Industrial Solutions Ltd. (BSE)', divYield: 0.2, exchange: 'BSE' },
  // Exchange & Platform Stocks (NSE is listed on BSE under 544937)
  '544937': { name: 'National Stock Exchange of India Ltd. (NSE)', divYield: 0.0, exchange: 'BSE' },
  'NSE': { name: 'National Stock Exchange of India Ltd.', divYield: 0.0, exchange: 'BSE' },
  'BSE': { name: 'BSE Limited', divYield: 0.4, exchange: 'NSE' },
      // 1. POWER, ENERGY & UTILITIES
      'POWERGRID': { name: 'Power Grid Corporation of India Ltd.', divYield: 3.4, exchange: 'NSE' },
      'PFC': { name: 'Power Finance Corporation Ltd.', divYield: 2.8, exchange: 'NSE' },
      'TATAPOWER': { name: 'Tata Power Company Ltd.', divYield: 0.5, exchange: 'NSE' },
      'ADANIPOWER': { name: 'Adani Power Ltd.', divYield: 0.0, exchange: 'NSE' },
      'NTPC': { name: 'NTPC Limited', divYield: 2.1, exchange: 'NSE' },
      'NHPC': { name: 'NHPC Limited', divYield: 2.2, exchange: 'NSE' },
      'SJVN': { name: 'SJVN Limited', divYield: 1.8, exchange: 'NSE' },
      'TORNTPOWER': { name: 'Torrent Power Ltd.', divYield: 1.2, exchange: 'NSE' },
      'RPOWER': { name: 'Reliance Power Ltd.', divYield: 0.0, exchange: 'NSE' },
      'CESC': { name: 'CESC Limited', divYield: 3.2, exchange: 'NSE' },
      'POWERMECH': { name: 'Power Mech Projects Ltd.', divYield: 0.3, exchange: 'NSE' },
      'HBLPOWER': { name: 'HBL Power Systems Ltd.', divYield: 0.5, exchange: 'NSE' },
      'IREDA': { name: 'Indian Renewable Energy Dev Agency Ltd.', divYield: 0.0, exchange: 'NSE' },
      'SUZLON': { name: 'Suzlon Energy Ltd.', divYield: 0.0, exchange: 'NSE' },
      'INOXWIND': { name: 'Inox Wind Ltd.', divYield: 0.0, exchange: 'NSE' },
      'PTC': { name: 'PTC India Ltd.', divYield: 4.8, exchange: 'NSE' },
      'JPPOWER': { name: 'Jaiprakash Power Ventures Ltd.', divYield: 0.0, exchange: 'NSE' },
      'BHEL': { name: 'Bharat Heavy Electricals Ltd.', divYield: 0.4, exchange: 'NSE' },
      'SIEMENS': { name: 'Siemens Ltd.', divYield: 0.3, exchange: 'NSE' },
      'ABB': { name: 'ABB India Ltd.', divYield: 0.4, exchange: 'NSE' },
      'SCHNEIDER': { name: 'Schneider Electric Infrastructure Ltd.', divYield: 0.0, exchange: 'NSE' },
      'THERMAX': { name: 'Thermax Ltd.', divYield: 0.3, exchange: 'NSE' },
      'GMRINFRA': { name: 'GMR Airports Infrastructure Ltd.', divYield: 0.0, exchange: 'NSE' },
      'GMRPOWER': { name: 'GMR Power and Urban Infra Ltd.', divYield: 0.0, exchange: 'NSE' },
      'JINDALSTEL': { name: 'Jindal Steel & Power Ltd.', divYield: 0.3, exchange: 'NSE' },
      'ORIENTELEC': { name: 'Orient Electric Ltd.', divYield: 0.8, exchange: 'NSE' },
      'VOLTAS': { name: 'Voltas Ltd.', divYield: 0.5, exchange: 'NSE' },
      'HAVELLS': { name: 'Havells India Ltd.', divYield: 0.5, exchange: 'NSE' },
      'POLYCAB': { name: 'Polycab India Ltd.', divYield: 0.4, exchange: 'NSE' },
      'KEI': { name: 'KEI Industries Ltd.', divYield: 0.2, exchange: 'NSE' },

      // 2. BANKING (PSU & PRIVATE)
      'HDFCBANK': { name: 'HDFC Bank Ltd.', divYield: 1.2, exchange: 'NSE' },
      'ICICIBANK': { name: 'ICICI Bank Ltd.', divYield: 0.8, exchange: 'NSE' },
      'SBIN': { name: 'State Bank of India', divYield: 1.7, exchange: 'NSE' },
      'KOTAKBANK': { name: 'Kotak Mahindra Bank Ltd.', divYield: 0.6, exchange: 'NSE' },
      'AXISBANK': { name: 'Axis Bank Ltd.', divYield: 0.1, exchange: 'NSE' },
      'INDUSINDBK': { name: 'IndusInd Bank Ltd.', divYield: 1.1, exchange: 'NSE' },
      'BANKBARODA': { name: 'Bank of Baroda', divYield: 3.2, exchange: 'NSE' },
      'PNB': { name: 'Punjab National Bank', divYield: 1.5, exchange: 'NSE' },
      'CANBK': { name: 'Canara Bank', divYield: 3.1, exchange: 'NSE' },
      'UNIONBANK': { name: 'Union Bank of India', divYield: 2.9, exchange: 'NSE' },
      'IDFCFIRSTB': { name: 'IDFC First Bank Ltd.', divYield: 0.0, exchange: 'NSE' },
      'FEDERALBNK': { name: 'Federal Bank Ltd.', divYield: 1.0, exchange: 'NSE' },
      'AUBANK': { name: 'AU Small Finance Bank Ltd.', divYield: 0.2, exchange: 'NSE' },
      'BANDHANBNK': { name: 'Bandhan Bank Ltd.', divYield: 0.8, exchange: 'NSE' },
      'YESBANK': { name: 'Yes Bank Ltd.', divYield: 0.0, exchange: 'NSE' },
      'IDBI': { name: 'IDBI Bank Ltd.', divYield: 1.4, exchange: 'NSE' },
      'IOB': { name: 'Indian Overseas Bank', divYield: 0.0, exchange: 'NSE' },
      'UCOBANK': { name: 'UCO Bank', divYield: 0.6, exchange: 'NSE' },
      'CENTRALBK': { name: 'Central Bank of India', divYield: 0.0, exchange: 'NSE' },
      'BANKINDIA': { name: 'Bank of India', divYield: 2.8, exchange: 'NSE' },
      'MAHABANK': { name: 'Bank of Maharashtra', divYield: 2.4, exchange: 'NSE' },
      'KARURVYSYA': { name: 'Karur Vysya Bank Ltd.', divYield: 1.2, exchange: 'NSE' },
      'RBLBANK': { name: 'RBL Bank Ltd.', divYield: 0.7, exchange: 'NSE' },
      'CSBBANK': { name: 'CSB Bank Ltd.', divYield: 0.0, exchange: 'NSE' },

      // 3. FINANCIAL SERVICES, NBFCs & INSURANCE
      'BAJFINANCE': { name: 'Bajaj Finance Ltd.', divYield: 0.5, exchange: 'NSE' },
      'BAJAJFINSV': { name: 'Bajaj Finserv Ltd.', divYield: 0.1, exchange: 'NSE' },
      'JIOFIN': { name: 'Jio Financial Services Ltd.', divYield: 0.0, exchange: 'NSE' },
      'REC': { name: 'REC Limited', divYield: 3.2, exchange: 'NSE' },
      'MUTHOOTFIN': { name: 'Muthoot Finance Ltd.', divYield: 1.3, exchange: 'NSE' },
      'CHOLAFIN': { name: 'Cholamandalam Investment & Finance', divYield: 0.2, exchange: 'NSE' },
      'SHRIRAMFIN': { name: 'Shriram Finance Ltd.', divYield: 1.4, exchange: 'NSE' },
      'M&MFIN': { name: 'Mahindra & Mahindra Financial Services', divYield: 2.1, exchange: 'NSE' },
      'MANAPPURAM': { name: 'Manappuram Finance Ltd.', divYield: 2.2, exchange: 'NSE' },
      'L&TFH': { name: 'L&T Finance Holdings Ltd.', divYield: 1.5, exchange: 'NSE' },
      'POONAWALLA': { name: 'Poonawalla Fincorp Ltd.', divYield: 0.5, exchange: 'NSE' },
      'CANFINHOME': { name: 'Can Fin Homes Ltd.', divYield: 0.6, exchange: 'NSE' },
      'HUDCO': { name: 'Housing & Urban Development Corp Ltd.', divYield: 1.8, exchange: 'NSE' },
      'LICHSGFIN': { name: 'LIC Housing Finance Ltd.', divYield: 1.5, exchange: 'NSE' },
      'CREDITACC': { name: 'CreditAccess Grameen Ltd.', divYield: 0.8, exchange: 'NSE' },
      'HOMEFIRST': { name: 'Home First Finance Company', divYield: 0.3, exchange: 'NSE' },
      'AAVAS': { name: 'Aavas Financiers Ltd.', divYield: 0.0, exchange: 'NSE' },
      'CDSL': { name: 'Central Depository Services Ltd.', divYield: 1.1, exchange: 'NSE' },
      'BSE': { name: 'BSE Limited', divYield: 0.4, exchange: 'NSE' },
      'MCX': { name: 'Multi Commodity Exchange of India Ltd.', divYield: 0.4, exchange: 'NSE' },
      'CAMS': { name: 'Computer Age Management Services Ltd.', divYield: 1.2, exchange: 'NSE' },
      'KFINTECH': { name: 'KFin Technologies Ltd.', divYield: 0.6, exchange: 'NSE' },
      'IEX': { name: 'Indian Energy Exchange Ltd.', divYield: 1.1, exchange: 'NSE' },
      'ANGELONE': { name: 'Angel One Ltd.', divYield: 1.5, exchange: 'NSE' },
      'MOTILALOFS': { name: 'Motilal Oswal Financial Services', divYield: 1.4, exchange: 'NSE' },
      'ICICIGI': { name: 'ICICI Lombard General Insurance', divYield: 0.6, exchange: 'NSE' },
      'HDFCLIFE': { name: 'HDFC Life Insurance Co Ltd.', divYield: 0.3, exchange: 'NSE' },
      'SBILIFE': { name: 'SBI Life Insurance Co Ltd.', divYield: 0.2, exchange: 'NSE' },
      'ICICIPRULI': { name: 'ICICI Prudential Life Insurance', divYield: 0.1, exchange: 'NSE' },
      'GICRE': { name: 'General Insurance Corporation of India', divYield: 2.4, exchange: 'NSE' },
      'NIACL': { name: 'The New India Assurance Company', divYield: 1.3, exchange: 'NSE' },
      'LICI': { name: 'Life Insurance Corporation of India', divYield: 1.0, exchange: 'NSE' },

      // 4. RAILWAYS & LOGISTICS
      'IRCTC': { name: 'Indian Railway Catering & Tourism Corp', divYield: 0.8, exchange: 'NSE' },
      'RVNL': { name: 'Rail Vikas Nigam Ltd.', divYield: 0.5, exchange: 'NSE' },
      'IRFC': { name: 'Indian Railway Finance Corporation Ltd.', divYield: 1.2, exchange: 'NSE' },
      'IRCON': { name: 'Ircon International Ltd.', divYield: 1.7, exchange: 'NSE' },
      'RAILTEL': { name: 'RailTel Corporation of India Ltd.', divYield: 0.7, exchange: 'NSE' },
      'TITAGARH': { name: 'Titagarh Rail Systems Ltd.', divYield: 0.1, exchange: 'NSE' },
      'JWL': { name: 'Jupiter Wagons Ltd.', divYield: 0.2, exchange: 'NSE' },
      'TEXRAIL': { name: 'Texmaco Rail & Engineering Ltd.', divYield: 0.3, exchange: 'NSE' },
      'RITES': { name: 'RITES Limited', divYield: 2.8, exchange: 'NSE' },
      'CONCOR': { name: 'Container Corporation of India Ltd.', divYield: 1.4, exchange: 'NSE' },
      'BEML': { name: 'BEML Limited', divYield: 0.5, exchange: 'NSE' },
      'DELHIVERY': { name: 'Delhivery Ltd.', divYield: 0.0, exchange: 'NSE' },
      'BLUEDART': { name: 'Blue Dart Express Ltd.', divYield: 0.3, exchange: 'NSE' },
      'ALLCARGO': { name: 'Allcargo Logistics Ltd.', divYield: 1.5, exchange: 'NSE' },

      // 5. DEFENSE & AEROSPACE
      'HAL': { name: 'Hindustan Aeronautics Ltd.', divYield: 0.8, exchange: 'NSE' },
      'BEL': { name: 'Bharat Electronics Ltd.', divYield: 0.7, exchange: 'NSE' },
      'BDL': { name: 'Bharat Dynamics Ltd.', divYield: 0.4, exchange: 'NSE' },
      'COCHINSHIP': { name: 'Cochin Shipyard Ltd.', divYield: 0.6, exchange: 'NSE' },
      'MAZDOCK': { name: 'Mazagon Dock Shipbuilders Ltd.', divYield: 0.7, exchange: 'NSE' },
      'GRSE': { name: 'Garden Reach Shipbuilders & Engineers', divYield: 0.5, exchange: 'NSE' },
      'PARAS': { name: 'Paras Defence & Space Technologies', divYield: 0.1, exchange: 'NSE' },
      'DATAPATTNS': { name: 'Data Patterns (India) Ltd.', divYield: 0.2, exchange: 'NSE' },
      'ZEN': { name: 'Zen Technologies Ltd.', divYield: 0.1, exchange: 'NSE' },
      'ASTRAMICRO': { name: 'Astra Microwave Products Ltd.', divYield: 0.3, exchange: 'NSE' },
      'SOLARINDS': { name: 'Solar Industries India Ltd.', divYield: 0.1, exchange: 'NSE' },
      'DYNAMATECH': { name: 'Dynamatic Technologies Ltd.', divYield: 0.2, exchange: 'NSE' },

      // 6. IT & TECHNOLOGY
      'TCS': { name: 'Tata Consultancy Services Ltd.', divYield: 1.4, exchange: 'NSE' },
      'INFY': { name: 'Infosys Limited', divYield: 2.1, exchange: 'NSE' },
      'HCLTECH': { name: 'HCL Technologies Ltd.', divYield: 2.9, exchange: 'NSE' },
      'WIPRO': { name: 'Wipro Limited', divYield: 0.2, exchange: 'NSE' },
      'TECHM': { name: 'Tech Mahindra Ltd.', divYield: 1.7, exchange: 'NSE' },
      'LTIM': { name: 'LTIMindtree Ltd.', divYield: 1.2, exchange: 'NSE' },
      'PERSISTENT': { name: 'Persistent Systems Ltd.', divYield: 0.6, exchange: 'NSE' },
      'COFORGE': { name: 'Coforge Limited', divYield: 1.1, exchange: 'NSE' },
      'MPHASIS': { name: 'Mphasis Limited', divYield: 1.9, exchange: 'NSE' },
      'KPITTECH': { name: 'KPIT Technologies Ltd.', divYield: 0.3, exchange: 'NSE' },
      'TATAELXSI': { name: 'Tata Elxsi Ltd.', divYield: 0.9, exchange: 'NSE' },
      'LTTS': { name: 'L&T Technology Services Ltd.', divYield: 0.9, exchange: 'NSE' },
      'CYIENT': { name: 'Cyient Limited', divYield: 1.6, exchange: 'NSE' },
      'ZENSARTECH': { name: 'Zensar Technologies Ltd.', divYield: 1.2, exchange: 'NSE' },
      'HAPPSTMNDS': { name: 'Happiest Minds Technologies', divYield: 0.4, exchange: 'NSE' },
      'SONATSOFTW': { name: 'Sonata Software Ltd.', divYield: 1.3, exchange: 'NSE' },
      'BSOFT': { name: 'Birlasoft Ltd.', divYield: 0.9, exchange: 'NSE' },
      'MASTEK': { name: 'Mastek Ltd.', divYield: 0.7, exchange: 'NSE' },
      'INTELLECT': { name: 'Intellect Design Arena Ltd.', divYield: 0.4, exchange: 'NSE' },
      'RATEGAIN': { name: 'RateGain Travel Technologies', divYield: 0.0, exchange: 'NSE' },
      'MAPMYINDIA': { name: 'CE Info Systems Ltd (MapmyIndia)', divYield: 0.2, exchange: 'NSE' },
      'TANLA': { name: 'Tanla Platforms Ltd.', divYield: 1.5, exchange: 'NSE' },
      'AFFLE': { name: 'Affle (India) Ltd.', divYield: 0.0, exchange: 'NSE' },

      // 7. AUTOMOBILE & AUTO ANCILLARIES
      'TMPV': { name: 'Tata Motors Passenger Vehicles Ltd. (PV, EV & JLR)', divYield: 0.0, exchange: 'NSE' },
      'TMCV': { name: 'Tata Motors Limited (Commercial Vehicles - TMCV)', divYield: 0.7, exchange: 'NSE' },
      '544569': { name: 'Tata Motors Ltd. - Commercial Vehicles (BSE: 544569)', divYield: 0.7, exchange: 'BSE' },
      'TATAMOTORS': { name: 'Tata Motors (Demerged: See TMPV for PV/EV or TMCV for CV)', divYield: 0.7, exchange: 'NSE' },
      'MARUTI': { name: 'Maruti Suzuki India Ltd.', divYield: 1.0, exchange: 'NSE' },
      'M&M': { name: 'Mahindra & Mahindra Ltd.', divYield: 0.7, exchange: 'NSE' },
      'BAJAJ-AUTO': { name: 'Bajaj Auto Ltd.', divYield: 0.9, exchange: 'NSE' },
      'HEROMOTOCO': { name: 'Hero MotoCorp Ltd.', divYield: 2.8, exchange: 'NSE' },
      'TVSMOTOR': { name: 'TVS Motor Company Ltd.', divYield: 0.4, exchange: 'NSE' },
      'EICHERMOT': { name: 'Eicher Motors Ltd.', divYield: 1.1, exchange: 'NSE' },
      'MOTHERSON': { name: 'Samvardhana Motherson International', divYield: 0.4, exchange: 'NSE' },
      'BHARATFORG': { name: 'Bharat Forge Ltd.', divYield: 0.5, exchange: 'NSE' },
      'SONACOMS': { name: 'Sona BLW Precision Forgings', divYield: 0.3, exchange: 'NSE' },
      'TIINDIA': { name: 'Tube Investments of India Ltd.', divYield: 0.1, exchange: 'NSE' },
      'BOSCHLTD': { name: 'Bosch Limited', divYield: 1.2, exchange: 'NSE' },
      'MRF': { name: 'MRF Limited', divYield: 0.1, exchange: 'NSE' },
      'APOLLOTYRE': { name: 'Apollo Tyres Ltd.', divYield: 1.0, exchange: 'NSE' },
      'BALKRISIND': { name: 'Balkrishna Industries Ltd.', divYield: 0.6, exchange: 'NSE' },
      'CEATLTD': { name: 'CEAT Limited', divYield: 1.1, exchange: 'NSE' },
      'ENDURANCE': { name: 'Endurance Technologies Ltd.', divYield: 0.4, exchange: 'NSE' },
      'CRAFTSMAN': { name: 'Craftsman Automation Ltd.', divYield: 0.2, exchange: 'NSE' },
      'EXIDEIND': { name: 'Exide Industries Ltd.', divYield: 0.4, exchange: 'NSE' },
      'AMARAJABAT': { name: 'Amara Raja Energy & Mobility Ltd.', divYield: 0.8, exchange: 'NSE' },
      'SUNDRMFAST': { name: 'Sundram Fasteners Ltd.', divYield: 0.6, exchange: 'NSE' },
      'UNOMINDA': { name: 'Uno Minda Ltd.', divYield: 0.2, exchange: 'NSE' },

      // 8. PHARMACEUTICALS & HEALTHCARE
      'SUNPHARMA': { name: 'Sun Pharmaceutical Industries Ltd.', divYield: 0.7, exchange: 'NSE' },
      'CIPLA': { name: 'Cipla Limited', divYield: 0.9, exchange: 'NSE' },
      'DRREDDY': { name: 'Dr. Reddys Laboratories Ltd.', divYield: 0.6, exchange: 'NSE' },
      'DIVISLAB': { name: 'Divis Laboratories Ltd.', divYield: 0.5, exchange: 'NSE' },
      'LUPIN': { name: 'Lupin Limited', divYield: 0.4, exchange: 'NSE' },
      'AUROPHARMA': { name: 'Aurobindo Pharma Ltd.', divYield: 0.3, exchange: 'NSE' },
      'TORNTPHARM': { name: 'Torrent Pharmaceuticals Ltd.', divYield: 0.9, exchange: 'NSE' },
      'ZYDUSLIFE': { name: 'Zydus Lifesciences Ltd.', divYield: 0.3, exchange: 'NSE' },
      'MANKIND': { name: 'Mankind Pharma Ltd.', divYield: 0.0, exchange: 'NSE' },
      'ALKEM': { name: 'Alkem Laboratories Ltd.', divYield: 0.7, exchange: 'NSE' },
      'BIOCON': { name: 'Biocon Limited', divYield: 0.1, exchange: 'NSE' },
      'GLENMARK': { name: 'Glenmark Pharmaceuticals Ltd.', divYield: 0.2, exchange: 'NSE' },
      'IPCALAB': { name: 'IPCA Laboratories Ltd.', divYield: 0.3, exchange: 'NSE' },
      'AJANTPHARM': { name: 'Ajanta Pharma Ltd.', divYield: 0.9, exchange: 'NSE' },
      'NATCOPHARM': { name: 'Natco Pharma Ltd.', divYield: 0.6, exchange: 'NSE' },
      'GRANULES': { name: 'Granules India Ltd.', divYield: 0.3, exchange: 'NSE' },
      'JBCHEPHARM': { name: 'JB Chemicals & Pharmaceuticals', divYield: 0.9, exchange: 'NSE' },
      'LAURUSLABS': { name: 'Laurus Labs Ltd.', divYield: 0.2, exchange: 'NSE' },
      'SYNGENE': { name: 'Syngene International Ltd.', divYield: 0.2, exchange: 'NSE' },
      'APOLLOHOSP': { name: 'Apollo Hospitals Enterprise Ltd.', divYield: 0.2, exchange: 'NSE' },
      'FORTIS': { name: 'Fortis Healthcare Ltd.', divYield: 0.2, exchange: 'NSE' },
      'MAXHEALTH': { name: 'Max Healthcare Institute Ltd.', divYield: 0.0, exchange: 'NSE' },
      'MEDANTA': { name: 'Global Health Ltd. (Medanta)', divYield: 0.0, exchange: 'NSE' },
      'LALPATHLAB': { name: 'Dr. Lal PathLabs Ltd.', divYield: 0.7, exchange: 'NSE' },
      'METROPOLIS': { name: 'Metropolis Healthcare Ltd.', divYield: 0.4, exchange: 'NSE' },

      // 9. FMCG, RETAIL & CONSUMER
      'HINDUNILVR': { name: 'Hindustan Unilever Ltd.', divYield: 1.6, exchange: 'NSE' },
      'ITC': { name: 'ITC Limited', divYield: 2.8, exchange: 'NSE' },
      'NESTLEIND': { name: 'Nestle India Ltd.', divYield: 1.0, exchange: 'NSE' },
      'BRITANNIA': { name: 'Britannia Industries Ltd.', divYield: 1.3, exchange: 'NSE' },
      'TATACONSUM': { name: 'Tata Consumer Products Ltd.', divYield: 0.8, exchange: 'NSE' },
      'DABUR': { name: 'Dabur India Ltd.', divYield: 1.0, exchange: 'NSE' },
      'MARICO': { name: 'Marico Limited', divYield: 1.6, exchange: 'NSE' },
      'GODREJCP': { name: 'Godrej Consumer Products Ltd.', divYield: 0.9, exchange: 'NSE' },
      'COLPAL': { name: 'Colgate-Palmolive (India) Ltd.', divYield: 1.4, exchange: 'NSE' },
      'EMAMILTD': { name: 'Emami Limited', divYield: 1.2, exchange: 'NSE' },
      'VARUNBEV': { name: 'Varun Beverages Ltd.', divYield: 0.2, exchange: 'NSE' },
      'VBL': { name: 'Varun Beverages Ltd.', divYield: 0.2, exchange: 'NSE' },
      'RADICO': { name: 'Radico Khaitan Ltd.', divYield: 0.2, exchange: 'NSE' },
      'UNITEDSPR': { name: 'United Spirits Ltd.', divYield: 0.4, exchange: 'NSE' },
      'UBL': { name: 'United Breweries Ltd.', divYield: 0.5, exchange: 'NSE' },
      'JYOTHYLAB': { name: 'Jyothy Labs Ltd.', divYield: 0.8, exchange: 'NSE' },
      'BIKAJI': { name: 'Bikaji Foods International Ltd.', divYield: 0.1, exchange: 'NSE' },
      'HONASA': { name: 'Honasa Consumer Ltd. (Mamaearth)', divYield: 0.0, exchange: 'NSE' },
      'ZOMATO': { name: 'Eternal (Zomato) Ltd.', divYield: 0.0, exchange: 'NSE' },
      'SWIGGY': { name: 'Swiggy Limited', divYield: 0.0, exchange: 'NSE' },
      'DMART': { name: 'Avenue Supermarts Ltd. (DMart)', divYield: 0.0, exchange: 'NSE' },
      'TRENT': { name: 'Trent Limited (Westside/Zudio)', divYield: 0.1, exchange: 'NSE' },
      'TITAN': { name: 'Titan Company Ltd.', divYield: 0.3, exchange: 'NSE' },
      'KALYANKJIL': { name: 'Kalyan Jewellers India Ltd.', divYield: 0.2, exchange: 'NSE' },
      'PCJEWELLER': { name: 'PC Jeweller Ltd.', divYield: 0.0, exchange: 'NSE' },
      'SENCO': { name: 'Senco Gold Ltd.', divYield: 0.3, exchange: 'NSE' },
      'BATAINDIA': { name: 'Bata India Ltd.', divYield: 1.0, exchange: 'NSE' },
      'RELAXO': { name: 'Relaxo Footwears Ltd.', divYield: 0.3, exchange: 'NSE' },
      'CAMPUS': { name: 'Campus Activewear Ltd.', divYield: 0.0, exchange: 'NSE' },
      'METROBRAND': { name: 'Metro Brands Ltd.', divYield: 0.3, exchange: 'NSE' },
      'PAGEIND': { name: 'Page Industries Ltd. (Jockey)', divYield: 1.0, exchange: 'NSE' },
      'DEVYANI': { name: 'Devyani International Ltd. (KFC/PizzaHut)', divYield: 0.0, exchange: 'NSE' },
      'JUBLFOOD': { name: 'Jubilant FoodWorks Ltd. (Dominos)', divYield: 0.2, exchange: 'NSE' },
      'WESTLIFE': { name: 'Westlife Foodworld Ltd. (McDonalds)', divYield: 0.5, exchange: 'NSE' },
      'SAPPHIRE': { name: 'Sapphire Foods India Ltd. (KFC/PizzaHut)', divYield: 0.0, exchange: 'NSE' },
      'NYKAA': { name: 'FSN E-Commerce Ventures (Nykaa)', divYield: 0.0, exchange: 'NSE' },
      'PAYTM': { name: 'One97 Communications Ltd. (Paytm)', divYield: 0.0, exchange: 'NSE' },
      'POLICYBZR': { name: 'PB Fintech Ltd. (PolicyBazaar)', divYield: 0.0, exchange: 'NSE' },

      // 10. CHEMICALS, FERTILIZERS & PAINTS
      'TATACHEM': { name: 'Tata Chemicals Ltd.', divYield: 1.4, exchange: 'NSE' },
      'DEEPAKNTR': { name: 'Deepak Nitrite Ltd.', divYield: 0.3, exchange: 'NSE' },
      'SRF': { name: 'SRF Limited', divYield: 0.4, exchange: 'NSE' },
      'PIIND': { name: 'PI Industries Ltd.', divYield: 0.3, exchange: 'NSE' },
      'NAVINFLUOR': { name: 'Navin Fluorine International', divYield: 0.4, exchange: 'NSE' },
      'AARTIIND': { name: 'Aarti Industries Ltd.', divYield: 0.3, exchange: 'NSE' },
      'FLUOROCHEM': { name: 'Gujarat Fluorochemicals Ltd.', divYield: 0.1, exchange: 'NSE' },
      'ATUL': { name: 'Atul Limited', divYield: 0.4, exchange: 'NSE' },
      'FINEORG': { name: 'Fine Organic Industries Ltd.', divYield: 0.3, exchange: 'NSE' },
      'GUJALKALI': { name: 'Gujarat Alkalies & Chemicals', divYield: 0.5, exchange: 'NSE' },
      'ASTRAL': { name: 'Astral Limited', divYield: 0.2, exchange: 'NSE' },
      'SUPREMEIND': { name: 'Supreme Industries Ltd.', divYield: 0.8, exchange: 'NSE' },
      'COROMANDEL': { name: 'Coromandel International Ltd.', divYield: 0.8, exchange: 'NSE' },
      'CHAMBLFERT': { name: 'Chambal Fertilisers and Chemicals', divYield: 1.9, exchange: 'NSE' },
      'GNFC': { name: 'Gujarat Narmada Valley Fert & Chem', divYield: 2.5, exchange: 'NSE' },
      'GSFC': { name: 'Gujarat State Fertilizers & Chemicals', divYield: 1.7, exchange: 'NSE' },
      'RCF': { name: 'Rashtriya Chemicals & Fertilizers', divYield: 0.9, exchange: 'NSE' },
      'FACT': { name: 'Fertilisers and Chemicals Travancore', divYield: 0.0, exchange: 'NSE' },
      'UPL': { name: 'UPL Limited', divYield: 0.2, exchange: 'NSE' },
      'SUMICHEM': { name: 'Sumitomo Chemical India Ltd.', divYield: 0.3, exchange: 'NSE' },
      'CLEAN': { name: 'Clean Science and Technology', divYield: 0.4, exchange: 'NSE' },
      'ANUPAM': { name: 'Anupam Rasayan India Ltd.', divYield: 0.2, exchange: 'NSE' },
      'ASIANPAINT': { name: 'Asian Paints Ltd.', divYield: 1.1, exchange: 'NSE' },
      'BERGEPAINT': { name: 'Berger Paints India Ltd.', divYield: 0.6, exchange: 'NSE' },
      'KANSAINER': { name: 'Kansai Nerolac Paints Ltd.', divYield: 0.9, exchange: 'NSE' },
      'PIDILITIND': { name: 'Pidilite Industries Ltd. (Fevicol)', divYield: 0.5, exchange: 'NSE' },

      // 11. METALS, MINING & COMMODITIES
      'TATASTEEL': { name: 'Tata Steel Ltd.', divYield: 2.3, exchange: 'NSE' },
      'JSWSTEEL': { name: 'JSW Steel Ltd.', divYield: 0.8, exchange: 'NSE' },
      'SAIL': { name: 'Steel Authority of India Ltd.', divYield: 1.6, exchange: 'NSE' },
      'HINDALCO': { name: 'Hindalco Industries Ltd.', divYield: 0.6, exchange: 'NSE' },
      'VEDL': { name: 'Vedanta Limited', divYield: 6.8, exchange: 'NSE' },
      'NMDC': { name: 'NMDC Limited', divYield: 2.7, exchange: 'NSE' },
      'NATIONALUM': { name: 'National Aluminium Co Ltd.', divYield: 2.4, exchange: 'NSE' },
      'HINDZINC': { name: 'Hindustan Zinc Ltd.', divYield: 3.2, exchange: 'NSE' },
      'COALINDIA': { name: 'Coal India Ltd.', divYield: 5.6, exchange: 'NSE' },
      'APLAPOLLO': { name: 'APL Apollo Tubes Ltd.', divYield: 0.4, exchange: 'NSE' },
      'RATNAMANI': { name: 'Ratnamani Metals & Tubes Ltd.', divYield: 0.4, exchange: 'NSE' },
      'WELCORP': { name: 'Welspun Corp Ltd.', divYield: 0.7, exchange: 'NSE' },
      'JSL': { name: 'Jindal Stainless Ltd.', divYield: 0.5, exchange: 'NSE' },
      'MOIL': { name: 'MOIL Limited', divYield: 1.4, exchange: 'NSE' },
      'GMDC': { name: 'Gujarat Mineral Development Corp', divYield: 2.5, exchange: 'NSE' },

      // 12. OIL, GAS & PETROCHEMICALS
      'RELIANCE': { name: 'Reliance Industries Ltd.', divYield: 0.4, exchange: 'NSE' },
      'ONGC': { name: 'Oil & Natural Gas Corporation Ltd.', divYield: 4.8, exchange: 'NSE' },
      'IOC': { name: 'Indian Oil Corporation Ltd.', divYield: 4.2, exchange: 'NSE' },
      'BPCL': { name: 'Bharat Petroleum Corporation Ltd.', divYield: 5.1, exchange: 'NSE' },
      'HPCL': { name: 'Hindustan Petroleum Corporation Ltd.', divYield: 3.5, exchange: 'NSE' },
      'GAIL': { name: 'GAIL (India) Ltd.', divYield: 2.7, exchange: 'NSE' },
      'PETRONET': { name: 'Petronet LNG Ltd.', divYield: 3.1, exchange: 'NSE' },
      'IGL': { name: 'Indraprastha Gas Ltd.', divYield: 2.8, exchange: 'NSE' },
      'MGL': { name: 'Mahanagar Gas Ltd.', divYield: 2.1, exchange: 'NSE' },
      'GUJGASLTD': { name: 'Gujarat Gas Ltd.', divYield: 1.2, exchange: 'NSE' },
      'OIL': { name: 'Oil India Ltd.', divYield: 2.8, exchange: 'NSE' },
      'AEGISLOG': { name: 'Aegis Logistics Ltd.', divYield: 0.6, exchange: 'NSE' },

      // 13. CEMENT & INFRASTRUCTURE
      'ULTRACEMCO': { name: 'UltraTech Cement Ltd.', divYield: 0.6, exchange: 'NSE' },
      'AMBUJACEM': { name: 'Ambuja Cements Ltd.', divYield: 0.4, exchange: 'NSE' },
      'ACC': { name: 'ACC Limited', divYield: 0.4, exchange: 'NSE' },
      'SHREECEM': { name: 'Shree Cement Ltd.', divYield: 0.4, exchange: 'NSE' },
      'DALBHARAT': { name: 'Dalmia Bharat Ltd.', divYield: 0.4, exchange: 'NSE' },
      'JKCEMENT': { name: 'JK Cement Ltd.', divYield: 0.4, exchange: 'NSE' },
      'RAMCOCEM': { name: 'The Ramco Cements Ltd.', divYield: 0.3, exchange: 'NSE' },
      'HEIDELBERG': { name: 'HeidelbergCement India Ltd.', divYield: 3.8, exchange: 'NSE' },
      'PRISMJOHN': { name: 'Prism Johnson Ltd.', divYield: 0.0, exchange: 'NSE' },
      'STARCEMENT': { name: 'Star Cement Ltd.', divYield: 0.0, exchange: 'NSE' },
      'LT': { name: 'Larsen & Toubro Ltd.', divYield: 1.0, exchange: 'NSE' },
      'NBCC': { name: 'NBCC (India) Ltd.', divYield: 0.5, exchange: 'NSE' },
      'KNRCON': { name: 'KNR Constructions Ltd.', divYield: 0.1, exchange: 'NSE' },
      'PNCINFRA': { name: 'PNC Infratech Ltd.', divYield: 0.1, exchange: 'NSE' },
      'ASHOKA': { name: 'Ashoka Buildcon Ltd.', divYield: 0.0, exchange: 'NSE' },
      'IRB': { name: 'IRB Infrastructure Developers', divYield: 0.3, exchange: 'NSE' },

      // 14. SUGAR & BIOFUELS
      'BALRAMCHIN': { name: 'Balrampur Chini Mills Ltd.', divYield: 0.6, exchange: 'NSE' },
      'RENUKA': { name: 'Shree Renuka Sugars Ltd.', divYield: 0.0, exchange: 'NSE' },
      'EIDPARRY': { name: 'E.I.D. - Parry (India) Ltd.', divYield: 0.5, exchange: 'NSE' },
      'DHAMPURSUG': { name: 'Dhampur Sugar Mills Ltd.', divYield: 1.5, exchange: 'NSE' },
      'TRIVENI': { name: 'Triveni Engineering & Industries', divYield: 0.9, exchange: 'NSE' },
      'DCMSRIND': { name: 'DCM Shriram Industries Ltd.', divYield: 1.0, exchange: 'NSE' },
      'PRAJSIND': { name: 'Praj Industries Ltd. (Biofuels)', divYield: 0.8, exchange: 'NSE' },

      // 15. REAL ESTATE & REITS
      'DLF': { name: 'DLF Limited', divYield: 0.6, exchange: 'NSE' },
      'GODREJPROP': { name: 'Godrej Properties Ltd.', divYield: 0.0, exchange: 'NSE' },
      'MACROTECH': { name: 'Macrotech Developers Ltd. (Lodha)', divYield: 0.1, exchange: 'NSE' },
      'OBEROREALTY': { name: 'Oberoi Realty Ltd.', divYield: 0.4, exchange: 'NSE' },
      'PRESTIGE': { name: 'Prestige Estates Projects Ltd.', divYield: 0.1, exchange: 'NSE' },
      'BRIGADE': { name: 'Brigade Enterprises Ltd.', divYield: 0.2, exchange: 'NSE' },
      'SOBHA': { name: 'Sobha Limited', divYield: 0.2, exchange: 'NSE' },
      'PHOENIXLTD': { name: 'The Phoenix Mills Ltd.', divYield: 0.2, exchange: 'NSE' },

      // 16. TELECOM, MEDIA & TEXTILES
      'BHARTIARTL': { name: 'Bharti Airtel Ltd.', divYield: 0.6, exchange: 'NSE' },
      'IDEA': { name: 'Vodafone Idea Ltd.', divYield: 0.0, exchange: 'NSE' },
      'INDUSTOWER': { name: 'Indus Towers Ltd.', divYield: 3.1, exchange: 'NSE' },
      'TATACOMM': { name: 'Tata Communications Ltd.', divYield: 1.0, exchange: 'NSE' },
      'ZEEL': { name: 'Zee Entertainment Enterprises Ltd.', divYield: 0.0, exchange: 'NSE' },
      'SUNTV': { name: 'Sun TV Network Ltd.', divYield: 2.1, exchange: 'NSE' },
      'PVRINOX': { name: 'PVR INOX Limited', divYield: 0.0, exchange: 'NSE' },
      'NAZARA': { name: 'Nazara Technologies Ltd. (Gaming)', divYield: 0.0, exchange: 'NSE' },
      'RAYMOND': { name: 'Raymond Limited', divYield: 0.3, exchange: 'NSE' },
      'KPRMILL': { name: 'K.P.R. Mill Limited', divYield: 0.5, exchange: 'NSE' },
      'TRIDENT': { name: 'Trident Limited', divYield: 1.0, exchange: 'NSE' },
      'ALOKINDS': { name: 'Alok Industries Ltd.', divYield: 0.0, exchange: 'NSE' },
      'WELSPUNLIV': { name: 'Welspun Living Ltd.', divYield: 0.4, exchange: 'NSE' }
    };

    // Smart Multi-Token & Prioritized Indian Stock Search (Matches both Symbol and Company Name)
    // Master In-Memory Stocks Catalog (loaded from data/stocks.json with 6,000+ NSE & BSE stocks)
    

    // Smart Multi-Token & Prioritized Indian Stock Search (Dual Exchange: NSE & BSE)
    // Master In-Memory Stocks Catalog (loaded from data/stocks.json with 6,000+ NSE & BSE stocks)
    

    // Smart Multi-Token & Prioritized Indian Stock Search (Dual Exchange: NSE & BSE)
    // Master In-Memory Stocks Catalog (loaded from data/stocks.json with 6,000+ NSE & BSE stocks)
    

    // Smart Multi-Token & Prioritized Indian Stock Search (Dual Exchange: NSE & BSE)
    var ALL_STOCKS_LIST = window.ALL_STOCKS_LIST || [];

    function searchIndianStocks(query) {
      const qRaw = (query || '').trim();
      if (!qRaw) return [];
      const q = qRaw.toUpperCase();
      const tokens = q.split(/[\s,.-]+/).filter(Boolean);

      // Search external catalog if loaded, or fallback to INDIAN_STOCK_DIRECTORY
      const sourceList = (typeof ALL_STOCKS_LIST !== 'undefined' && ALL_STOCKS_LIST && ALL_STOCKS_LIST.length > 0)
        ? ALL_STOCKS_LIST
        : Object.entries(INDIAN_STOCK_DIRECTORY).map(([sym, d]) => ({
            s: sym,
            alt: d.altSymbol || d.bseCode || '',
            bseCode: d.bseCode || (d.exchange === 'BSE' ? sym : ''),
            n: d.name,
            ex: d.exchange || 'NSE',
            grp: d.group || 'A',
            div: d.divYield !== undefined ? d.divYield : 1.2
          }));

      const exact = [];
      const starts = [];
      const tokenMatch = [];
      const seen = new Set();

      for (let i = 0; i < sourceList.length; i++) {
        const item = sourceList[i];
        const s = (item.s || '').toUpperCase();
        const alt = (item.alt || item.altSymbol || '').toUpperCase();
        const bse = (item.bseCode || '').toUpperCase();
        const ex = item.ex || item.exchange || 'NSE';
        const key = s + '_' + ex;
        if (seen.has(key)) continue;

        if (s === q || alt === q || bse === q) {
          exact.push(item);
          seen.add(key);
        }
      }

      for (let i = 0; i < sourceList.length; i++) {
        const item = sourceList[i];
        const s = (item.s || '').toUpperCase();
        const alt = (item.alt || item.altSymbol || '').toUpperCase();
        const bse = (item.bseCode || '').toUpperCase();
        const ex = item.ex || item.exchange || 'NSE';
        const key = s + '_' + ex;
        if (seen.has(key)) continue;

        if (s.startsWith(q) || alt.startsWith(q) || bse.startsWith(q)) {
          starts.push(item);
          seen.add(key);
        }
      }

      for (let i = 0; i < sourceList.length; i++) {
        const item = sourceList[i];
        const s = (item.s || '').toUpperCase();
        const alt = (item.alt || item.altSymbol || '').toUpperCase();
        const bse = (item.bseCode || '').toUpperCase();
        const n = (item.n || item.name || '').toUpperCase();
        const ex = item.ex || item.exchange || 'NSE';
        const key = s + '_' + ex;
        if (seen.has(key)) continue;

        const allTokens = tokens.every(t => s.includes(t) || alt.includes(t) || bse.includes(t) || n.includes(t));
        if (allTokens) {
          tokenMatch.push(item);
          seen.add(key);
        }
      }

      // Priority sort: Group A first, then Group B, then others
      const sortGroup = (a, b) => {
        const gA = (a.grp || a.group) === 'A' ? 0 : ((a.grp || a.group) === 'B' ? 1 : 2);
        const gB = (b.grp || b.group) === 'A' ? 0 : ((b.grp || b.group) === 'B' ? 1 : 2);
        return gA - gB;
      };

      exact.sort(sortGroup);
      starts.sort(sortGroup);
      tokenMatch.sort(sortGroup);

      const combined = [...exact, ...starts, ...tokenMatch].slice(0, 15);
      return combined.map(item => {
        const sym = item.s || item.symbol;
        const data = {
          name: item.n || item.name,
          exchange: item.ex || item.exchange || 'NSE',
          altSymbol: item.alt || item.altSymbol || '',
          bseCode: item.bseCode || (item.ex === 'BSE' ? sym : ''),
          group: item.grp || item.group || 'A',
          isin: item.isin || '',
          divYield: item.div !== undefined ? item.div : (item.divYield !== undefined ? item.divYield : 1.2)
        };
        return [sym, data];
      });
    }

    const POPULAR_MF_DIRECTORY = {
      // 1. MOTILAL OSWAL
      '145552': { name: 'Motilal Oswal Midcap Fund - Direct Plan - Growth', nav: 98.40 },
      '145551': { name: 'Motilal Oswal Midcap Fund - Regular Plan - Growth', nav: 88.20 },
      '147743': { name: 'Motilal Oswal Large and Midcap Fund - Direct Plan - Growth', nav: 42.00 },
      '145556': { name: 'Motilal Oswal Nasdaq 100 FOF - Direct Plan - Growth', nav: 38.00 },
      '145554': { name: 'Motilal Oswal Flexi Cap Fund - Direct Plan - Growth', nav: 54.20 },
      '147683': { name: 'Motilal Oswal Nifty Midcap 150 Index Fund - Direct Plan - Growth', nav: 36.80 },
      '147685': { name: 'Motilal Oswal Nifty Smallcap 250 Index Fund - Direct Plan - Growth', nav: 34.50 },
      '147687': { name: 'Motilal Oswal Nifty 500 Index Fund - Direct Plan - Growth', nav: 28.40 },
      '147689': { name: 'Motilal Oswal S&P 500 Index Fund - Direct Plan - Growth', nav: 22.60 },
      '150123': { name: 'Motilal Oswal Small Cap Fund - Direct Plan - Growth', nav: 18.20 },
      '145558': { name: 'Motilal Oswal ELSS Tax Saver Fund - Direct Plan - Growth', nav: 44.50 },
      '145560': { name: 'Motilal Oswal Focused Fund - Direct Plan - Growth', nav: 48.10 },

      // 2. PARAG PARIKH (PPFAS)
      '122639': { name: 'Parag Parikh Flexi Cap Fund - Direct Plan - Growth', nav: 78.85 },
      '122640': { name: 'Parag Parikh Flexi Cap Fund - Regular Plan - Growth', nav: 72.30 },
      '147285': { name: 'Parag Parikh Tax Saver Fund - Direct Plan - Growth', nav: 32.40 },
      '148768': { name: 'Parag Parikh Conservative Hybrid Fund - Direct Plan - Growth', nav: 15.20 },
      '145110': { name: 'Parag Parikh Liquid Fund - Direct Plan - Growth', nav: 1320.00 },
      '151890': { name: 'Parag Parikh Dynamic Asset Allocation Fund - Direct Plan - Growth', nav: 12.40 },

      // 3. NIPPON INDIA
      '125497': { name: 'Nippon India Small Cap Fund - Direct Growth', nav: 148.90 },
      '120739': { name: 'Nippon India Growth Fund (Midcap) - Direct Plan - Growth', nav: 3850.00 },
      '120722': { name: 'Nippon India Multi Cap Fund - Direct Plan - Growth', nav: 285.00 },
      '120720': { name: 'Nippon India Large Cap Fund - Direct Plan - Growth', nav: 84.50 },
      '120712': { name: 'Nippon India Flexi Cap Fund - Direct Plan - Growth', nav: 18.60 },
      '120743': { name: 'Nippon India Index Fund - Nifty 50 Plan - Direct - Growth', nav: 42.50 },
      '120745': { name: 'Nippon India Index Fund - S&P BSE Sensex Plan - Direct - Growth', nav: 44.80 },
      '144426': { name: 'Nippon India ETF Nifty BeES', nav: 268.00 },
      '144428': { name: 'Nippon India ETF Bank BeES', nav: 520.00 },
      '144430': { name: 'Nippon India ETF Gold BeES', nav: 72.50 },
      '144432': { name: 'Nippon India ETF Silver BeES', nav: 98.00 },
      '120714': { name: 'Nippon India Power & Infra Fund - Direct Plan - Growth', nav: 320.00 },
      '120716': { name: 'Nippon India Pharma Fund - Direct Plan - Growth', nav: 520.00 },

      // 4. SBI MUTUAL FUND
      '119598': { name: 'SBI Bluechip Fund - Direct Plan - Growth', nav: 86.40 },
      '125494': { name: 'SBI Small Cap Fund - Direct Plan - Growth', nav: 178.00 },
      '119597': { name: 'SBI Contra Fund - Direct Plan - Growth', nav: 410.00 },
      '119596': { name: 'SBI Magnum Midcap Fund - Direct Plan - Growth', nav: 225.00 },
      '119599': { name: 'SBI Focused Equity Fund - Direct Plan - Growth', nav: 320.00 },
      '119601': { name: 'SBI Flexicap Fund - Direct Plan - Growth', nav: 110.00 },
      '120152': { name: 'SBI Nifty Index Fund - Direct Plan - Growth', nav: 215.00 },
      '119603': { name: 'SBI Long Term Equity Fund (ELSS) - Direct Plan - Growth', nav: 420.00 },
      '119605': { name: 'SBI Healthcare Opportunities Fund - Direct Plan - Growth', nav: 380.00 },
      '119607': { name: 'SBI Technology Opportunities Fund - Direct Plan - Growth', nav: 210.00 },
      '119609': { name: 'SBI Equity Hybrid Fund - Direct Plan - Growth', nav: 275.00 },

      // 5. HDFC MUTUAL FUND
      '120465': { name: 'HDFC Top 100 Fund - Direct Plan - Growth', nav: 1050.00 },
      '120505': { name: 'HDFC Mid-Cap Opportunities Fund - Direct Plan - Growth', nav: 185.00 },
      '120503': { name: 'HDFC Small Cap Fund - Direct Plan - Growth', nav: 142.00 },
      '118955': { name: 'HDFC Flexi Cap Fund - Direct Plan - Growth', nav: 1950.00 },
      '118968': { name: 'HDFC Balanced Advantage Fund - Direct Plan - Growth', nav: 520.00 },
      '120531': { name: 'HDFC Index Fund - S&P BSE SENSEX Plan - Direct - Growth', nav: 720.00 },
      '120533': { name: 'HDFC Index Fund - NIFTY 50 Plan - Direct - Growth', nav: 230.00 },
      '120535': { name: 'HDFC ELSS Tax saver - Direct Plan - Growth', nav: 1250.00 },
      '120537': { name: 'HDFC Large and Mid Cap Fund - Direct Plan - Growth', nav: 340.00 },
      '120539': { name: 'HDFC Capital Builder Value Fund - Direct Plan - Growth', nav: 710.00 },
      '120541': { name: 'HDFC Infrastructure Fund - Direct Plan - Growth', nav: 48.00 },
      '120543': { name: 'HDFC Defence Fund - Direct Plan - Growth', nav: 22.50 },

      // 6. ICICI PRUDENTIAL
      '118989': { name: 'ICICI Prudential Bluechip Fund - Direct Plan - Growth', nav: 108.50 },
      '120586': { name: 'ICICI Prudential Value Discovery Fund - Direct Plan - Growth', nav: 430.00 },
      '120588': { name: 'ICICI Prudential Smallcap Fund - Direct Plan - Growth', nav: 82.00 },
      '120743': { name: 'ICICI Prudential Nifty 50 Index Fund - Direct Plan - Growth', nav: 260.00 },
      '120594': { name: 'ICICI Prudential Technology Fund - Direct Plan - Growth', nav: 215.00 },
      '120596': { name: 'ICICI Prudential Equity & Debt Fund - Direct Plan - Growth', nav: 390.00 },
      '120598': { name: 'ICICI Prudential Multi-Asset Fund - Direct Plan - Growth', nav: 710.00 },
      '120600': { name: 'ICICI Prudential India Opportunities Fund - Direct Plan - Growth', nav: 34.00 },
      '120602': { name: 'ICICI Prudential Large & Mid Cap Fund - Direct Plan - Growth', nav: 840.00 },
      '120604': { name: 'ICICI Prudential Commodities Fund - Direct Plan - Growth', nav: 42.00 },
      '120606': { name: 'ICICI Prudential Bharat 22 FOF - Direct - Growth', nav: 28.50 },

      // 7. MIRAE ASSET
      '118834': { name: 'Mirae Asset Large Cap Fund - Direct Plan - Growth', nav: 114.60 },
      '147318': { name: 'Mirae Asset Midcap Fund - Direct Plan - Growth', nav: 38.90 },
      '118825': { name: 'Mirae Asset Great Consumer Fund - Direct Plan - Growth', nav: 88.50 },
      '147320': { name: 'Mirae Asset ELSS Tax Saver Fund - Direct Plan - Growth', nav: 48.20 },
      '147322': { name: 'Mirae Asset Focused Fund - Direct Plan - Growth', nav: 31.00 },
      '147324': { name: 'Mirae Asset Healthcare Fund - Direct Plan - Growth', nav: 42.50 },
      '147326': { name: 'Mirae Asset Nifty 50 Index Fund - Direct Plan - Growth', nav: 28.00 },
      '147328': { name: 'Mirae Asset Artificial Intelligence FOF - Direct Plan - Growth', nav: 22.00 },

      // 8. QUANT MUTUAL FUND
      '120828': { name: 'Quant Small Cap Fund - Direct Plan - Growth', nav: 265.00 },
      '120847': { name: 'Quant Active Fund - Direct Plan - Growth', nav: 640.00 },
      '120844': { name: 'Quant Mid Cap Fund - Direct Plan - Growth', nav: 240.00 },
      '120823': { name: 'Quant Flexi Cap Fund - Direct Plan - Growth', nav: 105.00 },
      '120839': { name: 'Quant Infrastructure Fund - Direct Plan - Growth', nav: 42.00 },
      '120841': { name: 'Quant ELSS Tax Saver Fund - Direct Plan - Growth', nav: 410.00 },
      '120843': { name: 'Quant Multi Asset Fund - Direct Plan - Growth', nav: 145.00 },
      '120845': { name: 'Quant Manufacturing Fund - Direct Plan - Growth', nav: 18.50 },
      '120849': { name: 'Quant Large and Mid Cap Fund - Direct Plan - Growth', nav: 125.00 },

      // 9. AXIS MUTUAL FUND
      '120503': { name: 'Axis Bluechip Fund - Direct Plan - Growth', nav: 58.20 },
      '125354': { name: 'Axis Small Cap Fund - Direct Plan - Growth', nav: 105.00 },
      '120466': { name: 'Axis Midcap Fund - Direct Plan - Growth', nav: 108.00 },
      '120492': { name: 'Axis ELSS Tax Saver Fund - Direct Plan - Growth', nav: 98.00 },
      '120494': { name: 'Axis Flexi Cap Fund - Direct Plan - Growth', nav: 28.00 },
      '120496': { name: 'Axis Growth Opportunities Fund - Direct Plan - Growth', nav: 32.00 },
      '120498': { name: 'Axis Nifty 50 Index Fund - Direct Plan - Growth', nav: 18.50 },

      // 10. UTI MUTUAL FUND
      '120716': { name: 'UTI Nifty 50 Index Fund - Direct Plan - Growth', nav: 172.50 },
      '120718': { name: 'UTI Nifty Next 50 Index Fund - Direct Plan - Growth', nav: 78.00 },
      '120703': { name: 'UTI Flexi Cap Fund - Direct Plan - Growth', nav: 310.00 },
      '120705': { name: 'UTI Mid Cap Fund - Direct Plan - Growth', nav: 320.00 },
      '120707': { name: 'UTI Value Opportunities Fund - Direct Plan - Growth', nav: 155.00 },

      // 11. KOTAK MUTUAL FUND
      '119062': { name: 'Kotak Emerging Equity Fund (Midcap) - Direct Plan - Growth', nav: 128.00 },
      '119065': { name: 'Kotak Small Cap Fund - Direct Plan - Growth', nav: 285.00 },
      '119063': { name: 'Kotak Flexicap Fund - Direct Plan - Growth', nav: 82.00 },
      '119067': { name: 'Kotak Bluechip Fund - Direct Plan - Growth', nav: 520.00 },
      '119069': { name: 'Kotak Equity Opportunities Fund - Direct Plan - Growth', nav: 340.00 },
      '119071': { name: 'Kotak ELSS Tax Saver Fund - Direct Plan - Growth', nav: 145.00 },

      // 12. TATA MUTUAL FUND
      '135781': { name: 'Tata Digital India Fund - Direct Plan - Growth', nav: 54.00 },
      '145112': { name: 'Tata Small Cap Fund - Direct Plan - Growth', nav: 42.50 },
      '145114': { name: 'Tata Mid Cap Growth Fund - Direct Plan - Growth', nav: 410.00 },
      '145116': { name: 'Tata Ethical Fund - Direct Plan - Growth', nav: 460.00 },
      '145118': { name: 'Tata Balanced Advantage Fund - Direct Plan - Growth', nav: 21.00 },

      // 13. BANDHAN (IDFC)
      '147879': { name: 'Bandhan Small Cap Fund - Direct Plan - Growth', nav: 44.00 },
      '147881': { name: 'Bandhan Sterling Value Fund - Direct Plan - Growth', nav: 160.00 },
      '147883': { name: 'Bandhan Core Equity Fund - Direct Plan - Growth', nav: 120.00 },
      '147885': { name: 'Bandhan Nifty 50 Index Fund - Direct Plan - Growth', nav: 22.00 },

      // 14. CANARA ROBECO
      '118778': { name: 'Canara Robeco Emerging Equities - Direct Plan - Growth', nav: 240.00 },
      '146193': { name: 'Canara Robeco Small Cap Fund - Direct Plan - Growth', nav: 41.00 },
      '118780': { name: 'Canara Robeco Bluechip Equity Fund - Direct Plan - Growth', nav: 62.00 },
      '118782': { name: 'Canara Robeco Flexi Cap Fund - Direct Plan - Growth', nav: 310.00 },

      // 15. DSP MUTUAL FUND
      '119232': { name: 'DSP Midcap Fund - Direct Plan - Growth', nav: 138.00 },
      '119239': { name: 'DSP Small Cap Fund - Direct Plan - Growth', nav: 175.00 },
      '119241': { name: 'DSP Flexi Cap Fund - Direct Plan - Growth', nav: 98.00 },
      '119243': { name: 'DSP Healthcare Fund - Direct Plan - Growth', nav: 42.00 },
      '119245': { name: 'DSP Top 100 Equity Fund - Direct Plan - Growth', nav: 410.00 },

      // 16. OTHER POPULAR DIRECT SCHEMES
      '143926': { name: 'Edelweiss Recently Listed IPO Fund - Direct - Growth', nav: 36.00 },
      '143928': { name: 'Edelweiss Mid Cap Fund - Direct Plan - Growth', nav: 98.00 },
      '143930': { name: 'Edelweiss Small Cap Fund - Direct Plan - Growth', nav: 42.00 },
      '120282': { name: 'Franklin India Smaller Companies Fund - Direct - Growth', nav: 185.00 },
      '120284': { name: 'Franklin India Flexi Cap Fund - Direct - Growth', nav: 1650.00 },
      '120286': { name: 'Invesco India Contra Fund - Direct Plan - Growth', nav: 142.00 },
      '120288': { name: 'WhiteOak Capital Flexi Cap Fund - Direct Plan - Growth', nav: 21.00 },
      '120290': { name: 'Sundaram Mid Cap Fund - Direct Plan - Growth', nav: 1250.00 },
      '120292': { name: 'HSBC Small Cap Fund - Direct Plan - Growth', nav: 88.00 }
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

