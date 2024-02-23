const puppeteer = require('puppeteer');
const { createObjectCsvWriter } = require('csv-writer');


async function myCompanyName(companyName) {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.goto(`https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(companyName)}`);
	//await page.waitForSelector('.search-results');
	await page.waitForSelector('.search-results', { timeout: 90000 });
	await page.click('.search-result__info a');
    await page.waitForNavigation();

    const company_NameEl = await page.$('.org-top-card-summary__title');
    const company_WebsiteEl = await page.$('.org-top-card-primary-actions__action a');

    const company = {
        name: await page.evaluate(el => el.textContent.trim(), company_NameEl),
        website: await page.evaluate(el => el.href, company_WebsiteEl)
    };

    await page.goto(`${company.website}/about/`);
    await page.waitForSelector('.org-grid__core-rail');

    const linkedInUrl = await page.evaluate(() => {
        const linkedInLink = document.querySelector('.link-without-visited-state');
        return linkedInLink ? linkedInLink.href : '';
    });

    company.linkedInUrl = linkedInUrl;

    await browser.close();

    return company;
}

async function run() {
    const companies = [
        "ADPRO SOFTECH PVT LTD",
        "ADRENALIN ESYSTEMS LIMITED",
        "ADV DETAILING AND DESIGN APPLICATIONS INDIA PRIVATE LIMITED",
 		"ADVA OPTICAL NETWORKING INDIA PRIVATE LIMITED",
 		"ADVAITA INDIA CONSULTING PRIVATE LIMITED",
 		"ADVAIYA SOLUTIONS (P) LTD.",
 		"ADVANCED BUSINESS & HEALTHCARE SOLUTIONS INDIA PRIVATE LIMITED",
 		"ADVANCED INVESTMENT MECHANICS INDIA PRIVATE LIMITED",
 		"ADVANTEST INDIA PRIVATE LIMITED",
 		"ADVANTMED INDIA LLP",
 		"ADVANZ PHARMA SERVICES (INDIA) PRIVATE LIMITED",
 		"ADVARRA INDIA PRIVATE LIMITED",
 		"ADVISOR360 SOFTWARE PRIVATE LIMITED",
 		"AECO TECHNOSTRUCT PRIVATE LIMITED",
 		"AECOM INDIA GLOBAL SERVICES PRIVATE LIMITED",
 		"AECOR DIGITAL INTERNATIONAL PRIVATE LIMITED",
 		"AEGIS CUSTOMER SUPPORT SERVICES PVT LTD",
 		"AEL DATASERVICES LLP",
 		"AEON COMMUNICATION PRIVATE LIMITED",
 		"AEREN IP SERVICES PVT. LTD.",
 		"AEREN IT SOLUTIONS PVT. LTD.",
 		"AEREON INDIA PRIVATE LIMITED.",
 		"AEROSPIKE INDIA PRIVATE LIMITED",
 		"AEXONIC TECHNOLOGIES PRIVATE LIMITED",
 		"AFFINITY ANSWERS PRIVATE LIMITED",
 		"AFFINITY GLOBAL ADVERTISING PVT. LTD.",
 		"AFOUR TECHNOLOGIES PVT. LTD.",
		"AGASTHA SOFTWARE PVT. LTD.",
 		"AGATHSYA TECHNOLOGIES PRIVATE LIMITED",
 		"AGCO TRADING (INDIA) PRIVATE LIMITED",
 		"AGGRANDIZE VENTURE PRIVATE LIMITED",
 		"AGILE ICO PVT LTD",
 		"AGILE LINK TECHNOLOGIES",
 		"AGILENT TECHNOLOGIES INTERNATIONAL PVT.LTD.",
		"AGILIANCE INDIA PVT LTD",
 		"AGILITY E SERVICES PRIVATE LIMITED",
 		"AGILON HEALTH INDIA PRIVATE LIMITED",
 		"AGNEXT TECHNOLOGIES PRIVATE LTD",
 		"AGNISYS TECHNOLOGY (P) LTD.",
 		"AGNITIO SYSTEMS",
 		"AGNITY COMMUNICATIONS PVT. LTD.",
 		"AGNITY INDIA TECHNOLOGIES PVT LTD",
 		"AGNITY TECHNOLOGIES PRIVATE LIMITED",
 		"AGREETA SOLUTIONS PRIVATE LIMITED",
 		"AGS HEALTH PVT. LTD",
 		"AGT ELECTRONICS LTD",
 		"AGTECHPRO PRIVATE LIMITED",
 		"AHANA RAY TECHNOLOGIES INDIA PRIVATE LIMITED",
		"AI COGITO INDIA PRIVATE LIMITED",
 		"AI SQUARE GLOBAL SOLUTIONS LLP",
 		"AIDASTECH INDIA PRIVATE LIMITED",
 		"AIE FIBER RESOURCE AND TRADING (INDIA) PRIVATE LIMITED",
 		"AIGENEDGE PRIVATE LIMITED",
 		"AIGILX HEALTH TECHNOLOGIES PVT LTD",
 		"AIMBEYOND INFOTECH PRIVATE LIMITED",
 		"AIML SQUARE PRIVATE LIMITED",
 		"AIMTRONICS SEMICONDUCTOR INDIA PVT LTD",
 		"AINS INDIA PVT LTD",
 		"AINSURTECH PVT LTD",
 		"AIOPSGROUP COMMERCE INDIA PRIVATE LIMITED",
 		"AIRAMATRIX PRIVATE LIMITED",
 		"AIRAVANA SYSTEMS PRIVATE LIMITED",
 		"AIRBUS GROUP INDIA PVT. LTD.",
 		"AIRCHECK INDIA PVT. LTD.",
 		"AIRDATA TECHNOLOGIES PRIVATE LIMITED",
 		"AIREI INDIA PRIVATE LTD",
 		"AIRMEET NETWORKS PRIVATE LIMITED",
 		"AIRO DIGITAL LABS INDIA PRIVATE LIMITED",
 		"AIRO GLOBAL SOFTWARE PRIVATE LIMITED",
 		"AIROHA TECHNOLOGY INDIA PRIVATE LIMITED",
 		"AIRTEL INTERNATIONAL LLP",
 		"AITHENT TECHNOLOGIES PVT. LTD.",
		"AJIRA AI SOFTWARE INDIA PVT LTD",
 		"AJOSYS TECHNOLOGY SOLUTIONS PVT LTD",
 		"AJRITH TECH PRIVATE LIMITED",
 		"AJS SOFTWARE TECHNOLOGIES PRIVATE LIMITED",
 		"AJUBA COMMERCE PVT. LTD.",
 		"AK AEROTEK SOFTWARE CENTRE PVT. LTD.",
 		"AK SURYA POWER MAGIC PVT LTD",
 		"AKEO SOFTWARE SOLUTIONS PRIVATE LIMITED",
 		"AKIKO SHERMAN INFOTECH PRIVATE LIMITED",
 		"AKOTS INDIA PVT. LTD.",
 		"AKRIDATA INDIA PRIVATE LIMITED",
 		"AKSA LEGACIES PRIVATE LIMITED",
 		"AKSHAY RAJENDRA SHANBHAG",
 		"AKSHAY VANIJYA & FINANCE LTD",
 		"ALAMY IMAGES INDIA (P) LTD",
 		"ALAN SOLUTIONS",
 		"ALATION INDIA PRIVATE LIMITED",
 		"ALCAX SOLUTIONS",
 		"ALCODEX TECHNOLOGIES PVT. LTD.",
 		"ALE INDIA PVT LTD.",
 		"ALEKHA IT PRIVATE LIMITED",
 		"ALEPT CONSULTING PRIVATE LIMITED",
 		"ALERTOPS INDIA PRIVATE LIMITED",
 		"ALETHEA COMMUNICATIONS TECHNOLOGIES PVT LTD",
 		"ALFA KPO PVT. LTD.",
 		"ALFANAR ENGINEERING SERVICES INDIA PVT LTD",
 		"ALGONICS SYSTEMS PRIVATE LIMITED",
 		"ALGONOMY SOFTWARE PRIVATE LIMITED",
 		"ALGORHYTHM TECH PVT LTD"
       
    ];
    const scrapedData = [];

    for (const company of companies) {
        const data = await myCompanyName(company);
        scrapedData.push(data);
    }

    console.log(scrapedData);


    const csvWriter = createObjectCsvWriter({
        path: 'companies.csv',
        header: [
            { id: 'name', title: 'Company Name' },
            { id: 'website', title: 'Website' },
            { id: 'linkedInUrl', title: 'LinkedIn URL' }
        ]
    });

    await csvWriter.writeRecords(scrapedData);
}

run();




	
