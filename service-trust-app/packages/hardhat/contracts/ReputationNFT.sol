// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ReputationNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCount;

    // Mapping to store the token URIs based on the reliability score
    mapping(uint8 => string) public scoreToTokenURI;
    mapping(address => uint256[]) public ownerToTokenIds;

    constructor() ERC721("ReputationNFT", "RNFT") Ownable( msg.sender) {
        // Set the metadata URIs for scores 1, 2, and 3
        scoreToTokenURI[1] = "https://ipfs.io/ipfs/QmZ7RmVse6SQST3fwThyCMTMC5Kc4FDmxEaTDWdsCqEGLX"; 
        scoreToTokenURI[2] = "https://ipfs.io/ipfs/QmZudVCZCWqFy28NB5UBgFATaKvJBkY53x57HjUGDCysxZ";
        scoreToTokenURI[3] = "https://ipfs.io/ipfs/QmPxMDvvU25MK6mzxRhWpvdTzVV8E6mdaoE3mc6cjZGrAZ";
    }

    // Mints a new NFT based on the reliability score
    function mint(address _user, uint8 _score) external onlyOwner {
        require(_score >= 1 && _score <= 3, "Score must be between 1 and 3");
        tokenCount++;
        uint256 newTokenId = tokenCount;
        
        // Retrieve the corresponding metadata URI
        string memory metadataURI = scoreToTokenURI[_score];

        _safeMint(_user, newTokenId);
        _setTokenURI(newTokenId, metadataURI);
        ownerToTokenIds[_user].push(newTokenId);
    }

    //gets array of tokenIds for an specific address, then you can call it in the front with 
    function getTokensOfOwner(address _owner) public view returns (uint256[] memory) {
        return ownerToTokenIds[_owner];
    }
    
    // Functio to get token URIs for all NFTs owned by a specific address
    function getTokenURIsOfOwner(address _owner) external view returns (string[] memory) {
        // Get the array of token IDs owned by the user
        uint256[] memory tokenIds = getTokensOfOwner(_owner);
        
        // Create an array to store the token URIs
        string[] memory tokenURIs = new string[](tokenIds.length);

        // Loop through the token IDs and retrieve the corresponding URIs
        for (uint256 i = 0; i < tokenIds.length; i++) {
            tokenURIs[i] = tokenURI(tokenIds[i]); // Use the inherited tokenURI function
        }

        return tokenURIs; // Return the array of token URIs
    }

    // function getTokenURI(uint256 _tokenId) external view returns (string memory) {
    //     return tokenURI(_tokenId);
    // }

    // Assigns reliability score to the NFT
    //function assignReliabilityScore(uint256 _tokenId, uint8 _score) external onlyOwner {
      //  require(_score >= 1 && _score <= 3, "Score must be between 1 and 3");
        // Update the token's metadata with the new score (if necessary)
        // Logic for updating metadata can be added here
    //}
}