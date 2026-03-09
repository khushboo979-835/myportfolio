async function checkIP() {
    try {
        console.log('Checking your public IP address...');
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json() as { ip: string };
        console.log('\n=========================================');
        console.log(`YOUR PUBLIC IP: ${data.ip}`);
        console.log('=========================================');
        console.log('\nTo fix the MongoDB connection:');
        console.log('1. Log in to https://cloud.mongodb.com/');
        console.log('2. Go to "Network Access" in the left sidebar.');
        console.log('3. Click "+ ADD IP ADDRESS".');
        console.log(`4. Paste ${data.ip} and click "Confirm".`);
        console.log('5. Wait a minute and restart your dev server.');
        console.log('=========================================\n');
    } catch (error) {
        console.error('Failed to fetch public IP. Please search "what is my ip" on Google.');
    }
}

checkIP();
