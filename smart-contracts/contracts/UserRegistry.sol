// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./ReputationNFT.sol";

contract UserRegistry is Ownable, ReentrancyGuard {
    ReputationNFT public reputationNFT;

    struct User {
        string name;
        string surname;
        string country;
        string city;
        string nationality;
        uint256 birthdate;
        string email;
        bytes32 passwordHash; // Store hashed password
        string phone;
        string description;
        address walletAddress;
        bool isRegistered;
        uint256[] nftIds; // Array to store assigned NFT IDs
    }

    mapping(address => User) public users;
    mapping(string => address) private emailToAddress;

    event UserRegistered(address indexed userAddress, string email);
    event NFTAssigned(address indexed userAddress, uint256 nftId);

    constructor(address _reputationNFTAddress) Ownable(msg.sender) {
        reputationNFT = ReputationNFT(_reputationNFTAddress);
    }

    // Function to register a new user
    function registerUser(
        string memory _name,
        string memory _surname,
        string memory _country,
        string memory _city,
        string memory _nationality,
        uint256 _birthdate,
        string memory _email,
        bytes32 _passwordHash,
        string memory _phone,
        string memory _description,
        address _walletAddress
    ) external onlyOwner nonReentrant {
        require(!users[_walletAddress].isRegistered, "User already registered");
        require(emailToAddress[_email] == address(0), "Email already in use");

        users[_walletAddress] = User({
            name: _name,
            surname: _surname,
            country: _country,
            city: _city,
            nationality: _nationality,
            birthdate: _birthdate,
            email: _email,
            passwordHash: _passwordHash,
            phone: _phone,
            description: _description,
            walletAddress: _walletAddress,
            isRegistered: true,
            nftIds: new uint256[](0)
        });

        emailToAddress[_email] = _walletAddress;

        emit UserRegistered(_walletAddress, _email);
    }

    // Function to assign an NFT to a user
    function assignNFT(address _userAddress, uint256 _nftId) external onlyOwner {
        require(users[_userAddress].isRegistered, "User not registered");
        require(reputationNFT.ownerOf(_nftId) == address(this), "NFT not owned by contract");

        users[_userAddress].nftIds.push(_nftId);
        reputationNFT.transferFrom(address(this), _userAddress, _nftId);

        emit NFTAssigned(_userAddress, _nftId);
    }

    // Function to get user's NFT IDs
    function getUserNFTs(address _userAddress) external view returns (uint256[] memory) {
        return users[_userAddress].nftIds;
    }

    // Function to check if a user is registered
    function isUserRegistered(address _userAddress) external view returns (bool) {
        return users[_userAddress].isRegistered;
    }

    // Function to get user details (excluding sensitive information)
    function getUserDetails(address _userAddress) external view returns (
        string memory name,
        string memory surname,
        string memory country,
        string memory city,
        string memory nationality,
        uint256 birthdate,
        string memory phone,
        string memory description
    ) {
        User storage user = users[_userAddress];
        return (
            user.name,
            user.surname,
            user.country,
            user.city,
            user.nationality,
            user.birthdate,
            user.phone,
            user.description
        );
    }
}