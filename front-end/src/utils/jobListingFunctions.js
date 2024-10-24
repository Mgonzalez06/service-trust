import { BrowserProvider, Contract } from "ethers";
import jobListingABI from "../abi/JobListing.sol/JobListing.json";
const jobListingAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function getProviderAndSigner() {
  try {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return { provider, signer };
  } catch (error) {
    console.error("Error getting provider and signer:", error);
    throw error;
  }
}

export const createJob = async (startDate, salaryOffer, title, description) => {
  try {
    const { signer } = await getProviderAndSigner();
    const contract = new Contract(jobListingAddress, jobListingABI.abi, signer);

    const transaction = await contract.createJob(startDate, salaryOffer, title, description);
    await transaction.wait();
    console.log("Job created successfully:", transaction.hash);
  } catch (error) {
    console.error("Error creating job:", error);
  }
};

export const assignCaregiver = async (jobId, caregiverAddress) => {
  try {
    const { signer } = await getProviderAndSigner();
    const contract = new Contract(jobListingAddress, jobListingABI.abi, signer);

    const transaction = await contract.assignCaregiver(jobId, caregiverAddress);
    await transaction.wait();
    console.log("Caregiver assigned successfully:", transaction.hash);
  } catch (error) {
    console.error("Error assigning caregiver:", error);
  }
};

export const completeJob = async (jobId, rating) => {
  try {
    const { signer } = await getProviderAndSigner();
    const contract = new Contract(jobListingAddress, jobListingABI.abi, signer);

    const transaction = await contract.completeJobListing(jobId, rating);
    await transaction.wait();
    console.log("Job completed successfully:", transaction.hash);
  } catch (error) {
    console.error("Error completing job:", error);
  }
};

export const cancelJob = async (jobId) => {
  try {
    const { signer } = await getProviderAndSigner();
    const contract = new Contract(jobListingAddress, jobListingABI.abi, signer);

    const transaction = await contract.cancelJob(jobId);
    await transaction.wait();
    console.log("Job canceled successfully:", transaction.hash);
  } catch (error) {
    console.error("Error canceling job:", error);
  }
};

export const getClientJobHistory = async (clientAddress) => {
  try {
    const { provider } = await getProviderAndSigner();
    const contract = new Contract(jobListingAddress, jobListingABI.abi, provider);

    const jobHistory = await contract.getClientJobHistory(clientAddress);
    return jobHistory;
  } catch (error) {
    console.error("Error getting client job history:", error);
  }
};

export const getCaregiverJobHistory = async (caregiverAddress) => {
  try {
    const { provider } = await getProviderAndSigner();
    const contract = new Contract(jobListingAddress, jobListingABI.abi, provider);

    const jobHistory = await contract.getCaregiverJobHistory(caregiverAddress);
    return jobHistory;
  } catch (error) {
    console.error("Error getting caregiver job history:", error);
  }
};

export const getJobDetails = async (jobId) => {
  try {
    const { provider } = await getProviderAndSigner();
    const contract = new Contract(jobListingAddress, jobListingABI.abi, provider);

    const jobDetails = await contract.getJobDetails(jobId);
    return jobDetails;
  } catch (error) {
    console.error("Error getting job details:", error);
  }
};


export const getAllJobs = async () => {
    try {
      // Conectar a MetaMask o al proveedor
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed.");
      }
  
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(jobListingAddress, jobListingABI.abi, provider);
      console.log("Contract:");
      
      console.log(contract);
      
  
      // Obtener el número total de trabajos del contrato
      const jobCount = await contract.jobCounter; // ethers.js convierte la variable pública a un getter implícito
      console.log("jobCounter: ", jobCount);
      
      const jobs = [];
      for (let i = 0; i < jobCount; i++) {
        const jobDetails = await contract.getJobDetails(i);
        jobs.push({
          id: i,
          client: jobDetails.client,
          caregiver: jobDetails.caregiver,
          startDate: new Date(jobDetails.startDate * 1000).toLocaleDateString(),
          endDate: jobDetails.endDate > 0 ? new Date(jobDetails.endDate * 1000).toLocaleDateString() : "N/A",
          salaryOffer: jobDetails.salaryOffer.toString(),
          title: jobDetails.title,
          description: jobDetails.description,
          status: jobDetails.completed ? "Closed" : jobDetails.canceled ? "Canceled" : "Open",
          rating: jobDetails.rating,
        });
      }
  
      return jobs;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  };
  

