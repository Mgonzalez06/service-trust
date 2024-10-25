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
        address walletAddress; // Se genera en el front con ethersjs
        string passwordHash;
        bool isRegistered;
    }

    mapping(address => UserProfile) public userProfiles;
    address[] public registeredUsers;  // Array to almacenar las direcciones de los usuarios registrados
    mapping(string => address) private emailToAddress;

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
        address walletAddress,
        string passwordHash 
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
        address _walletAddress,
        string memory _passwordHash 
    ) public whenNotPaused {
        require(!userProfiles[_walletAddress].isRegistered, "User already registered");
        require(emailToAddress[_email] == address(0), "Email already in use");

        userProfiles[_walletAddress] = UserProfile(
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
            _passwordHash, // Almacenar el hash de la contraseña
            true
        );

        emailToAddress[_email] = _walletAddress;
        registeredUsers.push(_walletAddress);  // Almacenar la dirección del usuario en el array
        emit UserProfileCreated(_walletAddress, _name, _surname, _country, _city, _nationality, _birthdate, _email, _phone, _description, _walletAddress, _passwordHash);
    }

    function isUserRegistered(address _userAddress) external view returns (bool) {
        return userProfiles[_userAddress].isRegistered;
    }

    // Function to get the address associated with an email
    function getAddressByEmail(string memory email) public view returns (address) {
        return emailToAddress[email];
    }

    
    // // Actualizar perfil de usuario
    // function updateUserProfile(
    //     string memory _name,
    //     string memory _surname,
    //     string memory _country,
    //     string memory _city,
    //     string memory _nationality,
    //     uint256 _birthdate,
    //     string memory _email,
    //     string memory _phone,
    //     string memory _description,
    //     address _walletAddress, // Permitir actualización de wallet
    //     bytes32 _passwordHash // Agregar el hash de la contraseña para actualizar
    // ) public whenNotPaused {
    //     require(userProfiles[msg.sender].isRegistered, "User is not registered");
    //     userProfiles[msg.sender] = UserProfile(
    //         _name,
    //         _surname,
    //         _country,
    //         _city,
    //         _nationality,
    //         _birthdate,
    //         _email,
    //         _phone,
    //         _description,
    //         _walletAddress,
    //         _passwordHash, // Almacenar el hash de la contraseña actualizado
    //         true
    //     );
    //     emit UserProfileUpdated(msg.sender, _name, _surname, _country, _city, _nationality, _birthdate, _email, _phone, _description, _walletAddress);
    // }

    // Función para obtener todos los usuarios registrados
    function getAllUsers() public view returns (address[] memory) {
        return registeredUsers;
    }

    // Función para obtener el perfil de un usuario por dirección
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

    // Funciones pausables
    function pause() public onlyOwner {
        _pause();  // Pausa el contrato
    }

    function unpause() public onlyOwner {
        _unpause();  // Reanuda el contrato
    }

}