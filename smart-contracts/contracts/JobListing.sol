// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
//import "./NFTReward.sol";

contract JobListing is Ownable, Pausable {
    struct Job {
        address client;
        address caregiver;
        uint256 startDate;
        uint256 endDate; 
        uint256 salaryOffer; 
        string title; 
        string description; 
        bool completed;
        bool canceled;
        uint8 rating;
    }

    //NFTReward public nftRewardContract;
    uint256 public jobCounter;
    mapping(uint256 => Job) public jobs;
    mapping(address => uint256[]) public clientJobHistory;
    mapping(address => uint256[]) public caregiverJobHistory;

    event JobCreated(uint256 indexed jobId, address indexed client, uint256 startDate, string title, string description, uint256 salaryOffer);
    event JobUpdated(uint256 indexed jobId, uint256 startDate, string title, string description, uint256 salaryOffer);
    event JobCompleted(uint256 indexed jobId, address indexed caregiver, uint8 rating, uint256 endDate);
    event JobCanceled(uint256 indexed jobId, address indexed client);
    event CaregiverAssigned(uint256 indexed jobId, address indexed caregiver);

    modifier onlyClient(uint256 _jobId) {
        require(msg.sender == jobs[_jobId].client, "Not authorized");
        _;
    }

   //constructor(address _nftRewardAddress) Ownable(msg.sender) {
    //nftRewardContract = NFTReward(_nftRewardAddress);
   // }

    constructor() Ownable(msg.sender) {}

    // Crear trabajo con título, sin especificar el endDate y sin horas, solo el salario
    function createJob(
        uint256 _startDate,
        uint256 _salaryOffer,
        string memory _title,
        string memory _description
    ) public whenNotPaused {
        jobs[jobCounter] = Job(
            msg.sender,
            address(0), // Caregiver se asignará más tarde
            _startDate,
            0, // EndDate se establece cuando se completa el trabajo
            _salaryOffer,
            _title,
            _description,
            false,
            false,
            0
        );
        clientJobHistory[msg.sender].push(jobCounter);
        emit JobCreated(jobCounter, msg.sender, _startDate, _title, _description, _salaryOffer);
        jobCounter++;
    }

    // Asignar cuidador al trabajo
    function assignCaregiver(uint256 _jobId, address _caregiver) public whenNotPaused {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.client, "Only the client can assign a caregiver");
        require(job.caregiver == address(0), "Caregiver already assigned");
        require(!job.completed && !job.canceled, "Job is already completed or canceled");

        job.caregiver = _caregiver;
        caregiverJobHistory[_caregiver].push(_jobId);

        emit CaregiverAssigned(_jobId, _caregiver);
    }

    // Completar un trabajo y asignar calificación
    function completeJobListing(uint256 _jobId, uint8 _rating) public whenNotPaused onlyClient(_jobId) {
        Job storage job = jobs[_jobId]; 
    
        require(job.caregiver != address(0), "No caregiver assigned");
        require(!job.completed, "Job already completed");
        require(!job.canceled, "Job has been canceled");
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");
    
        job.completed = true;
        job.rating = _rating;
        job.endDate = block.timestamp; // Set the end date when the job is completed

        // Mint an NFT reward for the caregiver based on the rating
        //nftRewardContract.mint(job.caregiver, _jobId, _rating); 
        caregiverJobHistory[job.caregiver].push(_jobId);

        emit JobCompleted(_jobId, job.caregiver, _rating, job.endDate);
    }

    // Cancelar el trabajo
    function cancelJob(uint256 _jobId) public whenNotPaused {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.client, "Only the client can cancel the job");
        require(!job.completed, "Job already completed");
        require(!job.canceled, "Job already canceled");

        job.canceled = true;
        emit JobCanceled(_jobId, msg.sender);
    }

    // Obtener el historial de trabajos del cuidador
    function getCaregiverJobHistory(address _caregiver) public view returns (uint256[] memory) {
        return caregiverJobHistory[_caregiver];
    }

    // Obtener el historial de trabajos del cliente
    function getClientJobHistory(address _client) public view returns (uint256[] memory) {
        return clientJobHistory[_client];
    }

    //get job details
    // Function to get the details of a single job by its jobId
    function getJobDetails(uint256 jobId) public view returns (
        address client,
        address caregiver,
        uint256 startDate,
        uint256 endDate,
        uint256 salaryOffer,
        string memory title,
        string memory description,
        bool completed,
        bool canceled,
        uint8 rating
    ) {
        Job storage job = jobs[jobId];
        
        return (
            job.client,
            job.caregiver,
            job.startDate,
            job.endDate,
            job.salaryOffer,
            job.title,
            job.description,
            job.completed,
            job.canceled,
            job.rating
        );
    }
        
    // Establecer el contrato NFTReward
    //function setNFTRewardContract(address _newNFTContract) public onlyOwner {
      //  nftRewardContract = NFTReward(_newNFTContract);
    //}
}