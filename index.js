import axios from "axios";
import "dotenv/config";

function printLinks(links) {
  links.forEach((linkData) => {
    console.log(` Link Type: ${linkData.type}`);
    console.log(` Quality: ${linkData.quality}`);
    console.log(` Link URL: ${linkData.link}`);
    console.log(" ------------------------");
  });
}

async function searchStreamingAvailability(title, showType) {
  const apiKey = process.env.RAPIDAPI_KEY; // Replace with your RapidAPI key
  const host = "streaming-availability.p.rapidapi.com";

  const options = {
    method: "GET",
    url: "https://streaming-availability.p.rapidapi.com/v2/search/title",
    params: {
      title,
      country: "us",
      show_type: showType,
      output_language: "en",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API,
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    //console.log(response.data.result[0]?.streamingInfo?.us);
    const results = response.data.result[0]?.streamingInfo?.us;
    const services = Object.keys(results); // Get the list of service names (e.g., "apple", "prime")

    services.forEach((service) => {
      console.log(`Service: ${service}`);
      printLinks(results[service]); // Print the links for each service
    });
  } catch (error) {
    console.error(error);
  }
}

// Get the title and show_type from command line arguments
const title = process.argv[2];
const showType = process.argv[3];

if (!title || !showType) {
  console.log("Please provide title and show_type as command-line arguments.");
} else {
  searchStreamingAvailability(title, showType);
}
