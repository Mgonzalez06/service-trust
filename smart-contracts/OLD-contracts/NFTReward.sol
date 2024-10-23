// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTReward is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    
    constructor() ERC721("CaregiverReward", "CARE") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    // Función para acuñar un nuevo NFT basado en la calificación
    function mint(address _to, uint256 _jobId, uint8 _rating) public onlyOwner {
        require(_rating >= 1 && _rating <= 5, "Rating out of range");

        // Generar una URI diferente o un atributo basado en la calificación
        string memory tokenURI = _generateTokenURI(_rating);

        _mint(_to, tokenCounter);  // Acuñar el NFT
        _setTokenURI(tokenCounter, tokenURI);  // Asignar URI al token

        tokenCounter++;
    }

    // Genera una URI diferente basado en la calificación
    function _generateTokenURI(uint8 _rating) internal pure returns (string memory) {
        if (_rating == 5) {
            return "https://nft-uri-gold.com"; // NFT de oro **pendiente hacer los json en pinata
        } else if (_rating >= 3) {
            return "https://nft-uri-silver.com"; // NFT de plata
        } else {
            return "https://nft-uri-bronze.com"; // NFT de bronce
        }
    }

    // Función para obtener la cantidad de NFTs que tiene un propietario
    function getNFTCountByOwner(address _owner) public view returns (uint256) {
        return balanceOf(_owner); // balanceOf ya está implementado en ERC721
    }
}