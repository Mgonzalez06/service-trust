// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./UserRegistry.sol";

contract JobListing is Ownable, ReentrancyGuard {
    UserRegistry public userRegistry;

    enum JobStatus { Open, Closed, Filled }

    struct Job {
        address employer;
        string title;
        string description;
        uint256 duration; // in days
        uint256 salary;
        string paymentTerms;
        JobStatus status;
        uint256 createdAt;
    }

    Job[] public jobs;
    mapping(uint256 => address[]) public jobApplicants;

    event JobCreated(uint256 indexed jobId, address indexed employer);
    event JobUpdated(uint256 indexed jobId, JobStatus status);
    event JobApplicationSubmitted(uint256 indexed jobId, address indexed applicant);

    constructor(address _userRegistryAddress) {
        userRegistry = UserRegistry(_userRegistryAddress);
    }

    // Function to create a new job listing
    function createJob(
        string memory _title,
        string memory _description,
        uint256 _duration,
        uint256 _salary,
        string memory _paymentTerms
    ) external nonReentrant {
        require(userRegistry.isUserRegistered(msg.sender), "User not registered");

        uint256 jobId = jobs.length;
        jobs.push(Job({
            employer: msg.sender,
            title: _title,
            description: _description,
            duration: _duration,
            salary: _salary,
            paymentTerms: _paymentTerms,
            status: JobStatus.Open,
            createdAt: block.timestamp
        }));

        emit JobCreated(jobId, msg.sender);
    }

    // Function to update job status
    function updateJobStatus(uint256 _jobId, JobStatus _status) external {
        require(_jobId < jobs.length, "Invalid job ID");
        require(jobs[_jobId].employer == msg.sender, "Not the job owner");

        jobs[_jobId].status = _status;
        emit JobUpdated(_jobId, _status);
    }

    // Function to apply for a job
    function applyForJob(uint256 _jobId) external nonReentrant {
        require(_jobId < jobs.length, "Invalid job ID");
        require(jobs[_jobId].status == JobStatus.Open, "Job not open");
        require(userRegistry.isUserRegistered(msg.sender), "User not registered");

        jobApplicants[_jobId].push(msg.sender);
        emit JobApplicationSubmitted(_jobId, msg.sender);
    }

    // Function to get job details
    function getJobDetails(uint256 _jobId) external view returns (
        address employer,
        string memory title,
        string memory description,
        uint256 duration,
        uint256 salary,
        string memory paymentTerms,
        JobStatus status,
        uint256 createdAt
    ) {
        require(_jobId < jobs.length, "Invalid job ID");
        Job storage job = jobs[_jobId];
        return (
            job.employer,
            job.title,
            job.description,
            job.duration,
            job.salary,
            job.paymentTerms,
            job.status,
            job.createdAt
        );
    }

    // Function to get job applicants
    function getJobApplicants(uint256 _jobId) external view returns (address[] memory) {
        require(_jobId < jobs.length, "Invalid job ID");
        return jobApplicants[_jobId];
    }

    // Function to get total number of jobs
    function getJobCount() external view returns (uint256) {
        return jobs.length;
    }
}