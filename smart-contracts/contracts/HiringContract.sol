// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./UserRegistry.sol";
import "./JobListing.sol";

contract HiringContract is Ownable, ReentrancyGuard {
    // Reference to UserRegistry contract
    UserRegistry public userRegistry;
    // Reference to JobListing contract
    JobListing public jobListing;
    // Payment token contract
    IERC20 public paymentToken;

    // Enum to represent contract statuses
    enum ContractStatus { Created, Started, Completed, Disputed, Cancelled }

    // Structure to hold details of each hiring agreement
    struct HiringAgreement {
        uint256 jobId;
        address employer;
        address caregiver;
        uint256 salary;
        uint256 startDate;
        uint256 endDate;
        ContractStatus status;
        bool employerApproved;
        bool caregiverApproved;
    }

    // Mapping to store hiring agreements
    mapping(uint256 => HiringAgreement) public agreements;
    // Counter to generate agreement IDs
    uint256 public agreementCounter;

    // Events to log activities
    event AgreementCreated(uint256 indexed agreementId, uint256 indexed jobId, address employer, address caregiver);
    event AgreementApproved(uint256 indexed agreementId, address approver);
    event AgreementStarted(uint256 indexed agreementId, uint256 startDate);
    event AgreementCompleted(uint256 indexed agreementId, uint256 endDate);
    event AgreementDisputed(uint256 indexed agreementId);
    event AgreementCancelled(uint256 indexed agreementId);
    event PaymentReleased(uint256 indexed agreementId, uint256 amount);

    constructor(address _userRegistryAddress, address _jobListingAddress, address _paymentTokenAddress) {
        userRegistry = UserRegistry(_userRegistryAddress);
        jobListing = JobListing(_jobListingAddress);
        paymentToken = IERC20(_paymentTokenAddress);
    }

    // Function to create a new hiring agreement
    function createAgreement(uint256 _jobId, address _caregiver) external nonReentrant {
        require(userRegistry.isUserRegistered(msg.sender), "Employer not registered");
        require(userRegistry.isUserRegistered(_caregiver), "Caregiver not registered");

        (address employer, , , uint256 duration, uint256 salary, , , ) = jobListing.getJobDetails(_jobId);
        require(employer == msg.sender, "Not the job owner");

        uint256 agreementId = agreementCounter++;
        agreements[agreementId] = HiringAgreement({
            jobId: _jobId,
            employer: msg.sender,
            caregiver: _caregiver,
            salary: salary,
            startDate: 0,
            endDate: 0,
            status: ContractStatus.Created,
            employerApproved: true,
            caregiverApproved: false
        });

        emit AgreementCreated(agreementId, _jobId, msg.sender, _caregiver);
    }

    // Function for caregiver to approve the agreement
    function approveCaregiverAgreement(uint256 _agreementId) external nonReentrant {
        HiringAgreement storage agreement = agreements[_agreementId];
        require(agreement.caregiver == msg.sender, "Not the caregiver");
        require(agreement.status == ContractStatus.Created, "Invalid agreement status");
        
        agreement.caregiverApproved = true;
        emit AgreementApproved(_agreementId, msg.sender);

        if (agreement.employerApproved && agreement.caregiverApproved) {
            startAgreement(_agreementId);
        }
    }

    // Internal function to start the agreement
    function startAgreement(uint256 _agreementId) internal {
        HiringAgreement storage agreement = agreements[_agreementId];
        require(agreement.employerApproved && agreement.caregiverApproved, "Agreement not approved by both parties");

        agreement.startDate = block.timestamp;
        (, , , uint256 duration, , , , ) = jobListing.getJobDetails(agreement.jobId);
        agreement.endDate = agreement.startDate + (duration * 1 days);
        agreement.status = ContractStatus.Started;

        emit AgreementStarted(_agreementId, agreement.startDate);
    }

    // Function to complete the agreement
    function completeAgreement(uint256 _agreementId) external nonReentrant {
        HiringAgreement storage agreement = agreements[_agreementId];
        require(agreement.employer == msg.sender, "Not the employer");
        require(agreement.status == ContractStatus.Started, "Invalid agreement status");
        require(block.timestamp >= agreement.endDate, "Agreement not yet ended");

        agreement.status = ContractStatus.Completed;
        emit AgreementCompleted(_agreementId, block.timestamp);

        // Release payment to caregiver
        require(paymentToken.transferFrom(agreement.employer, agreement.caregiver, agreement.salary), "Payment transfer failed");
        emit PaymentReleased(_agreementId, agreement.salary);
    }

    // Function to dispute the agreement
    function disputeAgreement(uint256 _agreementId) external nonReentrant {
        HiringAgreement storage agreement = agreements[_agreementId];
        require(agreement.employer == msg.sender || agreement.caregiver == msg.sender, "Not a party to the agreement");
        require(agreement.status == ContractStatus.Started, "Invalid agreement status");

        agreement.status = ContractStatus.Disputed;
        emit AgreementDisputed(_agreementId);
    }

    // Function to cancel the agreement (only possible before it starts)
    function cancelAgreement(uint256 _agreementId) external nonReentrant {
        HiringAgreement storage agreement = agreements[_agreementId];
        require(agreement.employer == msg.sender || agreement.caregiver == msg.sender, "Not a party to the agreement");
        require(agreement.status == ContractStatus.Created, "Cannot cancel active agreement");

        agreement.status = ContractStatus.Cancelled;
        emit AgreementCancelled(_agreementId);
    }

    // Function to get agreement details
    function getAgreementDetails(uint256 _agreementId) external view returns (
        uint256 jobId,
        address employer,
        address caregiver,
        uint256 salary,
        uint256 startDate,
        uint256 endDate,
        ContractStatus status,
        bool employerApproved,
        bool caregiverApproved
    ) {
        HiringAgreement storage agreement = agreements[_agreementId];
        return (
            agreement.jobId,
            agreement.employer,
            agreement.caregiver,
            agreement.salary,
            agreement.startDate,
            agreement.endDate,
            agreement.status,
            agreement.employerApproved,
            agreement.caregiverApproved
        );
    }
}
