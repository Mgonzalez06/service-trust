// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract UserRegistry is Ownable, Pausable {
    struct UserProfile {
        string name;
        string surname;
        string country;
        string city;
        string nationality;
        uint256 birthdate;
        string email;
        string phone;
        string description;
        address walletAddress; ////se genera en el front con ethersjs
        bool isRegistered;
    }

    mapping(address => UserProfile) public userProfiles;
    address[] public registeredUsers;  // Array to store addresses of registered users

    event UserProfileCreated(
        address indexed user, 
        string name,
        string surname,
        string country, 
        string city, 
        string nationality, 
        uint256 birthdate, 
        string email, 
        string phone, 
        string description,
        address walletAddress
    );

    event UserProfileUpdated(
        address indexed user, 
        string name,
        string surname,
        string country, 
        string city, 
        string nationality, 
        uint256 birthdate, 
        string email, 
        string phone, 
        string description,
        address walletAddress
    );

    constructor() Ownable(msg.sender) {}

    // Registrar usuario con nuevos campos y wallet
    function registerUser(
        string memory _name,
        string memory _surname,
        string memory _country,
        string memory _city,
        string memory _nationality,
        uint256 _birthdate,
        string memory _email,
        string memory _phone,
        string memory _description,
        address _walletAddress  //se genera en el front con ethersjs
    ) public whenNotPaused {
        require(!userProfiles[msg.sender].isRegistered, "User already registered");

        userProfiles[msg.sender] = UserProfile(
            _name,
            _surname,
            _country,
            _city,
            _nationality,
            _birthdate,
            _email,
            _phone,
            _description,
            _walletAddress,
            true
        );

        registeredUsers.push(msg.sender);  // Store the user's address in the array
        emit UserProfileCreated(msg.sender, _name, _surname, _country, _city, _nationality, _birthdate, _email, _phone, _description, _walletAddress);
    }

    // Actualizar perfil de usuario
    function updateUserProfile(
        string memory _name,
        string memory _surname,
        string memory _country,
        string memory _city,
        string memory _nationality,
        uint256 _birthdate,
        string memory _email,
        string memory _phone,
        string memory _description,
        address _walletAddress  // Permitir actualización de wallet
    ) public whenNotPaused {
        require(userProfiles[msg.sender].isRegistered, "User is not registered");
        userProfiles[msg.sender] = UserProfile(
            _name,
            _surname,
            _country,
            _city,
            _nationality,
            _birthdate,
            _email,
            _phone,
            _description,
            _walletAddress,
            true
        );
        emit UserProfileUpdated(msg.sender, _name, _surname, _country, _city, _nationality, _birthdate, _email, _phone, _description, _walletAddress);
    }

    // Function to get all registered users
    function getAllUsers() public view returns (address[] memory) {
        return registeredUsers;
    }

    // Function to get a user profile by address
    function getUserProfile(address _user) public view returns (
        string memory name,
        string memory surname,
        string memory country,
        string memory city,
        string memory nationality,
        uint256 birthdate,
        string memory email,
        string memory phone,
        string memory description,
        address walletAddress
    ) {
        UserProfile storage profile = userProfiles[_user];
        require(profile.isRegistered, "User not registered");

        return (
            profile.name,
            profile.surname,
            profile.country,
            profile.city,
            profile.nationality,
            profile.birthdate,
            profile.email,
            profile.phone,
            profile.description,
            profile.walletAddress
        );
    }

    // Pausable functions
    function pause() public onlyOwner {
        _pause();  // Pausa el contrato
    }

    function unpause() public onlyOwner {
        _unpause();  // Reanuda el contrato
    }
}