const express = require('express');
const path = require('path');
const cors = require('cors');
const { scrapeTrainData } = require('./scraper');
const { img } = require('framer-motion/client');
const scrapeHotelDetails = require('./scrapeHotel'); 
const app = express();
const PORT = 7000;

// Enable CORS for all origins
app.use(cors());

// Serve static images from the 'ImageSlider' folder
app.use('/images', express.static(path.join(__dirname, 'ImageSlider')));

// Image slider data
const imageSliderData = [
    {
        id: 1,
        place: "Taj Mahal, Agra",
        image: "/images/taj mahal.jpg"
    },
    {
        id: 2,
        place: "Red Fort, Delhi",
        image: "/images/redfort.jpg"
    },
    {
        id: 3,
        place: "Qutub Minar, Delhi",
        image: "/images/Qutub Minar.jpg"
    },
    {
        id: 4,
        place: "Gateway of India, Mumbai",
        image: "/images/Gateway of India.jpg"
    },
    {
        id: 5,
        place: "Hawa Mahal, Jaipur",
        image: "/images/Hawa Mahal.jpg"
    }
];

// Endpoint to serve image slider data
app.get('/imageslider', (req, res) => {
    res.json(imageSliderData);
});

// Trending City Data
const cities = [
  {'id': 1,
    'title': 'Jaipur',
    'State' : 'Rajasthan',
    'src': 'https://images.unsplash.com/photo-1650530777057-3a7dbc24bf6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGphaXB1cnxlbnwwfDF8MHx8fDA%3D',
    'des': "Jaipur is the capital of the royal state of Rajasthan",
    'description':'Also called the Pink City, Jaipur is the capital of the royal state of Rajasthan. Along with Delhi and Agra, Jaipur forms the Golden Triangle and hails as one of the most famous tourist circuits in the country. ',
  },

   {'id': 2,
    'title': 'Delhi',
    'State': 'Delhi',
    'src': 'https://images.blacktomato.com/2024/08/Humayuns-Tomb-Delhi.jpg?auto=compress%2Cformat&ixlib=php-3.3.1&q=82&s=b1590c8a7df40b273d504fd40cc1ff04',
    'des': "Delhi is the capital and cosmopolitan city of India",
    'description': 'The capital of India, Delhi is a cosmopolitan city with a historic old Delhi and the modern New Delhi. From historical monuments to crowded shopping malls, from an extensive network of the modern metro system to Delhi University campus, Dilli has multiple personalities and is considered to be the city with a heart',
  },
  {'id': 3,
    'title': 'Chennai',
    'State': 'Tamil Nadu',
    'src': 'https://images.blacktomato.com/2023/02/Tamil-Nadu-scaled.jpg?auto=compress%2Cformat&ixlib=php-3.3.1&q=82&s=53c6067a2870527555ca8b097f5b67fb'
    ,'des':"Chennai is the cultural capital of India.", 
  },
  {'id': 4,
    'title': 'Darjeeling',
    'State': 'West Bengal',
    'src': 'https://media.istockphoto.com/id/490431152/photo/tea-pickers-on-green-tea-fields-in-srilanka-nuwara-eliya.jpg?s=612x612&w=0&k=20&c=5d-38q1K7gC_4_6iQROXw45gbmMuhHmQ2CinkCrow8g=','description': 'The previous summer capital of India under the British Raj, Darjeeling has come off age as one of the most sought after hill stations in India. Located in West Bengal, this scenic hill station is the perfect getaway for a romantic honeymoon',
    'des': "Darjeeling is the summer capital of India under the British Raj",
  },
  {'id': 5,
    'title': 'Varanasi',
    'State': 'Uttar Pradesh',
    'src': 'https://media.istockphoto.com/id/865075520/photo/holy-town-varanasi-and-the-river-ganges.jpg?s=612x612&w=0&k=20&c=Y2b23ooCMjdBJSswzeIjvUMrhdJ9bEHndSYc_9IJlb0=',
    'description': 'Worlds oldest living city, Varanasi - also known as Kashi (City of Life) and Benaras, is the spiritual capital of India. It is one of Hinduisms seven holy cities. The old city of Varanasi lies along the western banks of the Ganges, spread across a labyrinth of narrow galis.'
  },
  {'id': 6,
    'title': 'Goa',
    'State': 'Goa',
    'src': 'https://media.istockphoto.com/id/157579910/photo/the-beach.jpg?s=612x612&w=0&k=20&c=aMk67AmzIVD_S1Nibww8ytUdyub2ck3HNQ3uTvuPWPI='},
   {'id': 7,
    'title': 'Ooty',
    'State': 'Tamil Nadu',
    'src': 'https://media.istockphoto.com/id/537064629/photo/tea-plantations-around-the-emerald-lake-in-ooty.jpg?s=612x612&w=0&k=20&c=yEjt_jKZXxSFTvD97YmFUEXWdhVfuu4-7LAkgheVPBE='},
   {'id': 8,
    'title': 'Ujjain',
    'State': 'Madhya Pradesh',
    'src': 'https://media.istockphoto.com/id/2176711375/photo/dramatic-idol-of-hindu-holy-god-lord-shiva-sitting-in-mediation-at-outdoor-at-night.jpg?s=612x612&w=0&k=20&c=wwwSAVnHNG02TShEDDoK3aLjGzop78zV5vVR5MiSVJM='},
   {'id': 9,
    'title': 'Shimla',
    'State': 'Himachal Pradesh',
    'src': 'https://media.istockphoto.com/id/533725751/photo/kufri-shimla.jpg?s=612x612&w=0&k=20&c=aTGqxsP9djH46my_uerxC42N3ZU0zIyRfUb4Cjnjx3E='},
   {'id': 10,
    'title': 'Amritsar',
    'State': 'Punjab',
    'src': 'https://media.istockphoto.com/id/535570117/photo/golden-temple-in-amritsar-punjab-india.jpg?s=612x612&w=0&k=20&c=TAgZK64Qz6YsljOK1rXZrrW1u1YSlb9e_YBEmm2pfBw='},
   {'id': 11,
    'title': 'Rishikesh',
    'State': 'Uttarakhand',
    'src': 'https://media.istockphoto.com/id/498465035/photo/path-to-eternity.jpg?s=612x612&w=0&k=20&c=4bitsh4rl4scNY4yR5vIlx59VX904FUagOnoEKYKm9c='},
   {'id': 12,
    'title': 'Srinagar',
    'State': 'Jammu and Kashmir',
    'src': 'https://media.istockphoto.com/id/1297561697/photo/srinagar-leh-highway-in-the-mountains-of-ladakh-india.jpg?s=612x612&w=0&k=20&c=usqAOjC_Q7TllKCk4Qc4vAGv8nZa7CozsZh-aV07Mkc='},
   {'id': 13,
    'title': 'Hyderabad',
    'State': 'Telangana',
    'src': 'https://media.istockphoto.com/id/1215274990/photo/high-wide-angle-view-of-charminar-in-the-night.jpg?s=612x612&w=0&k=20&c=byyIjqgbslf-L191n6SJu0s35fvNoVeWsxV5rIPK7Sk='},
   {'id': 14,
    'title': 'Bangalore',
    'State': 'Karnataka',
    'src': 'https://media.istockphoto.com/id/526897727/photo/bangalore-city-scape.jpg?s=612x612&w=0&k=20&c=2l8JgP2Tdc8cKbAbyvGNMEGfAOexBPR4FN3MgU6ylZg='},
   {'id': 15,
    'title': 'Manali',
    'State': 'Himachal Pradesh',
    'src': 'https://media.istockphoto.com/id/935681964/photo/paragliding-in-solang-valley.jpg?s=612x612&w=0&k=20&c=pGc2Z3lRRBbUq8CUKoDWlVNd7PrAeT4UC_9S2POuEGs='},
    {'id': 16,
      'title': 'Mumbai',
      'State': 'Maharashtra',
      'src': 'https://media.istockphoto.com/id/1390163309/photo/beautiful-gateway-of-india-near-taj-palace-hotel-on-the-mumbai-harbour-with-many-jetties-on.jpg?s=612x612&w=0&k=20&c=igVWcohJMrAiQamImAPMDxTyjjIeQJFVVGbKYllc9Gc=',
      'description': 'Mumbai, the capital city of the Indian state of Maharashtra, is a spectacular paradox of chaos and hope, glamour and squalor, modernity and tradition. Famously known as the City of Dreams, Mumbai â€“ formerly known as Bombay - Mumbai is a beautifully blended melting pot of cultures and lifestyles'
    },
   {'id': 17,
    'title': 'Gwalior',
    'State': 'Madhya Pradesh',
    'src': 'https://media.istockphoto.com/id/481494314/photo/gwalior-fort.jpg?s=612x612&w=0&k=20&c=Jb2GScmEwEwP0FplZswTCa4kmGUqOExjcWFY5H3vT4c='},
   {'id': 18,
    'title': 'Haridwar',
    'State': 'Uttarakhand',
    'src': 'https://media.istockphoto.com/id/825268350/photo/hardiwar.jpg?s=612x612&w=0&k=20&c=eCQt-N-2-wVm_imfNFtRyOPds8-NVLuoxTkHQ8N0ESg='},
   {'id': 19,
    'title': 'Mcleodganj',
    'State': 'Himachal Pradesh',
    'src': 'https://media.istockphoto.com/id/825741366/photo/dhaulandhar-range.jpg?s=612x612&w=0&k=20&c=C-U4aOTVjIL8rOvYTGZGMCEjdZAcnInNrDVoW7DRE3Y='},
   {'id': 20,
    'title': 'Kolkata',
    'State': 'West Bengal',
    'src': 'https://media.gettyimages.com/id/536118160/photo/howrah-bridge-in-kolkata.jpg?s=612x612&w=0&k=20&c=FCQbIrf-IR4YE_QgiIA0fy-dOABfAscsXzjW1of9Mw0='},
   {'id': 21,
    'title': 'Lakshadweep',
    'State': 'Lakshadweep',
    'src': 'https://media.istockphoto.com/id/1224349638/photo/coconut-fringed-beach.jpg?s=612x612&w=0&k=20&c=26FO8pa5zcKQdqjhitHZMAgCmF_B-wDD6MDV93v5j6o='},
   {'id': 22,
    'title': 'Udaipur',
    'State': 'Rajasthan',
    'src': 'https://media.gettyimages.com/id/155152863/photo/city-palace-in-udaipur-india.jpg?s=612x612&w=0&k=20&c=hNlSc0I6mh10EP67HERpFPiXaNcALWADQ9RtHK1BHhM='},
   {'id': 23,
    'title': 'Gangtok',
    'State': 'Sikkim',
    'src': 'https://media.gettyimages.com/id/1472599316/photo/high-angle-view-of-townscape-and-mountains-against-sky-gangtok-sikkim-india.jpg?s=612x612&w=0&k=20&c=Y5SxH-XI43NtDnyLn86BtN-0Uvn8jjKDC816XMnToco='},
   {'id': 24,
    'title': 'Alleppey (Alappuzha)',
    'State': 'Kerala',
    'src': 'https://media.gettyimages.com/id/1435366688/photo/kerala-backwaters-houseboat-trip.jpg?s=612x612&w=0&k=20&c=UwD5rDw2tGDxdtboWQ-Gux1-3Bz00yEqPeCHOhOAZzs='},
   {'id': 25,
    'title': 'Nainital',
    'State': 'Uttarakhand',
    'src': 'https://media.gettyimages.com/id/975828946/photo/mosque-nainital.jpg?s=612x612&w=0&k=20&c=A5efSWF4czjvPCEjU1IDeG0T3N-udrA9aWIBP_Ws0HI='},
   {'id': 26,
    'title': 'Lonavala',
    'State': 'Maharashtra',
    'src': 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Lonavalamh.jpg'},
   {'id': 27,
    'title': 'Mussoorie',
    'State': 'Uttarakhand',
    'src': 'https://media.gettyimages.com/id/464741705/photo/overhead-cable-car-in-motion-gun-hill-mussoorie-uttarakhand-india.jpg?s=612x612&w=0&k=20&c=8mgzYEvmt8ERR9_sSfR64HaVTqUtRQmXD10q7L18inI='},
   {'id': 28,
    'title': 'Kodaikanal',
    'State': 'Tamil Nadu',
    'src': 'https://media.gettyimages.com/id/478381237/photo/kodaikanal-lake-visitors-on-lake.jpg?s=612x612&w=0&k=20&c=NIy1MXicrue0Y5iNSnnb4pJaNkMOrh0Ta-XH_QPxEds='},
   {'id': 29,
    'title': 'Agra',
    'State': 'Uttar Pradesh',
    'src': 'https://media.gettyimages.com/id/901883368/photo/taj-mahal-in-agra.jpg?s=612x612&w=0&k=20&c=w4aoolLin8AtQiZWotfQFItLCghMU20C4ggZYOzOhvc='},
   {'id': 30,
    'title': 'Jodhpur',
    'State': 'Rajasthan',
    'src': 'https://media.gettyimages.com/id/533453030/photo/jodhpur-market.jpg?s=612x612&w=0&k=20&c=5SXm2PC35EpIPXJSBDTOudWp1fCro9MDpBYW1_IV5YM='},
   {'id': 31,
    'title': 'Jaisalmer',
    'State': 'Rajasthan',
    'src': 'https://media.gettyimages.com/id/541457170/photo/view-over-the-city-and-the-jaisalmer-fort.jpg?s=612x612&w=0&k=20&c=Rn8iDM1p88MKPgIB2o_hmCLEM0HGNDtVNUXSrW_H3Fc='},
   {'id': 32,
    'title': 'Pondicherry (Puducherry)',
    'State': 'Puducherry',
    'src': 'https://media.gettyimages.com/id/536063294/photo/the-city-of-pondicherry.jpg?s=612x612&w=0&k=20&c=a0r9kaxmUn3FC7Duw74RjMBFZAs3mPCG8O5cPkK9CsI='},
   {'id': 33,
    'title': 'Kanyakumari',
    'State': 'Tamil Nadu',
    'src': 'https://media.gettyimages.com/id/170054576/photo/church.jpg?s=612x612&w=0&k=20&c=lR-R67wjwtUp9PUEnNrU86vZYuRSoYJGbYpkMgTaodA='},
   {'id': 34,
    'title': 'Pune',
    'State': 'Maharashtra',
    'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrRFTivlUpRCCw0cdHvVeSHWWaFT9EngXX7A&s'},
   {'id': 35,
    'title': 'Kochi',
    'State': 'Kerala',
    'src': 'https://www.india.com/wp-content/uploads/2024/08/Fort-Kochi.jpg'},
   {'id': 36,
    'title': 'Ahmedabad',
    'State': 'Gujarat',
    'src': 'https://media.gettyimages.com/id/458697431/photo/makara-sankranti-festival.jpg?s=612x612&w=0&k=20&c=d3-ZhHxrs2_Oy_vd0uciImU8CWqpp9XPqunJX9FZyyM='},
   {'id': 37,
    'title': 'Mysore',
    'State': 'Karnataka',
    'src': 'https://media.gettyimages.com/id/595984024/photo/mysore-palace-decked-up-for-dasara.jpg?s=612x612&w=0&k=20&c=8F6UdZ3Y_ys4kM4uiaKfjohGC_9f6zSmEtkyVfC4gso='},
   {'id': 38,
    'title': 'Chandigarh',
    'State': 'Punjab',
    'src': 'https://media.gettyimages.com/id/1340249197/photo/views-of-sonmarg-valley.jpg?s=612x612&w=0&k=20&c=9OAZNLumSBXOt0Lgw_YEukxR-CcccKbhjvt2YSJTKaE='},
   {'id': 39,
    'title': 'Almora',
    'State': 'Uttarakhand',
    'src': 'https://t3.ftcdn.net/jpg/07/05/10/42/360_F_705104279_NjZiEuwRv3tihcEl1eu4eTWL1gybZBUu.jpg'},
   {'id': 40,
    'title': 'Shirdi',
    'State': 'Maharashtra',
    'src': 'https://media.gettyimages.com/id/936553578/photo/shirdi-sai-baba-temple-leicester-shirdi-sai-baba-murthi-united-kingdom.jpg?s=612x612&w=0&k=20&c=SpKQrzbO3_Q5Vwj6GalBsjG3Y_icRcBZprUb5IECU68='},
   {'id': 41,
    'title': 'Madurai',
    'State': 'Tamil Nadu',
    'src': 'https://media.gettyimages.com/id/1189145465/photo/meenakshi-temple-lights-turns-on-during-dazzling-twilight.jpg?s=612x612&w=0&k=20&c=3fY3mKo9r1YoIt4dsrivKV_N5MjRltJ9Yuy0KemysRQ='},
   {'id': 42,
    'title': 'Visakhapatnam',
    'State': 'Andhra Pradesh',
    'src': 'https://www.gingerhotels.com/resourcefiles/blogsmallimages/3-days-in-visakhaptnam-the-port-city.jpg'},
   {'id': 43,
    'title': 'Nashik',
    'State': 'Maharashtra',
    'src': 'https://img.traveltriangle.com/blog/wp-content/uploads/2020/01/cover-image-of-Places-To-Visit-In-Nashik_7th-jan.jpg'},
   {'id': 44,
    'title': 'Tirupati',
    'State': 'Andhra Pradesh',
    'src': 'https://media.gettyimages.com/id/640057988/photo/tirupati-balaji-temple-ahmedabad-gujarat.jpg?s=612x612&w=0&k=20&c=z0VwOkdZwEkiB6cIud7aA_TH2ruX5I0HfR-NH2ciFNU='},
   {'id': 45,
    'title': 'Mathura',
    'State': 'Uttar Pradesh',
    'src': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/2b/3e/9f/caption.jpg?w=500&h=400&s=1'},
   {'id': 46,
    'title': 'Alibaug',
    'State': 'Maharashtra',
    'src': 'https://etimg.etb2bimg.com/thumb/msid-106907676,imgsize-142794,width-1200,height=765,overlay-ettravel/destination/states/indias-longest-sea-bridge-in-mumbai-to-drive-investments-for-resort-homes-in-alibaug.jpg'},
   {'id': 47,
    'title': 'Rameswaram',
    'State': 'Tamil Nadu',
    'src': 'https://www.tamilnadutourism.tn.gov.in/img/pages/large-desktop/rameswaram-1655457953_09de320de48b98dece1a.webp'},
   {'id': 48,
    'title': 'Vrindavan',
    'State': 'Uttar Pradesh',
    'src': 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/b0/6d/6c/caption.jpg?w=500&h=400&s=1'},
   {'id': 49,
    'title': 'Coimbatore',
    'State': 'Tamil Nadu',
    'src': 'https://media.istockphoto.com/id/1524988243/photo/beautiful-landscape-view-of-hill-town-city-ooty-coimbatore-tamil-nadu-india.jpg?s=612x612&w=0&k=20&c=xRZF2xjjHGYIWHdiVB42tE52oH3Wlm3Gs4HTDxl5_GQ='},
   {'id': 50,
    'title': 'Lucknow',
    'State': 'Uttar Pradesh',
    'src': 'https://media.istockphoto.com/id/625724534/photo/inside-the-grounds-of-jama-masjid-mosque.jpg?s=612x612&w=0&k=20&c=9IPt51nP2vo_9i9KMb3FS9y12tkIukbjhmJHGpBlqOw='},
   {'id': 51,
    'title': 'Dharamshala',
    'State': 'Himachal Pradesh',
    'src': 'https://media.istockphoto.com/id/1187136225/photo/houses-on-dharamshala-mountains-himachal-pradesh-india.jpg?s=612x612&w=0&k=20&c=chAqGSBSL3-rcjbXQqIMStl2bIv947516ODgSCamnQg='},
   {'id': 52,
    'title': 'Agartala',
    'State': 'Tripura',
    'src': 'https://media.istockphoto.com/id/1340179874/photo/coconut-trees-red-buildings-lake-beautiful-campus-landscape.jpg?s=612x612&w=0&k=20&c=zkDmCvrNlUbn0LPhOGnyY_am44ySGuLK_9yr-_IWA5M='},
   {'id': 53,
    'title': 'Bhubaneswar',
    'State': 'Odisha',
    'src': 'https://media.istockphoto.com/id/586049140/photo/old-old-temple-in-bhubaneswar-india.jpg?s=612x612&w=0&k=20&c=NosPaJ12-Y_kP3_th7SjHP6Ug0qO3U9VZKGjku3aX-A='},
   {'id': 54,
    'title': 'Ajmer',
    'State': 'Rajasthan',
    'src': 'https://media.istockphoto.com/id/507425586/photo/the-artificial-lake-at-ajmer-rajasthan-below-the-aravalli-hills.jpg?s=612x612&w=0&k=20&c=wEBH1EmKH0KVhx_l85YiT1kwEpN51e40jwbQYItsDyA='},
   {'id': 55,
    'title': 'Aurangabad',
    'State': 'Uttar Pradesh',
    'src': 'https://media.istockphoto.com/id/2165734882/photo/scenic-views-of-india-aurangabad.jpg?s=612x612&w=0&k=20&c=3gs6SSfNrXJy_qOmCqjvL4pPsc7FiWSVOAM5GQuMArc='},
   {'id': 56,
    'title': 'Jammu',
    'State': 'Jammu and Kashmir',
    'src': 'https://media.istockphoto.com/id/1171962535/photo/srinagar-kashmir.jpg?s=612x612&w=0&k=20&c=5y9sU7boA-TFyr7LBVyfpmoKT9A2Y7WxA2tqdIE0zBw='},
   {'id': 57,
    'title': 'Dehradun',
    'State': 'Uttarakhand',
    'src': 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/c8/39/29.jpg'},
   {'id': 58,
    'title': 'Chittorgarh',
    'State': 'Rajasthan',
    'src': 'https://media.istockphoto.com/id/177294688/photo/panoramic-shot-of-cittorgarh-fort-india.jpg?s=612x612&w=0&k=20&c=DPNFHMhPGK3y3I6eD5ML2GIj3oAdxMYUm1cCKy-Zuo8='},
   ];
  
  // Endpoint to fetch trending cities
  app.get('/api/trendingcity', (req, res) => {
    res.json(cities);
  });
  




  const places = [
    {
      id: 1,
      title: 'Taj Mahal, Agra',
      src: "https://media.istockphoto.com/id/483076881/photo/taj-mahal-monument-agra-india.jpg?s=612x612&w=0&k=20&c=qZhHNlpXdtNIs-02GTv_o95A5VFR9bYEVJUMFWis1_A=",
    },
    {
      id: 2,
      title: 'Red Fort, Delhi',
      src: "https://plus.unsplash.com/premium_photo-1697730373510-51b7fcf2ff52?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: 'Amber Fort, Jaipur',
      src: "https://images.unsplash.com/photo-1599661046274-f1154c4ea62b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8QW1iZXIlMjBGb3J0JTJDJTIwSmFpcHVyfGVufDB8fDB8fHww",
    },
    {
      id: 4,
      title: 'Gateway of India, Mumbai',
      src: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8R2F0ZXdheSUyMG9mJTIwSW5kaWElMkMlMjBNdW1iYWl8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      title: 'Golden Temple, Gujrat',
      src: "https://media.istockphoto.com/id/153911430/photo/golden-temple-in-amritsar-punjab-india.jpg?s=612x612&w=0&k=20&c=APmEkx_AMoqzVqDJFjA6d8_R6poQcIIP5tt90yOMN-8=",
    },
    {
      id: 6,
      title: 'Mysore Palace, Mysore',
      src: "https://media.istockphoto.com/id/172207393/photo/india-amba-vilas-palace-mysore.jpg?s=612x612&w=0&k=20&c=by7BoRA2DG4HXVJlwtbn_E4cwLXD_NJZEjfu5dYxmrU=",
    },
    {
      id: 7,
      title: 'Statue of Unity, Vadodara',
      src: "data:image/jpeg;base64,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",
    },
    {
      id: 8,
      title: 'Mehrangarh Fort, Jodhpur',
      src: "https://media.istockphoto.com/id/583979180/photo/blue-city-and-mehrangarh-fort-on-the-hill-at-night.jpg?s=612x612&w=0&k=20&c=mPYii4J2aS79wjFwAXDqInlfSEQ7ACKBQ5IcXA3cz7E=",
    },
    {
      id: 9,
      title: 'Shree Mahakaleshwar Temple, Ujjain',
      src: "https://hblimg.mmtcdn.com/content/hubble/img/ujjain/mmt/activities/m_Shree%20Mahakaleshwar%20Temple-3_p_528_431.jpg",
    },
    {
      id: 10,
      title: 'Baga Beach, Goa',
      src: "https://media.istockphoto.com/id/182490721/photo/beach-in-candolim.jpg?s=612x612&w=0&k=20&c=3wPSgkIuxDVprE-02Tg3fMXTMOaW0CWBVasSYNSfayY=",
    },
    {
      id: 11,
      title: 'Ellora Caves, Aurangabad',
      src: "https://media.istockphoto.com/id/629821246/photo/kailas-temple-in-ellora-caves-complex-in-india.jpg?s=612x612&w=0&k=20&c=ei3N4dugQCPoifA-fE5aDIcgkGqkQgQ2_ASvdxxVnV0=",
    },
    {
      id: 12,
      title: 'Dal Lake, Srinagar',
      src: "https://media.istockphoto.com/id/1323846766/photo/a-beautiful-view-of-dal-lake-in-winter-srinagar-kashmir-india.jpg?s=612x612&w=0&k=20&c=Dp3peie2t-jdLEmqe4W-DD09GACu2Cr-JjHHeB6rpBc=",
    },
    {
      id: 13,
      title: 'Bhangarh Fort, Sariska',
      src: "https://hblimg.mmtcdn.com/content/hubble/img/sariska/mmt/activities/m_activities_sariska_bhangarh_fort_l_400_640.jpg",
    },
    {
      id: 14,
      title: 'Nageshwar Jyotirlinga, Dwarka',
      src: "https://hblimg.mmtcdn.com/content/hubble/img/dwarka/mmt/activities/m_activities_dwarka_nageshwar_jyotirlinga_l_501_751.jpg",
    },
    {
      id: 15,
      title: 'Akshardham Temple, Delhi',
      src: "https://media.istockphoto.com/id/992280502/photo/indian-temple-in-new-delhi.jpg?s=612x612&w=0&k=20&c=ABLaF3EGrgBzGISnHWXexyAOvACO9H4JSXTAuTOI9Q8=",
    },
    {
      id: 16,
      title: 'Nubra Valley, Leh',
      src: "https://media.istockphoto.com/id/1398159391/photo/river-in-ladakh-india-jammu-and-kashmir-region-from-the-way-to-leh-to-pangong-tso-and-nubra.jpg?s=612x612&w=0&k=20&c=vkAvA9ftXrcLxNR0FGb_ehZTK_6qeq0xMcsHLkcTVPU=",
    },
    {
      id: 17,
      title: 'Lotus Temple, Delhi',
      src: "https://media.istockphoto.com/id/517364023/photo/lotus-temple.jpg?s=612x612&w=0&k=20&c=Ap7wHtvS2nWcIyUsEDhThIln1VOcWlm50dVv7GYcBbI=",
    },
    {
      id: 18,
      title: 'Jallianwala Bagh, Amritsar',
      src: "https://media.istockphoto.com/id/1274504212/photo/wide-view-of-a-bullet-marked-wall-at-jallianwala-bagh.jpg?s=612x612&w=0&k=20&c=2zg50ktlfCgj4XoUvX-pw5RVlNya22SWuB2XbG6Lfys=",
    },
    {
      id: 19,
      title: 'Mahabaleshwar Temple, Mahabaleshwar',
      src: "https://media.istockphoto.com/id/172126084/photo/somanathpur-temple-mysore-india.jpg?s=612x612&w=0&k=20&c=m3PE3QAUcvPcn1nLelMwxep_DRXlS-90GpEYpzE6WVM=",
    },
    {
      id: 20,
      title: 'Victoria Memorial, Kolkata',
      src: "https://media.istockphoto.com/id/1164616564/photo/victoria-memorial-ancient-white-marble-monument-at-kolkata-at-sunset.jpg?s=612x612&w=0&k=20&c=isr81zWNep-328aNbqq0vwty_TYiGE_FilJ5EfZ2WL0=",
    },
    {
      id: 21,
      title: 'Calangute Beach,Goa',
      src: "https://media.istockphoto.com/id/1353072377/photo/beach-in-goa-india.jpg?s=612x612&w=0&k=20&c=WGpaC9JxQH0tCMQqJtGPVih7dH3GVHodoArtGChXIKE=",
    }

  ];
  
  // Endpoint to fetch trending places
  app.get('/api/trendingplace', (req, res) => {
    res.json(places);
  });
  
// Route to test the server
app.get('/', (req, res) => {
    res.send(`
        <h1>Image Slider</h1>
        <p>Access image slider data at <a href="/imageslider">/imageslider</a>.</p>
    `);
});


const lesser_known=[
    {
      name: "Tawang",
      state: "Arunachal Pradesh",
      img:"https://media.istockphoto.com/id/187510803/photo/ancient-buddhist-monastery-tawang-arunachal-pradesh-india.jpg?s=612x612&w=0&k=20&c=9D5fAOcKj_sRhBOzNIxEhvhE8h38KbhvFWA9iagrcqw=",
    },
    {
      name: "Yercaud",
      state: "Tamil Nadu",
      img:"https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201008201313094951-9b81a6b8881611eda3a30a58a9feac02.jpg"
    },
    {
      name: "Saputara",
      state: "Gujarat",
      img:"https://hblimg.mmtcdn.com/content/hubble/img/tvdestinationimages/mmt/activities/m_Saputara_tv_destination_img_6_l_667_1000.jpg",
    },
    {
      name: "Kailash",
      state: "Himachal Pradesh",
      img: "https://media.istockphoto.com/id/1362644903/photo/kailash-himalaya-mountain-slopes-at-narkanda-himachal-pradesh-india.jpg?s=612x612&w=0&k=20&c=P5OiP9QnX29KjoXZ0YLRmU9pmAHuV1KIoRy4mdD44DY=",
    },
    {
      name: "Kanha National Park",
      state: "Madhya Pradesh",
      img: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSfDcSud3AdDGbV669966-OIsO1hKzwA1gRms0ZduDTPCkKCh6_p9gYdQ3z1ebrtqhjXOz5swHvAk2vP8DalqqupTZxmO1z5UYUQV2dag"
    },
   
]

app.get('/api/lesserknown', (req, res) => {
    res.json(lesser_known);
  });














// Route to handle the scraping request
app.get('/train-data', async (req, res) => {
    const { from, to } = req.query;

    if (!from || !to) {
        return res.status(400).json({ error: 'Please provide both "from" and "to" locations.' });
    }

    try {
        const trains = await scrapeTrainData(from, to);
        res.json(trains);
    } catch (error) {
        res.status(500).json({ error: 'Failed to scrape train data' });
    }
});





const API_KEY = "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg";

app.get('/api/places', async (req, res) => {
  const { location, radius, type } = req.query;
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location,
        radius,
        type,
        key: API_KEY,
      },
    });
    res.json(response.data);  // Send the response back to the frontend
  } catch (err) {
    // Log the full error for debugging
    console.error("Error fetching data from Google API:", err.message);
    res.status(500).json({ error: 'Failed to fetch data from Google Maps API', details: err.message });
  }
});

app.get('/api/hotels', async (req, res) => {
  try {
    const hotels = await scrapeHotelDetails(); // Scrape the hotel data
    res.json(hotels); // Send the hotel list as JSON
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape hotel data' });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
