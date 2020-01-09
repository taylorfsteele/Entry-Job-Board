
var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient({
        port: 18680,
        host: 'redis-18680.c11.us-east-1-3.ec2.cloud.redislabs.com',
        password: 'ix0co3by3opJQ2WD4CCevY5myXong9DI'
    });
const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
    let resultCount = 1, onPage = 0;
    const allJobs = []

    //fetch all pages
    while (resultCount > 0) {
        const res = await fetch(`${baseURL}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs)
        resultCount = jobs.length
        console.log(`got ${resultCount} jobs on page ${onPage}`);
        onPage++;
    }
    console.log(`got ${allJobs.length} jobs`)

    //filter algorithm
    const jrJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();

        //algorithm logic
        if (jobTitle.includes('senior') ||
            jobTitle.includes('manager') ||
            jobTitle.includes('sr.') ||
            jobTitle.includes('master') ||
            jobTitle.includes('architect')
        ) {
            return false
        }
        return true
    });

    console.log('filtered down to ' + jrJobs.length)


    //set in redis

    const success = await setAsync('github', JSON.stringify(jrJobs));

    console.log({ success })
}


module.exports = fetchGithub;